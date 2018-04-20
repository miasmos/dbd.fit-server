import 'bluebird';
import { Route } from './Route';
import { ErrorExtended as Error } from '../../response/Error';
import { Types } from '../../../../dbd.gg/app/js/data';
import { ErrorCode } from '../../Enum';
import { Blocked, Channel, Join } from '../properties/chat';

export class Chat extends Route {
    static validate({ channel, blocked, join }) {
        return new Promise((resolve, reject) => {
            const types = [
                Blocked.type(blocked),
                Channel.type(channel),
                Join.type(join)
            ];

            Promise.all(types)
                .then(resolve)
                .catch(reject);
        });
    }
}
