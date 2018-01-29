'use strict';

const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');

//before: DOC_SPLITTER:{'out':[[[Head,Content,RealPath]]]}
//after : HEAD_PROCESSOR:{'out':[[Head Object,Content,RealPath]]}
class HeadProcessor extends Plugin {
    constructor() {
        super();
        this.outData = {'out': ''};
        this.log = new Logger('HeadProcessor');
    }

    init(env) {
        super.init(env);
        this.before = Phos.DOC_SPLITTER;
        this.log.debug('Init Done.')
    }

    run() {
        let tuples = this.env.getHistory(this.before)['out'];
        let outdata = [];

        tuples.forEach((tuple) => {
            if (tuple.length !== 3) {
                this.log.error(tuple);
                throw new Error('tuple\'s length is not 3');
            }

            // let head = JSON.parse(tuple[0].replace(/'/g,'"'));
            let head = eval('let data = '+tuple[0]+'\ndata');

            this.log.debug(tuple[2] + '\t' + head);
            outdata.push([head, tuple[1], tuple[2]]);
        });

        this.outData = {'out': outdata};
        return true;
    }

    type() {
        return HeadProcessor.TYPE;
    }

    out() {
        return this.outData;
    }
}


HeadProcessor.TYPE = Phos.HEAD_PROCESSOR;

module.exports = HeadProcessor;
//
// const Env = require('../Phos/Env');
//
// let json = "{\n" +
//     "    'title':'MarkDownTest',\n" +
//     "    'date':'2018-01-28T22:06:45.000Z',\n" +
//     "    'tags':['test','phos']\n" +
//     "}";
// let data = [json, '\n# H1', 'TestPath'];
// let env = new Env();
// env.addHistory(Phos.DOC_SPLITTER, {'out':[data]});
// let hp = new HeadProcessor();
// hp.init(env);
// hp.run();
