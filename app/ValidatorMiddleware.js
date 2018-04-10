import { Response } from './response/Response';
import { ErrorExtended as Error } from './response/Error';
import { Enum } from './Enum';
import 'bluebird';
import * as Joi from 'joi';

let validator;

class ValidatorMiddleware {
    middleware(request, response, next) {
        const method = request.path.replace(/\//g, '');

        if (!!method && method in validator) {
            validator[method](request.body)
                .then(next)
                .catch(error => Response.error(response, error));
        } else {
            next();
        }
    }

    validate(schema, body) {
        return new Promise((resolve, reject) => {
            Joi.validate(body, schema, (error, value) => {
                if (error === null) {
                    resolve();
                } else {
                    reject(
                        new Error(
                            Enum.error.message.BAD_REQUEST,
                            Enum.error.code.BAD_REQUEST
                        )
                    );
                }
            });
        });
    }

    save(body) {
        return this.validate(
            Joi.object().keys({
                player: Joi.string()
                    .min(3)
                    .max(36)
                    .required(),
                type: Joi.number()
                    .integer()
                    .min(0)
                    .max(2)
                    .required(),
                power: Joi.string()
                    .min(3)
                    .max(36),
                addon1: Joi.string()
                    .min(3)
                    .max(55),
                addon2: Joi.string()
                    .min(3)
                    .max(55),
                offering: Joi.string()
                    .min(3)
                    .max(55),
                perk1: Joi.string()
                    .min(3)
                    .max(55),
                perk2: Joi.string()
                    .min(3)
                    .max(55),
                perk3: Joi.string()
                    .min(3)
                    .max(55),
                perk4: Joi.string()
                    .min(3)
                    .max(55),
                perk1Rank: Joi.string()
                    .min(3)
                    .max(55),
                perk2Rank: Joi.string()
                    .min(3)
                    .max(55),
                perk3Rank: Joi.string()
                    .min(3)
                    .max(55),
                perk4Rank: Joi.string()
                    .min(3)
                    .max(55),
                name: Joi.string()
                    .min(1)
                    .max(30)
                    .required()
            }),
            body
        );
    }
}

validator = new ValidatorMiddleware();
const middleware = validator.middleware;

export { middleware as Validator };
