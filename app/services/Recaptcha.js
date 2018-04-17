import 'bluebird';
import { Env } from './Env';
import { ErrorExtended as Error } from '../response/Error';
import { ErrorCode, ErrorMessage } from '../Enum';

var request = require('request-promise'),
    credentials = require('../credentials.json'),
    key = Env.isDevelopment()
        ? credentials.development.recaptcha.private
        : credentials.production.recaptcha.private;

export class Recaptcha {
    static verify({ recaptcha }) {
        return new Promise((resolve, reject) => {
            if (!recaptcha || !recaptcha.length) {
                reject(new Error(ErrorMessage.GENERIC_ERROR));
            }

            request({
                method: 'POST',
                uri: 'https://www.google.com/recaptcha/api/siteverify',
                form: {
                    secret: key,
                    response: recaptcha
                }
            })
                .then(body => {
                    try {
                        return JSON.parse(body);
                    } catch (e) {
                        reject(new Error(ErrorMessage.GENERIC_ERROR));
                    }
                })
                .then(json => {
                    if ('success' in json && json.success) {
                        resolve();
                    } else {
                        reject(
                            new Error(
                                ErrorMessage.RECAPTCHA_FAILED,
                                ErrorCode.RECAPTCHA_FAILED
                            )
                        );
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
