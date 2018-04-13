import { Property } from '../Property';
import * as Joi from 'joi';
import * as Util from '../../../Util';
import {
    PowerFactory,
    ItemFactory
} from '../../../../../dbd.gg/app/js/factories';
import { Types } from '../../../../../dbd.gg/app/js/data';

const powers = PowerFactory.toArray().concat(ItemFactory.toArray());
const names = powers.map(value => value.index);

class PowerProperty extends Property {
    constructor() {
        const schema = Joi.string()
            .equal(names)
            .allow(null);
        super('power', schema);
    }

    value({ name, offering, perks, player, tiers, addons, type, power } = {}) {
        return new Promise((resolve, reject) => {
            if (type === Types.KILLER) {
                if (!power) {
                    reject(this.error(`killers require a power`));
                } else {
                    const powerModel = PowerFactory.get(power);
                    if (powerModel.empty) {
                        reject(
                            this.error(`power ${power} is not for a killer`)
                        );
                    } else {
                        if (powerModel.owner.index !== player) {
                            reject(
                                this.error(
                                    `specified power ${power} is not used by ${player}`
                                )
                            );
                        }
                    }
                }
            } else {
                if (!power) {
                    if (!Util.Array.isEmpty(addons)) {
                        reject(this.error(`can't have addons without an item`));
                    }
                } else {
                    const itemModel = ItemFactory.get(power);
                    if (itemModel.empty) {
                        reject(
                            this.error(
                                `power ${power} is not for a survivor (though it would be cool if it were)`
                            )
                        );
                    }
                }
            }

            resolve();
        });
    }
}

export const Power = new PowerProperty();
