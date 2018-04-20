import { Property } from './Property';
import * as Joi from 'joi';

export class BooleanProperty extends Property {
    constructor(name) {
        const schema = Joi.boolean();
        super(name, schema);
    }
}
