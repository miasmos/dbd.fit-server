import { Op } from 'sequelize';
import { Table } from './Table';

export class Builds extends Table {
    get({ hash }) {
        return this.model.findOne({
            where: {
                hash
            },
            raw: true
        });
    }

    exists({ hash }) {
        return new Promise((resolve, reject) => {
            this.get({ hash })
                .then(result => {
                    if (result !== null && 'hash' in result && !!result.hash) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(reject);
        });
    }

    create({ name, perks, player, addons, type, power } = {}, hash) {
        if (!perks) {
            perks = [];
        }
        if (!addons) {
            addons = [];
        }

        return new Promise((resolve, reject) => {
            this.exists({ hash })
                .then(exists => {
                    if (!exists) {
                        this.model
                            .create({
                                player,
                                type,
                                power,
                                perkOne: perks[0],
                                perkTwo: perks[1],
                                perkThree: perks[2],
                                perkFour: perks[3],
                                addonOne: addons[0],
                                addonTwo: addons[1],
                                hash
                            })
                            .then(resolve)
                            .catch(reject);
                    } else {
                        resolve();
                    }
                })
                .catch(reject);
        });
    }
}
