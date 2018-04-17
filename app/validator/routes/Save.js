import 'bluebird';
import { Route } from './Route';
import { ErrorExtended as Error } from '../../response/Error';
import { Types } from '../../../../dbd.gg/app/js/data';
import { ErrorCode } from '../../Enum';
import {
    Name,
    Offering,
    Perks,
    Player,
    PerkTiers,
    Addons,
    Type,
    Power,
    Recaptcha
} from '../properties/save';

export class Save extends Route {
    static validate(body) {
        return Promise.all([this.build(body)]);
    }

    static build({
        name,
        offering,
        perks,
        player,
        tiers,
        addons,
        type,
        power,
        recaptcha
    } = {}) {
        const params = {
            name,
            offering,
            perks,
            player,
            tiers,
            addons,
            type,
            power,
            recaptcha
        };

        return new Promise((resolve, reject) => {
            const types = [
                Name.type(name),
                Type.type(type),
                Offering.type(offering),
                Perks.type(perks),
                Player.type(player),
                PerkTiers.type(tiers),
                Addons.type(addons),
                Power.type(power),
                Recaptcha.type(recaptcha)
            ];

            const values = [
                Type.value(params),
                Power.value(params),
                Addons.value(params),
                Perks.value(params),
                Offering.value(params)
            ];

            Promise.all(types)
                .then(() => {
                    if (
                        (!perks || !perks.length) &&
                        (!addons || !addons.length) &&
                        (!offering || !offering.length) &&
                        ((type === Types.SURVIVOR && !power) ||
                            type === Types.KILLER)
                    ) {
                        reject(
                            new Error(
                                'At least one perk, addon, offering, or item is required',
                                ErrorCode.BAD_REQUEST
                            )
                        );
                    }
                })
                .then(() => {
                    return Promise.all(values).catch(reject);
                })
                .then(resolve)
                .catch(reject);
        });
    }
}
