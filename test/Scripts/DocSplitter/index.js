'use strict';

const Env = require('../../../lib/Phos/Env');
const Phos = require('../../../lib/Phos');
const DumbLogger = require('../Phos/DumbLogger');
const DocSplitter = require('../../../lib/DocSplitter');


describe('DocSplitter', () => {
    let ds = new DocSplitter();
    ds.log = new DumbLogger();

    let path = [
        './test/TestMarkDown/Test1/Test3.MD',
        './test/TestMarkDown/Test5.md',
        './test/TestMarkDown/Test1/Test1.md'
    ];

    it('Init', () => {
        let env = new Env();


        env.addHistory(Phos.DOC_FINDER, {'out': path});
        ds.init(env);
        ds.before.should.be.equal(Phos.DOC_FINDER);
    });

    it('Type', () => {
        ds.type().should.be.equal(Phos.DOC_SPLITTER);
    });

    it('Run and Out', () => {
        ds.run().should.be.true();

        let data = ds.out()['out']
            .map(x => {
                return x[0].replace(/'/g, '"').replace(/\n|\s/g, '') + x[1];
            });
        data[0].should.be.equal(data[1]);
        data[1].should.be.equal(data[2]);
    });

});

