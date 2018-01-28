'use strict';

const fs = require("fs");

const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');
const yaml = require('js-yaml');

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

        paths.forEach((f) => {
            let data = fs.readFileSync(f);
            data = data.toString();

            let json_head_re = /\s*'''\s*json\s*\n(.*\n)*?\s*'''\s*/i;
            let yaml_head_re = /\s*(?:(?:---+)|(?:```ya?ml))\s*\n(.*\n)*?\s*((?:---+)|(?:\s*```))\s*/i;

            let head = '';
            let content = '';
            if (json_head_re.test(data)) {
                head = json_head_re.exec(data);
                content = data.replace(json_head_re, '');
                if (head != null) {
                    head = head[0].replace(/(\s*'''\s*json)|(''')/gi, '')
                } else {
                    head = '';
                }
            } else if (yaml_head_re.test(data)) {
                head = yaml_head_re.exec(data);
                content = data.replace(yaml_head_re, '');
                if (head != null) {
                    head = head[0].replace(/(\s*(?:(?:---+)|(?:```ya?ml))\s*\n)|(\s*((?:---+)|(?:\s*```))\s*)/gi, '')
                } else {
                    head = '';
                }
                head = head !== '' ? JSON.stringify(yaml.safeLoad(head)) : '';
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

// let p = console.log;

// function scan(data) {
//     let yaml_head_re = /\s*(?:(?:---+)|(?:```ya?ml))\s*\n(.*\n)*?\s*((?:---+)|(?:\s*```))\s*/i;
//
//     let head = '';
//     let content = '';
//     if (yaml_head_re.test(data)) {
//         head = yaml_head_re.exec(data);
//         content = data.replace(yaml_head_re, '');
//         if (head != null) {
//             head = head[0].replace(/(\s*(?:(?:---+)|(?:```ya?ml))\s*\n)|(\s*((?:---+)|(?:\s*```))\s*)/gi, '')
//         } else {
//             head = '';
//         }
//         head = JSON.stringify(yaml.safeLoad(head));
//         p(head);
//         p('----------------------------');
//         p(content);
//     }
// }
//
// p(__dirname);
//
// let data = fs.readFileSync('../../test/TestMarkDown/Test1/Test3.MD');
// data = data.toString();
// scan(data);

