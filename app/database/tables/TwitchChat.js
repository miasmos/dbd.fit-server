import { literal } from 'sequelize';
import { Table } from './Table';

export class TwitchChat extends Table {
    get({ channel }) {
        return this.model.findOne({
            attributes: ['channel', 'views', 'blocked', 'join'],
            where: {
                channel
            },
            raw: true
        });
    }

    exists({ channel }) {
        return new Promise((resolve, reject) => {
            this.get({ channel })
                .then(result => {
                    if (result !== null) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(reject);
        });
    }

    async upsert({ channel, blocked, join, view = false }) {
        const exists = await this.exists({ channel });

        if (exists) {
            return this.model.update(
                {
                    channel,
                    blocked:
                        typeof blocked !== 'undefined'
                            ? blocked
                            : literal('blocked'),
                    join: typeof join !== 'undefined' ? join : literal('join'),
                    views:
                        typeof views !== 'undefined'
                            ? literal('views + 1')
                            : literal('views')
                },
                { where: { channel } }
            );
        } else {
            return this.model.create({
                channel,
                blocked,
                join
            });
        }
    }

    getAll() {
        return this.model.findAll({
            raw: true,
            attributes: ['channel', 'views', 'blocked', 'join']
        });
    }
}
