'use strict';

const Logger = require('../../../lib/Phos/Logger');

class DumbLogger extends Logger {
    constructor() {
        super('DumbLogger');
    }

    info(msg) {
    }

    debug(msg) {
    }

    warning(msg) {
    }

    error(msg) {
    }
}

module.exports = DumbLogger;