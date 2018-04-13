import { Property } from '../Property';
import * as Joi from 'joi';
import * as Util from '../../../Util';
import { AllPlayerFactory } from '../../../../../dbd.gg/app/js/factories';

const names = AllPlayerFactory.toArray().map(value => value.index);

class PlayerProperty extends Property {
    constructor() {
        const schema = Joi.string()
            .equal(names)
            .required();

        super('player', schema);
    }
}

export const Player = new PlayerProperty();
