'use strict';

const fs = require("fs");
const path = require("path");

const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');


function findFile(folder, suffix = ['.md']) {
    let mdList = [];
    let suffRE = new RegExp(suffix
        .map((s) => '(' + s + '$)'.toLowerCase())
        .join('|')
    );

    let fileList = fs.readdirSync(folder)
        .map((file) => folder + '/' + file);

    fileList
        .filter((folder) => fs.statSync(folder).isDirectory())
        .forEach((folder) => mdList = mdList.concat(findFile(folder, suffix)));

    fileList
        .filter((file) => !fs.statSync(file).isDirectory())
        .filter((file) => suffRE.test(file.toLowerCase()))
        .forEach((file) => mdList.push(file));

    return mdList;
}

//before: ENV_LOADER:{'out':[MarkDown folder]}
//after : DOC_FINDER:{'out':[MarkDown RealPath]}
class DocFinder extends Plugin {
    constructor() {
        super();
        this.outData = {'out': ''};
        this.log = new Logger('DocFinder');
    }

    init(env) {
        super.init(env);
        this.before = Phos.ENV_LOADER;
        this.log.debug('Init Done.')
    }

    run() {
        let folders = this.env.getHistory(this.before)['out'].map((folder) =>
            folder.endsWith('/') ? folder.slice(0, folder.length - 1) : folder);

        let mdfiles = [];
        let listConcat = (x, y) => x.concat(y);
        mdfiles = listConcat(...folders.map((folder) => findFile(folder, ['.md'])))
            .filter((x) => x !== undefined)
            .map((x) => path.resolve(x));

        this.outData = {'out': mdfiles};

        this.log.debug('Run Done.');
        return true;
    }

    type() {
        return DocFinder.TYPE;
    }

    out() {
        return this.outData;
    }
}

DocFinder.TYPE = Phos.DOC_FINDER;


module.exports = DocFinder;

// const Env = require('../Phos/Env');
//
// let df = new DocFinder();
// let env = new Env();
// env.addHistory(Phos.ENV_LOADER, {'out': ['../../test/TestMarkDown']});
// df.init(env);
// df.run();
// let out = df.out();
// let i = 1;