'use strict';
const fs = require('fs');
const crypto = require('crypto');
const showdown = require('showdown');

const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');

//before: HEAD_PROCESSOR:{
//  'out':[[Head Object,Content,RealPath]]
// },
//  'imageFolder':'Folder Path'
//after : CTT_PROCESSOR:{
//  'out':[[Head Object,Content Object,RealPath]]
// },
//  'ImageDict':{'ImageHash_SHA1':'ImagePath'}
//


class CttProcessor extends Plugin {
    constructor() {
        super();
        this.outData = {'out': ''};
        this.log = new Logger('CttProcessor');
    }

    init(env) {
        super.init(env);
        this.before = Phos.HEAD_PROCESSOR;
        this.log.debug('Init Done.')
    }

    run() {
        let tuples = this.env.getHistory(this.before)['out'];
        let outdata = [];

        tuples.forEach((tuple) => {
            if (tuple.length !== 3) {
                this.log.error(tuple);
                throw new Error('tuple\'s length is not 3');
            }

            let content = tuple[1];
            content = new showdown.Converter().makeHtml(content);

            // param:html
            // return:[ImagePath]
            let findImg = (html) => {
                let reImg = /<img src="(.*)" alt=".*" \/>/mig;
                let reList = [];
                let data = '';
                do {
                    data = reImg.exec(html);
                    if (data != null) {
                        reList.push(data[1])
                    }
                } while (data != null);
                return reList;
            };

            // param : [path]
            // return: { 'hash_SHA-1' : stream }
            let readImages = (paths) => {
                let outdata = {};

                paths.forEach((path) => {
                    let data = fs.readFileSync(path);
                    let hash = crypto.createHash('sha1')
                        .update(data)
                        .digest('hex');
                    outdata[hash] = data;
                });

                return outdata
            };


            let imgs = findImg(content);
            let imageFolder = this.env.getHistory('imageFolder');
            if (imageFolder === '') {
                this.log.error('ImageFolder is empty');
                throw new Error('ImageFolder is empty');
            }
            //TODO

            this.log.debug(tuple[1] + '\t' + content);
            outdata.push([tuple[0], content, tuple[2]]);
        });

        this.outData = {'out': outdata};
        return true;
    }

    type() {
        return CttProcessor.TYPE;
    }

    out() {
        return this.outData;
    }
}


CttProcessor.TYPE = Phos.CTT_PROCESSOR;

module.exports = CttProcessor;

const Env = require('../Phos/Env');
let data = ['', '![TestCase](../../test/TestImage/1.png)', 'TestPath'];
let env = new Env();
env.addHistory(Phos.HEAD_PROCESSOR, {'out': [data]});
env.addHistory('imageFolder', '../../test/TestImage/Hash_Image');
let cp = new CttProcessor();
cp.init(env);
cp.run();
