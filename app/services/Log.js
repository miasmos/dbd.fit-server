import { Env } from './Env';

export class Log {
    static log(...args) {
        if (Env.isProduction()) {
            return;
        }
        console.log(...args);
    }

    static warn(...args) {
        console.warn(...args);
    }

    static error(...args) {
        console.error(...args);
    }

    static dir(...args) {
        console.dir(...args);
    }
}
