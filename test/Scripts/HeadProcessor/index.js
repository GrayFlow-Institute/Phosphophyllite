'use strict';


const Env = require('../../../lib/Phos/Env');
const Phos = require('../../../lib/Phos');
const DumbLogger = require('../Phos/DumbLogger');
const HeadProcessor = require('../../../lib/HeadProcessor');


describe('HeadProcessor', () => {
    let hp = new HeadProcessor();
    hp.log = new DumbLogger();
    let env = new Env();


    it('Init', () => {
        let json = "{\n" +
            "    'title':'MarkDownTest',\n" +
            "    'date':'2018-01-28T22:06:45.000Z',\n" +
            "    'tags':['test','phos']\n" +
            "}";
        let data = [json, '\n# H1', 'TestPath'];
        env.addHistory(Phos.DOC_SPLITTER, {'out': [data]});

        hp.init(env);
        hp.before.should.be.equal(Phos.DOC_SPLITTER)

    });

    it('Type', () => {
        hp.type().should.be.equal(Phos.HEAD_PROCESSOR);
    });

    it('Run and Out', () => {
        hp.run().should.be.true();

        let data = hp.out()['out'].map((tuple) => {
            tuple.length.should.be.equal(3);
            return JSON.stringify(tuple[0]);
        });
        data[0].should.be.equal('{"title":"MarkDownTest","date":"2018-01-28T22:06:45.000Z","tags":["test","phos"]}');
    });

});
