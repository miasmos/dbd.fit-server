'use strict';
import { ErrorCode, ErrorMessage } from '../Enum';

export class Response {
    static ok(res, data) {
        return this.make(res, data, undefined);
    }

    static error(res, error) {
        return this.make(
            res,
            undefined,
            error || new Error(ErrorMessage.GENERIC_ERROR, ErrorCode.ERROR)
        );
    }

    static make(res, data, error) {
        if (typeof error !== 'undefined') {
            res.status(error.code || ErrorCode.ERROR).json({
                status: error.code || ErrorCode.ERROR,
                error: error.message || ErrorMessage.GENERIC_ERROR,
                data: {}
            });
        } else {
            res.status(ErrorCode.OK).json({
                status: ErrorCode.OK,
                data: data
            });
        }
    }
}
