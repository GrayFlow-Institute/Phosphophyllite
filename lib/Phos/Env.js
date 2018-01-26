'use strict';

class Env {
    constructor() {
        // like:
        // {
        //     0:'outData',  //0
        //     1:'outData',  //1
        //     2:'outData',  //2
        //     3:'outData'   //3
        // }
        this.history = {};
    }

    //(int)->data
    getHistory(where) {
        let his = this.history[where];
        return his === undefined ? '' : his;
    }

    //(int,data)->undefined
    addHistory(where, data) {
        this.history[where] = data;
    };
}

module.exports=Env;