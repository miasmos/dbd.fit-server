import { Property } from '../Property';
import * as Joi from 'joi';
import * as Util from '../../../Util';
import {
    AllAddonFactory,
    KillerAddonFactory,
    SurvivorAddonFactory,
    PowerFactory,
    ItemFactory
} from '../../../../../dbd.gg/app/js/factories';
import { Types, ItemTypes } from '../../../../../dbd.gg/app/js/data/Enum';

const names = AllAddonFactory.toArray().map(value => value.index);

class AddonsProperty extends Property {
    constructor() {
        const schema = Joi.equal(names).allow(null);

        super(
            'addons',
            Joi.array()
                .items(schema)
                .max(2)
        );
    }

    value({ name, offering, perks, player, tiers, addons, type, power } = {}) {
        return new Promise((resolve, reject) => {
            if (!Util.Array.isEmpty(addons)) {
                if (!power && type === Types.KILLER) {
                    reject(
                        this.error(
                            'power is required when an addon is specified'
                        )
                    );
                }

                let powerModel = ItemFactory.get(power);

                for (let index = 0; index < addons.length; index++) {
                    let addon = AllAddonFactory.get(addons[index]);

                    if (
                        (type === Types.SURVIVOR &&
                            addon.type !== powerModel.type) ||
                        (type === Types.KILLER && addon.owner.index !== player)
                    ) {
                        reject(
                            this.error(
                                `addon ${addon.index} ${
                                    type === Types.SURVIVOR
                                        ? `isn't used with ${powerModel.type}`
                                        : `isn't used by ${player}`
                                }`
                            )
                        );
                    }
                }

                if (Util.Array.hasDuplicate(addons)) {
                    reject(this.error(`cannot use an addon more than once`));
                }
            }

            resolve();
        });
    }
}

export const Addons = new AddonsProperty();
