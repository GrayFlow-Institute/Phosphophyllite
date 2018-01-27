'use strict';
const Env = require('./Env');
const Logger = require('./Logger');

class Plugin {
    constructor() {
    }

    init(env) {
        if (env.constructor !== Env) {
            throw new Error('env is not Env-Class');
        }
        this.outData = '';
        this.env = env;
        this.log = new Logger('Plugin Base');
    }

    run() {
        return true;
    }

    type() {
        return -1;
    }

    out() {
        return this.outData;
    }
}

module.exports = Plugin;