'use strict';
const events = require('events');
const Task = require('./Task');
const Logger = require('./Logger');

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
        this.loger = new Logger('Phos');
    }

    init(argv) {
        let loader = new EnvLoader();
        loader.init(argv);
        this.tasks = loader.getTasks();
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
Phos.START = 0;
Phos.ENV_LOADER = 1;
Phos.DOC_FINDER = 2;
Phos.DOC_SPLITTER = 3;
Phos.HEAD_PROCESSOR = 4;
Phos.CTT_PROCESSOR = 5;
Phos.TEMP_ORGANIZER = 6;
Phos.FILE_EXPORTER = 7;
Phos.END = 8;

module.exports = Phos;

