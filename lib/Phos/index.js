'use strict';
const events = require('events');
const Task = require('./Task');


const EnvLoader = require('../EnvLoader');


class Phos {
    constructor() {
        //Each tasks have different execution plug-in flow
        //Every task have one env
        // [
        //     task1,
        //     task2,
        //     task3
        // ]
        this.tasks = [];
    }

    init(argv) {
        this.tasks = EnvLoader(argv);
    }

    run() {
        let action = new events.EventEmitter();
        for (let index in this.tasks) {
            let task = this.tasks[index];
            action.on(task.name, () => {
                task.run();
            });
        }
        this.tasks.map((x) => x.name).forEach((x) => {
            action.emit(x)
        });
    }
}


//just reference
Phos.prototype.START = 0;
Phos.prototype.ENV_LOADER = 1;
Phos.prototype.DOC_FINDER = 2;
Phos.prototype.DOC_SPLITTER = 3;
Phos.prototype.HEAD_PROCESSOR = 4;
Phos.prototype.CTT_PROCESSOR = 5;
Phos.prototype.TEMP_ORGANIZER = 6;
Phos.prototype.FILE_EXPORTER = 7;
Phos.prototype.END = 8;

module.exports = Phos;

