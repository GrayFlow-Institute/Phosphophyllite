'use strict';


const Env = require('../../../lib/Phos/Env');
const Phos = require('../../../lib/Phos');
const DumbLogger = require('../Phos/DumbLogger');
const TempOrganizer = require('../../../lib/TempOrganizer');


describe('TempOrganizer', () => {
    let to = new TempOrganizer();
    to.log = new DumbLogger();
    let env = new Env();


    it('Init', () => {
        let data = '';

        env.addHistory(Phos.CTT_PROCESSOR, {'out': data});
        env.addHistory('imageFolder', './test/TestImage/Hash_Image');

        to.init(env);
        to.before.should.be.equal(Phos.CTT_PROCESSOR)

    });

    it('Type', () => {
        to.type().should.be.equal(Phos.TEMP_ORGANIZER);
    });

    it('Run and Out', () => {
        to.run().should.be.true();
    });

});
