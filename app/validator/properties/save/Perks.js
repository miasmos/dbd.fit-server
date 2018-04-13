import { Property } from '../Property';
import * as Joi from 'joi';
import * as Util from '../../../Util';
import {
    AllPerkFactory,
    KillerPerkFactory,
    SurvivorPerkFactory
} from '../../../../../dbd.gg/app/js/factories';
import { Types } from '../../../../../dbd.gg/app/js/data';

const names = AllPerkFactory.toArray().map(value => value.index);

class PerksProperty extends Property {
    constructor() {
        const schema = Joi.string()
            .equal(names)
            .allow(null);

        super(
            'perks',
            Joi.array()
                .items(schema)
                .max(4)
        );
    }

    value({ name, offering, perks, player, tiers, addons, type, power } = {}) {
        return new Promise((resolve, reject) => {
            if (!Util.Array.isEmpty(perks)) {
                for (let index = 0; index < perks.length; index++) {
                    let perk;

                    if (type === Types.KILLER) {
                        perk = KillerPerkFactory.get(perks[index]);
                    } else if (type === Types.SURVIVOR) {
                        perk = SurvivorPerkFactory.get(perks[index]);
                    }

                    if (perk.empty) {
                        reject(
                            this.error(
                                `perk ${perks[index]} is not used by ${
                                    type === Types.KILLER
                                        ? 'killers'
                                        : 'survivors'
                                }`
                            )
                        );
                    }
                }

                if (Util.Array.hasDuplicate(perks)) {
                    reject(this.error(`cannot use a perk more than once`));
                }
            }

            resolve();
        });
    }
}

export const Perks = new PerksProperty();
