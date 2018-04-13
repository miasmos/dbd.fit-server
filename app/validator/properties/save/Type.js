import { Property } from '../Property';
import * as Joi from 'joi';
import * as Util from '../../../Util';
import { Types } from '../../../../../dbd.gg/app/js/data';
import {
    SurvivorFactory,
    KillerFactory
} from '../../../../../dbd.gg/app/js/factories';

class TypeProperty extends Property {
    constructor() {
        const schema = Joi.number()
            .integer()
            .equal(Object.values(Types))
            .required();
        super('type', schema);
    }

    value({ name, offering, perks, player, tiers, addons, type, power } = {}) {
        return new Promise((resolve, reject) => {
            if (type === Types.KILLER) {
                const killer = KillerFactory.get(player);
                if (killer.empty) {
                    reject(
                        this.error(`player ${player} is not of type killer`)
                    );
                }
            } else if (type === Types.SURVIVOR) {
                const survivor = SurvivorFactory.get(player);
                if (survivor.empty) {
                    reject(
                        this.error(`player ${player} is not of type survivor`)
                    );
                }
            }

            resolve();
        });
    }
}

export const Type = new TypeProperty();
