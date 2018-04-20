import 'bluebird';
import * as Joi from 'joi';
import { Response } from '../response/Response';
import { ErrorType, ErrorMessage, ErrorCode } from '../Enum';
import { FillString } from '../Util';
import { RouteManager } from './RouteManager';
import { Save, Get, Chat } from './routes';

let validator;

class ValidatorMiddleware {
    constructor() {
        const routes = new RouteManager();
        routes.add('/build/save', Save);
        routes.add('/build/get', Get);
        routes.add('/chat/block', Chat);
        routes.add('/chat/allow', Chat);
        routes.add('/chat/join', Chat);
        routes.add('/chat/leave', Chat);
        routes.add('/chat/view', Chat);
        routes.add('/chat/channel', Chat);
        this.routes = routes;
    }

    middleware(request, response, next) {
        const route = request.path;

        if (validator.routes.exists(route)) {
            validator.routes
                .get(route)
                .validate(request.body)
                .then(() => {
                    next();
                })
                .catch(error => {
                    console.log(error);
                    if (error instanceof Error) {
                        Response.error(response, error);
                    } else {
                        Response.error(
                            response,
                            new Error(
                                ErrorMessage.BAD_REQUEST,
                                ErrorCode.BAD_REQUEST
                            )
                        );
                    }
                });
        } else {
            next();
        }
    }
}

validator = new ValidatorMiddleware();
const middleware = validator.middleware;

export { middleware as Validator };
