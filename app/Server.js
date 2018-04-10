'use strict';
import { Env } from './services/Env';
import { Enum } from './Enum';
import { ErrorExtended as Error } from './response/Error';
import { Response } from './response/Response';
import { Log } from './services/Log';
import { Validator } from './ValidatorMiddleware';

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
                    'www.' + this.config.host !== host &&
                    'api.' + this.config.host !== host
                ) {
                    Response.error(
                        response,
                        new Error(
                            Enum.error.message.CORS,
                            Enum.error.code.FORBIDDEN
                        )
                    );
                    return;
                }

                response.header('Access-Control-Allow-Origin', host);
                response.header(
                    'Access-Control-Allow-Methods',
                    'GET,PUT,POST,DELETE'
                );
                response.header('Access-Control-Allow-Headers', 'Content-Type');
                next();
            });
        }

        app.use(express.json());
        app.use(helmet());
        app.use(compression());
        app.use(Validator);
        app.use(this.onError.bind(this));
        this.app = app;
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
        Response.error(
            response,
            new Error(
                Enum.error.message.BAD_REQUEST,
                Enum.error.code.BAD_REQUEST
            )
        );
    }
}
