'use strict';
const Env = require('./Env');
const Logger = require('./Logger');

class Task {

    constructor(name) {
        this.name = name;
        this.env = new Env();
        this.plugins = [];
        this.log = new Logger('Task:' + this.name);
        this.log.debug(name + ' is created.')
    }

    init(plugins) {
        this.plugins = plugins;
        this.log.debug('plugins loaded.');
    }

    run() {
        for (let index in this.plugins) {
            let plugin = this.plugins[index];
            plugin.init(this.env);
            if (!plugin.run()) {
                this.log.error(plugin.type().toString());
            }
            this.env.addHistory(plugin.type(), plugin.out());
            this.log.info(plugin.out())
        }

        this.log.debug('Run Done.');
        return true;
    }
}


module.exports = Task;