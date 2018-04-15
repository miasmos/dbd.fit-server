import { Op, literal } from 'sequelize';
import { Table } from './Table';

export class BuildStats extends Table {
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

    created({ hash }) {
        return new Promise((resolve, reject) => {
            this.exists({ hash })
                .then(exists => {
                    if (!exists) {
                        this.model
                            .create({
                                hash
                            })
                            .then(resolve)
                            .catch(reject);
                    } else {
                        this.model.update(
                            {
                                created: literal('created + 1')
                            },
                            { where: { hash } }
                        );
                    }
                })
                .catch(reject);
        });
    }

    viewed({ hash }) {
        return new Promise((resolve, reject) => {
            this.exists({ hash })
                .then(exists => {
                    if (!exists) {
                        this.model
                            .create({
                                hash
                            })
                            .then(resolve)
                            .catch(reject);
                    } else {
                        this.model.update(
                            {
                                viewed: literal('viewed + 1')
                            },
                            { where: { hash } }
                        );
                    }
                })
                .catch(reject);
        });
    }
}
