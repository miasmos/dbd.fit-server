import 'sequelize';
import { Table } from './Table';

export class NamedBuilds extends Table {
    Get(hash) {
        return this.model.findOne({
            where: {
                hash: {
                    [Op.eq]: hash
                }
            }
        });
    }

    Exists(hash) {
        return new Promise((resolve, reject) => {
            this.Get(hash)
                .then(result => {
                    if (result !== null && !!result.get('hash')) resolve(true);
                    else resolve(false);
                })
                .catch(reject);
        });
    }
}
