'use strict';

const fs = require("fs");

const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');

//before: DOC_FINDER:{'out':[MarkDown RealPath]}
//after : DOC_SPLITTER:{'out':[[Head,Content,RealPath]]}
class DocSplitter extends Plugin {
    constructor() {
        super();
        this.outData = {'out': ''};
        this.log = new Logger('DocSplitter');
    }

    init(env) {
        super.init(env);
        this.before = Phos.DOC_FINDER;
        this.log.debug('Init Done.')
    }

    run() {
        let paths = this.env.getHistory(this.before)['out'];
        let outdata = [];

        //TODO Change To Async Exec
        paths.forEach((f) => {
            let data = fs.readFileSync(f);
            // , (err, data) => {
            // if (err) {
            //     this.log('readFile:\t' + err.message + '\tFile:\t' + f);
            //     throw err;
            // }
            data = data.toString();

            let head_re = /\s*'''\s*json\s*\n(.*\n)*?\s*'''/i;
            let head = head_re.exec(data);
            let content = data.replace(head_re, '');
            if (head != null) {
                head = head[0].replace(/(\s*'''\s*json)|(''')/gi, '')
            } else {
                head = '';
            }

            outdata.push([head, content, f]);
        });

        this.outData = {'out': outdata};
        return true;
    }

    type() {
        return DocSplitter.TYPE;
    }

    out() {
        return this.outData;
    }
}

DocSplitter.TYPE = Phos.DOC_SPLITTER;

module.exports = DocSplitter;
