'use strict';
const Env = require('./Env');

class Plugin {
    constructor() {
    }

    init(env) {
        if (env.constructor !== Env) {
            throw new Error('env is not Env-Class');
        }
        this.outdata = '';
        this.env = env;
    }

    run() {
        return true;
    }

    type() {
        return -1;
    }

    out() {
        return this.outdata;
    }
}

module.exports = Plugin;