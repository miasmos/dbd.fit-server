import { Op, literal } from 'sequelize';
import { Table } from './Table';

export class Stats extends Table {
    get({ index, type }) {
        return this.model.findOne({
            where: {
                index,
                type
            },
            raw: true
        });
    }

    exists({ index, type }) {
        return new Promise((resolve, reject) => {
            this.get({ index, type })
                .then(result => {
                    if (
                        result !== null &&
                        'index' in result &&
                        !!result.index
                    ) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(reject);
        });
    }

    created({ index, type }) {
        return new Promise((resolve, reject) => {
            this.exists({ index, type })
                .then(exists => {
                    if (!exists) {
                        this.model
                            .create({
                                index,
                                type
                            })
                            .then(resolve)
                            .catch(reject);
                    } else {
                        this.model.update(
                            {
                                created: literal('created + 1')
                            },
                            { where: { index, type } }
                        );
                    }
                })
                .catch(reject);
        });
    }

    viewed({ index, type }) {
        return new Promise((resolve, reject) => {
            this.exists({ index, type })
                .then(exists => {
                    if (!exists) {
                        this.model
                            .create({
                                index,
                                type
                            })
                            .then(resolve)
                            .catch(reject);
                    } else {
                        this.model.update(
                            {
                                viewed: literal('viewed + 1')
                            },
                            { where: { index, type } }
                        );
                    }
                })
                .catch(reject);
        });
    }

    createFromBuild({ perks, player, addons, type, power, offering }) {
        const all = [
            perks[0],
            perks[1],
            perks[2],
            perks[3],
            player,
            addons[0],
            addons[1],
            type,
            power,
            offering
        ];

        return Promise.all(
            all.map(value => {
                if (
                    value === null ||
                    typeof value === 'undefined' ||
                    (!!value && 'empty' in value && value.empty)
                ) {
                    return Promise.resolve();
                } else {
                    return this.created({
                        index: value.index,
                        type: value.modifierType
                    });
                }
            })
        );
    }

    viewFromBuild({ perks, player, addons, type, power, offering }) {
        const all = [
            perks[0],
            perks[1],
            perks[2],
            perks[3],
            player,
            addons[0],
            addons[1],
            type,
            power,
            offering
        ];

        return Promise.all(
            all.map(value => {
                if (
                    value === null ||
                    typeof value === 'undefined' ||
                    (!!value && 'empty' in value && value.empty)
                ) {
                    return Promise.resolve();
                } else {
                    return this.viewed({
                        index: value.index,
                        type: value.modifierType
                    });
                }
            })
        );
    }
}
