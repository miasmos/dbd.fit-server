import { Crypto } from '../services/Crypto';
import {
    AllPerkFactory,
    AllAddonFactory,
    AllOfferingFactory
} from '../../../dbd.gg/app/js/factories';

export class Normalize {
    static build({ offering, perks, player, addons, power }) {
        const str =
            player +
            power +
            (!!perks && perks.length ? this.stringifyPerks(perks) : '') +
            (!!addons && addons.length ? this.stringifyAddons(addons) : '') +
            (!!offering ? offering : '');

        return Crypto.hash(str);
    }

    static buildURI({ name, tiers, player, power, addons, perks, offering }) {
        const str =
            name +
            player +
            power +
            (!!tiers && tiers.length ? tiers : '') +
            (!!perks && perks.length ? this.stringifyPerks(perks) : '') +
            (!!addons && addons.length ? this.stringifyAddons(addons) : '') +
            (!!offering ? offering : '');

        return Crypto.shorthash(Crypto.timestamp() + str);
    }

    static stringifyPerks(perks) {
        if (perks.length === 1) {
            return perks[0];
        }

        let str = '';
        let ids = [];
        let perkModels = perks.map(value => {
            const perk = AllPerkFactory.get(value);
            ids.push(perk.id);
            return perk;
        });
        ids = ids.sort((a, b) => a - b);

        ids.map(id => {
            for (let index = 0; index < perkModels.length; index++) {
                const perk = perkModels[index];

                if (perk.id === id) {
                    perkModels.splice(index, 1);
                    str += perk.index;
                }
            }
        });

        return str;
    }

    static stringifyAddons(addons) {
        if (addons.length === 1) {
            return addons[0];
        }

        let str = '';
        let ids = [];
        let addonModels = addons.map(value => {
            const addon = AllAddonFactory.get(value);
            ids.push(addon.id);
            return addon;
        });
        ids = ids.sort((a, b) => a - b);

        ids.map(id => {
            for (let index = 0; index < addonModels.length; index++) {
                const addon = addonModels[index];

                if (addon.id === id) {
                    addonModels.splice(index, 1);
                    str += addon.index;
                }
            }
        });

        return str;
    }
}
