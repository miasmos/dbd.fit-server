import { Property } from '../Property';
import * as Joi from 'joi';
import * as Util from '../../../Util';
import {
    AllOfferingFactory,
    SurvivorOfferingFactory,
    KillerOfferingFactory,
    SharedOfferingFactory
} from '../../../../../dbd.gg/app/js/factories';
import { Types } from '../../../../../dbd.gg/app/js/data';

const names = AllOfferingFactory.toArray().map(value => value.index);

class OfferingProperty extends Property {
    constructor() {
        const schema = Joi.equal(names).allow(null);
        super('offering', schema);
    }

    value({ name, offering, perks, player, tiers, addons, type, power } = {}) {
        return new Promise((resolve, reject) => {
            if (!!offering) {
                let offeringModel;

                if (type === Types.KILLER) {
                    offeringModel = KillerOfferingFactory.get(offering);
                } else if (type === Types.SURVIVOR) {
                    offeringModel = SurvivorOfferingFactory.get(offering);
                }

                if (offeringModel.empty) {
                    offeringModel = SharedOfferingFactory.get(offering);
                }

                if (offeringModel.empty) {
                    reject(
                        this.error(
                            `offering ${offering} is not used by ${
                                type === Types.KILLER ? 'killers' : 'survivors'
                            }`
                        )
                    );
                }
            }

            resolve();
        });
    }
}

export const Offering = new OfferingProperty();
