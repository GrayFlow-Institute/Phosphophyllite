'use strict';


class Env {
    constructor() {
        // like:
        // let history={
        //     0:{'out':'outData'},  // must have 'out'
        //     1:{'out':'outData','head':'value'},
        //     2:{'out':'outData','xxx':'value'},
        //     3:{'out':'outData'}
        // };
        this.history = {};
    }

    //(index)->data
    getHistory(where) {
        let his = this.history[where];
        return his === undefined ? '' : his;
    }

    //(index,data)->undefined
    addHistory(where, data) {
        this.history[where] = data;
    };
}

module.exports = Env;