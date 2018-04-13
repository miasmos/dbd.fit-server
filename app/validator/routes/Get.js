import 'bluebird';
import { Route } from './Route';
import { ErrorExtended as Error } from '../../response/Error';
import { Types } from '../../../../dbd.gg/app/js/data';
import { ErrorCode } from '../../Enum';
import { Hash } from '../properties/get';

export class Get extends Route {
    static validate(body) {
        return Promise.all([this.build(body)]);
    }

    static build({ hash } = {}) {
        const params = {
            hash
        };

        return new Promise((resolve, reject) => {
            const types = [Hash.type(hash)];

            Promise.all(types)
                .then(resolve)
                .catch(reject);
        });
    }
}
