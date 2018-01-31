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
        let content1 = '![TestCase](./test/TestImage/1.png)';
        let content2 = '![TestCase](./test/TestImage/2.png)';
        let content3 = '![TestCase](./test/TestImage/same1.png)';
        let content4 = '![TestCase](http://blog.thoxvi.com/text.jpg)';

        let data = [
            [{'Title': 'title'}, content1, 'TestPath'],
            [{'Title': 'title'}, content2, 'TestPath'],
            [{'Title': 'title'}, content3, 'TestPath'],
            [{'Title': 'title'}, content4, 'TestPath'],
        ];


        env.addHistory(Phos.HEAD_PROCESSOR, {'out': data});
        env.addHistory('imageFolder', './test/TestImage/Hash_Image');

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

        data[0].should.be.equal('<p><img src="./test/TestImage/Hash_Image/6af286765f57fe228750b523b749446cef33dab3.png" alt="TestCase" /></p>');
        data[1].should.be.equal('<p><img src="./test/TestImage/Hash_Image/f82469f4381e71c04d460ef103943a7d2c4b5375.png" alt="TestCase" /></p>');
        data[2].should.be.equal('<p><img src="./test/TestImage/Hash_Image/6af286765f57fe228750b523b749446cef33dab3.png" alt="TestCase" /></p>');
        data[3].should.be.equal('<p><img src="http://blog.thoxvi.com/text.jpg" alt="TestCase" /></p>');
    });

});
