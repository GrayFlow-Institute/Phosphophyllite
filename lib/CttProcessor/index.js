'use strict';

const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');

//before: HEAD_PROCESSOR:{'out':[[Head Object,Content,RealPath]]}
//after : CTT_PROCESSOR:{'out':[[Head Object,Content Object,RealPath]]}

class CttProcessor extends Plugin {
    constructor() {
        super();
        this.outData = {'out': ''};
        this.log = new Logger('CttProcessor');
    }

    init(env) {
        super.init(env);
        this.before = Phos.HEAD_PROCESSOR;
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

            let content = tuple[1];
            //TODO deal content





            this.log.debug(tuple[1] + '\t' + content);
            outdata.push([tuple[0], content, tuple[2]]);
        });

        this.outData = {'out': outdata};
        return true;
    }

    type() {
        return CttProcessor.TYPE;
    }

    out() {
        return this.outData;
    }
}


CttProcessor.TYPE = Phos.CTT_PROCESSOR;

module.exports = CttProcessor;

const Env = require('../Phos/Env');
let data = ['', '\n# H1', 'TestPath'];
let env = new Env();
env.addHistory(Phos.HEAD_PROCESSOR, {'out':[data]});
let cp = new CttProcessor();
cp.init(env);
cp.run();
