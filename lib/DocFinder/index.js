'use strict';
const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');

//before: ENV_LOADER:[MarkDown folder]
//after : DOC_FINDER:[MarkDown File]

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
        super()
    }

    init(env) {
        super.init(env);
        this.before = Phos.ENV_LOADER;
    }

    run() {
        let folders = this.env.getHistory(this.before);
        let mdfiles = [];

        let listConcat = (x, y) => x.concat(y);
        mdfiles = listConcat(...folders.map((folder) => findMD(folder)));

        this.outdata = mdfiles;

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