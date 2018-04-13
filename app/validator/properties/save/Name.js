import { Property } from '../Property';
import * as Joi from 'joi';

class NameProperty extends Property {
    constructor() {
        const schema = Joi.string()
            .min(1)
            .max(30)
            .required();

        super('name', schema);
    }
}

export const Name = new NameProperty();
