'use strict';
const Env = require('./Env');

class Task {

    constructor(name) {
        this.name = name;
        this.env = new Env();
        this.plugins = [];
    }

    init(plugins) {
        this.plugins = plugins;
    }

    run() {
        for (let index in this.plugins) {
            let plugin = this.plugins[index];
            plugin.init(this.env);
            plugin.run();
            this.env.addHistory(plugin.type(), plugin.out());
        }
    }
}




module.exports = Task;