import { Property } from '../Property';
import * as Joi from 'joi';

export class RecaptchaProperty extends Property {
    constructor() {
        const schema = Joi.string().required();

        super('recaptcha', schema);
    }
}

export const Recaptcha = new RecaptchaProperty();
