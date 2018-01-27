'use strict';

const path = require("path");

const Env = require('../../../lib/Phos/Env');
const Phos = require('../../../lib/Phos');
const DumbLogger = require('../Phos/DumbLogger');
const DocSplitter = require('../../../lib/DocSplitter');


describe('DocSplitter', () => {
    let ds = new DocSplitter();
    ds.log = new DumbLogger();

    let real = [
        './test/TestMarkDown/Test1/Test1.md',
        // './test/TestMarkDown/Test1/Test3.MD',
        './test/TestMarkDown/Test5.md']
        .map((x) => path.resolve(x));

    it('Init', () => {
        let env = new Env();


        env.addHistory(Phos.DOC_FINDER, {'out': real});
        ds.init(env);
        ds.before.should.be.equal(Phos.DOC_FINDER);
    });

    it('Type', () => {
        ds.type().should.be.equal(Phos.DOC_SPLITTER);
    });

    it('Run and Out', () => {
        ds.run().should.be.true();
        let listConcat = (x, y) => x.concat(y);
        let data = listConcat(...ds.out()['out']);
        let shouldData = [
            "",
            "{",
            "    'title':'MarkDownTest',",
            "    'date':1517069894655,",
            "    'tags':['test','phos']",
            "}",
            "",
            "",
            "'''json",
            "let error = 0;",
            "'''",
            "",
            "# Title" +
            path.resolve("./test/TestMarkDown/Test1/Test1.md") +
            path.resolve("./test/TestMarkDown/Test5.md")
        ];
        data.join('').should.be.equal(shouldData.join('\n'));
    });

});

