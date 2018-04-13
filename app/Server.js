'use strict';
import { Env } from './services/Env';
import { ErrorMessage, ErrorCode } from './Enum';
import { ErrorExtended as Error } from './response/Error';
import { Response } from './response/Response';
import { Log } from './services/Log';
import { Validator } from './validator/Validator';

var express = require('express'),
    helmet = require('helmet'),
    compression = require('compression'),
    spdy = require('spdy'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config.json');

export class Server {
    constructor() {
        this.config = Env.isProduction()
            ? config.production
            : config.development;

        let app = express();
        app.set('json spaces', 4);

        if (Env.isProduction()) {
            app.use((request, response, next) => {
                let host = request.headers.host.replace(/(.*):([0-9]+)/g, '$1');
                if (
                    this.config.host !== host &&
                    'www.' + this.config.host !== host
                ) {
                    Response.error(
                        response,
                        new Error(ErrorMessage.CORS, ErrorCode.FORBIDDEN)
                    );
                    return;
                }

                response.header('Access-Control-Allow-Origin', host);
                response.header(
                    'Access-Control-Allow-Methods',
                    'GET,POST,OPTIONS'
                );
                response.header('Access-Control-Allow-Headers', 'Content-Type');
                next();
            });
        } else {
            app.use((request, response, next) => {
                response.header('Access-Control-Allow-Headers', 'Content-Type');
                response.header('Access-Control-Allow-Origin', '*');
                next();
            });
        }

        app.use(this.onError.bind(this));
        app.use(this.optionsResponse.bind(this));
        app.use(express.json());
        app.use(helmet());
        app.use(compression());
        app.use(Validator);
        this.app = app;
    }

    optionsResponse(request, response, next) {
        if (request.method === 'OPTIONS') {
            response.sendStatus(200);
        } else {
            next();
        }
    }

    start() {
        let cert = {},
            server;
        if (Env.isProduction()) {
            cert.key = fs.readFileSync(this.config.certificate.key, 'utf8');
            cert.cert = fs.readFileSync(this.config.certificate.cert, 'utf8');

            server = spdy.createServer(cert, this.app);

            server.listen(this.config.https, () => {
                Log.log(`Server listening on port ${this.config.https}`);
            });

            let httpServer = http
                .createServer((request, response) => {
                    response.writeHead(301, {
                        Location:
                            'https://' + request.headers['host'] + request.url
                    });
                    response.end();
                })
                .listen(this.config.http);
        } else {
            server = http
                .createServer(this.app)
                .listen(this.config.https, () => {
                    Log.log(`Server listening on port ${this.config.https}`);
                });
        }

        this.server = server;
    }

    app() {
        return this.app;
    }

    get(route, fn) {
        this.app.get(route, fn);
    }

    post(route, fn) {
        this.app.post(route, fn);
    }

    onError(error, request, response, next) {
        console.error('generic error: ', error);
        Response.error(response);
    }
}
