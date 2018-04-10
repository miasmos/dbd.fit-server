const shorthash = require('shorthash');

export class Crypto {
    static timestampHash(str) {
        return shorthash.unique(+new Date() + str);
    }
}
