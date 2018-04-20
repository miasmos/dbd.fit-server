import { BooleanProperty } from '../BooleanProperty';
import * as Joi from 'joi';

class BlockedProperty extends BooleanProperty {
    constructor() {
        super('blocked');
    }
}

export const Blocked = new BlockedProperty();
