'use strict';
const fs = require('fs');

const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');


//before: CTT_PROCESSOR:{
// 'out':[[Head Object,Content HTML,RealPath]]},
// 'themePath':'Theme Folder Path',
//
//
//after : TEMP_ORGANIZER:{
// 'out':[[FileData,Relative Path]]
//}
class TempOrganizer extends Plugin {
    constructor() {
        super();
        this.outData = {'out': ''};
        this.log = new Logger('TempOrganizer');
    }

    init(env) {
        super.init(env);
        this.before = Phos.CTT_PROCESSOR;
        this.log.debug('Init Done.')
    }

    run() {
        let outdata='';
        this.outData = {'out': outdata};
        return true;
    }

    type() {
        return TempOrganizer.TYPE;
    }

    out() {
        return this.outData;
    }
}


TempOrganizer.TYPE = Phos.TEMP_ORGANIZER;
module.exports = TempOrganizer;
