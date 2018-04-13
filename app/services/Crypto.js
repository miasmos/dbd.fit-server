const shorthash = require('shorthash');
const md5 = require('md5');

export class Crypto {
    static timestamp(str = '') {
        return str + +new Date();
    }

    static shorthash(str) {
        return shorthash.unique(str);
    }

    static hash(str) {
        return md5(str);
    }
}
