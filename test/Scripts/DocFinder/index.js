'use strict';

const path = require("path");


const Env = require('../../../lib/Phos/Env');
const DocFinder = require('../../../lib/DocFinder');
const Phos = require('../../../lib/Phos');
const DumbLogger = require('../Phos/DumbLogger');

describe('DocFinder', () => {
    let df = new DocFinder();
    df.log = new DumbLogger();
    it('Init', () => {
        let env = new Env();
        env.addHistory(Phos.ENV_LOADER, {'out': ['./test/TestMarkDown']});
        df.init(env);
        df.before.should.be.equal(Phos.ENV_LOADER);
    });

    it('Type', () => {
        df.type().should.be.equal(Phos.DOC_FINDER);
    });

    it('Run and Out', () => {
        df.run();
        let real = [
            './test/TestMarkDown/Test1/Test1.md',
            './test/TestMarkDown/Test1/Test3.MD',
            './test/TestMarkDown/Test5.md']
            .map((x) => path.resolve(x));

        df.out()['out'].join(' ').should.be.equal(real.join(' '));
    });

});

