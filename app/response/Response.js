'use strict';
import { Enum } from '../Enum';

export class Response {
    static ok(res, data) {
        return this.make(res, data, undefined);
    }

    static error(res, error) {
        return this.make(res, undefined, error);
    }

    static make(res, data, error) {
        if (typeof error !== 'undefined') {
            res.status(error.code || Enum.error.code.ERROR).json({
                status: error.code || Enum.error.code.ERROR,
                error: error.message || Enum.error.message.GENERIC_ERROR,
                data: {}
            });
        } else {
            res.status(Enum.error.code.OK).json({
                status: Enum.error.code.OK,
                data: data
            });
        }
    }
}
