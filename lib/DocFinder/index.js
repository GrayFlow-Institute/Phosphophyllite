'use strict';
const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');


//before: ENV_LOADER:{'out':[MarkDown folder]}
//after : DOC_FINDER:{'out':[MarkDown File]}

const fs = require("fs");

function findMD(folder) {
    let mdList = [];
    let fileList = fs.readdirSync(folder)
        .map((file) => folder + '/' + file);

    fileList
        .filter((folder) => fs.statSync(folder).isDirectory())
        .forEach((folder) => mdList = mdList.concat(findMD(folder)));

    fileList
        .filter((file) => !fs.statSync(file).isDirectory())
        .filter((file) => file.toLowerCase().endsWith('.md'))
        .forEach((file) => mdList.push(file));

    return mdList;
}

class DocFinder extends Plugin {
    constructor() {
        super();
        this.log = new Logger('DocFinder');
    }

    init(env) {
        super.init(env);
        this.before = Phos.ENV_LOADER;
        this.log.debug('Init Done.')
    }

    run() {
        let folders = this.env.getHistory(this.before)['out'];
        let mdfiles = [];

        let listConcat = (x, y) => x.concat(y);
        mdfiles = listConcat(...folders.map((folder) => findMD(folder)));

        this.outdata = {'out': mdfiles};

        this.log.debug('Run Done.');
        return true;
    }

    type() {
        return DocFinder.TYPE;
    }

    out() {
        return this.outdata;
    }
}

DocFinder.TYPE = Phos.DOC_FINDER;


module.exports = DocFinder;