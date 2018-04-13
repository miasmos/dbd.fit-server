import { Table } from './Table';

export class NamedBuilds extends Table {
    get({ hash }) {
        return this.model.findOne({
            where: {
                buildURI: hash
            },
            raw: true
        });
    }

    exists({ hash }) {
        return new Promise((resolve, reject) => {
            this.get({ hash })
                .then(result => {
                    if (result !== null && !!result.get('hash')) resolve(true);
                    else resolve(false);
                })
                .catch(reject);
        });
    }

    create(
        { name, offering, perks, player, tiers, addons, type, power } = {},
        buildHash,
        buildURI
    ) {
        if (!perks) {
            perks = [];
        }
        if (!tiers) {
            tiers = [];
        }
        if (!addons) {
            addons = [];
        }

        return this.model.create({
            name,
            buildURI,
            buildHash,
            perkOne: perks[0],
            perkTwo: perks[1],
            perkThree: perks[2],
            perkFour: perks[3],
            perkOneTier: tiers[0],
            perkTwoTier: tiers[1],
            perkThreeTier: tiers[2],
            perkFourTier: tiers[3]
        });
    }
}
