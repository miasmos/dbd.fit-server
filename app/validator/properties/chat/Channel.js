import { Property } from '../Property';
import * as Joi from 'joi';

class ChannelProperty extends Property {
    constructor() {
        const schema = Joi.string()
            .min(4)
            .max(25)
            .required();

        super('channel', schema);
    }
}

export const Channel = new ChannelProperty();
