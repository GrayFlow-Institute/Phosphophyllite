'use strict';


const Env = require('../../../lib/Phos/Env');
const Phos = require('../../../lib/Phos');
const DumbLogger = require('../Phos/DumbLogger');
const CttProcessor = require('../../../lib/CttProcessor');


describe('CttProcessor', () => {
    let cp = new CttProcessor();
    cp.log = new DumbLogger();
    let env = new Env();


    it('Init', () => {
        let content = ''; //TODO

        let data = [{'Title': 'title'}, content, 'TestPath'];
        env.addHistory(Phos.HEAD_PROCESSOR, {'out': [data]});

        cp.init(env);
        cp.before.should.be.equal(Phos.HEAD_PROCESSOR)

    });

    it('Type', () => {
        cp.type().should.be.equal(Phos.CTT_PROCESSOR);
    });

    it('Run and Out', () => {
        cp.run().should.be.true();

        let data = cp.out()['out'].map((tuple) => {
            tuple.length.should.be.equal(3);
            return tuple[1];
        });
        data[0].should.be.equal('');
    });

});
