'use strict';
import { Env } from './services/Env';
import { Enum } from './Enum';
import { Database } from './database/db';
import { Response } from './response/Response';
import { ErrorExtended as Error } from './response/Error';
import { Server } from './server';

let config = require('./config.json'),
    credentials = require('./credentials.json');

class App {
    constructor() {
        const server = new Server();

        this.db = new Database(
            Env.isDevelopment()
                ? credentials.development.database
                : credentials.production.database
        );

        server.post('/save', (request, response) => {
            Response.ok(response);
        });

        server.get('*', (request, response) => {
            Response.error(
                response,
                new Error(
                    Enum.error.message.NOT_FOUND,
                    Enum.error.code.NOT_FOUND
                )
            );
        });

        server.start();
    }
}

let app = new App();
