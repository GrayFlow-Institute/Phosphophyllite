'use strict';
const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');

class DocFinder extends Plugin {
    constructor() {
        super()
    }

    init(env) {
        super.init(env);
    }

    run() {
        //TODO
    }

    type() {
        return DocFinder.TYPE;
    }

    out() {

    }
}

DocFinder.TYPE = Phos.DOC_FINDER;


module.exports = DocFinder;