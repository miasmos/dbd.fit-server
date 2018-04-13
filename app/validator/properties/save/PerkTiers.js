import { Property } from '../Property';
import * as Joi from 'joi';
import * as Util from '../../../Util';

class PerkTiersProperty extends Property {
    constructor() {
        const schema = Joi.number()
            .integer()
            .min(1)
            .max(3)
            .allow(null);

        super(
            'tiers',
            Joi.array()
                .items(schema)
                .max(4)
        );
    }
}

export const PerkTiers = new PerkTiersProperty();
