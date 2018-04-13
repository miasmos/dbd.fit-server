import { Property } from '../Property';
import * as Joi from 'joi';

class HashProperty extends Property {
    constructor() {
        const schema = Joi.string()
            .min(1)
            .max(30)
            .required();

        super('hash', schema);
    }
}

export const Hash = new HashProperty();
