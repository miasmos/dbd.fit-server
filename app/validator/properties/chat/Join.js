import { BooleanProperty } from '../BooleanProperty';
import * as Joi from 'joi';

class JoinProperty extends BooleanProperty {
    constructor() {
        super('join');
    }
}

export const Join = new JoinProperty();
