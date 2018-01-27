'use strict';

class Logger {
    constructor(name) {
        this.name = name;
        this.lv = 0; // >3:<info >2:<debug >1:<warning <=0:<error
    }

    info(msg) {
        if (this.lv < 3) return;
        this._p(msg, 'info');
    }

    debug(msg) {
        if (this.lv < 2) return;
        this._p(msg, 'debug');
    }

    warning(msg) {
        if (this.lv < 1) return;
        this._p(msg, 'warning');
    }

    error(msg) {
        if (this.lv < 0) return;
        this._p(msg, 'error');
    }

    _p(x, v) {
        let time = new Date();
        let msg = '[' + time.format('yyyy-MM-dd hh:mm:ss') + ']\t' +
            this.name + '\t' +
            v + '\t' +
            x;
        console.log(msg);
    }
}

Date.prototype.format = function (fmt) {
    let o = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k === "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k === "S+") {
                let lens = RegExp.$1.length;
                lens = lens === 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
};

module.exports = Logger;