'use strict';
const Env = require('./Env');
const Logger = require('./Logger');

class Task {

    constructor(name) {
        this.name = name;
        this.env = new Env();
        this.plugins = [];
        this.logger = new Logger('Task:' + this.name);
    }

    init(plugins) {
        this.plugins = plugins;
    }

    run() {
        for (let index in this.plugins) {
            let plugin = this.plugins[index];
            plugin.init(this.env);
            if (!plugin.run()) {
                this.logger.error(plugin.type.toString())
            }
            this.env.addHistory(plugin.type(), plugin.out());
        }
    }
}


module.exports = Task;