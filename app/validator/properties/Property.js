import 'bluebird';
import * as Joi from 'joi';
import { ErrorType, ErrorMessage, ErrorCode } from '../../Enum';
import { IsPromise, FillString } from '../../Util';
import { ErrorExtended as Error } from '../../response/Error';

export class Property {
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;
    }

    type(value) {
        return new Promise((resolve, reject) => {
            Joi.validate(value, this.schema)
                .then(resolve)
                .catch(error => {
                    let message = `${this.name} ${error.details[0].message}`;
                    if (message.length > 75) {
                        message = message.substring(0, 75) + '...';
                    }
                    reject(new Error(message, ErrorCode.BAD_REQUEST));
                });
        });
    }

    value() {
        return this.success();
    }

    success() {
        return Promise.resolve();
    }

    error(message) {
        return new Error(message, ErrorCode.BAD_REQUEST);
    }

    validate(value) {
        return Promise.all([this.type(value), this.value(value)]);
    }
}
