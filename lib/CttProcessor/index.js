'use strict';
const fs = require('fs');
const crypto = require('crypto');

const showdown = require('showdown');

const Plugin = require('../Phos/Plugin');
const Phos = require('../Phos');
const Logger = require('../Phos/Logger');


//before: HEAD_PROCESSOR:{
// 'out':[[Head Object,Content,RealPath]]
// },
//  'imageFolder':'Folder Path'
//
//after : CTT_PROCESSOR:{
// 'out':[[Head Object,Content HTML,RealPath]]}
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
        let imageFolder = this.env.getHistory('imageFolder');
        if (imageFolder === '') {
            this.log.error('ImageFolder is empty');
            throw new Error('ImageFolder is empty');
        } else {
            let stat = fs.statSync(imageFolder);
            if (!stat || !stat.isDirectory()) {
                this.log.error('ImageFolder is not exist.');
                throw new Error('ImageFolder is not exist.');
            }
        }

        let tuples = this.env.getHistory(this.before)['out'];
        let outdata = [];


        tuples.forEach((tuple) => {
            if (tuple.length !== 3) {
                this.log.error(tuple);
                throw new Error('tuple\'s length is not 3');
            }

            let content = tuple[1];
            let html = new showdown.Converter().makeHtml(content);

            // param:html
            // return:{
            //   'html': 'After Change Path use ImageFolder',
            // };
            let dealHTML = (html) => {
                let imageFolder = this.env.getHistory('imageFolder');
                let outdate = {};
                let outHTML = html;

                let reImg = /<img src="(.*)" alt=".*" \/>/mig;
                let reList = [];
                let data = '';

                let getHash = (path) => {
                    let data = fs.readFileSync(path);
                    return crypto.createHash('sha1')
                        .update(data)
                        .digest('hex');
                };

                do {
                    data = reImg.exec(html);
                    if (data != null) {
                        let oldPath = data[1];

                        //Skip Net Picture
                        if (/^\s*https?:\/\//i.test(oldPath)) continue;

                        let hash = getHash(oldPath);

                        let end = /(\.\w+$)/i.exec(oldPath);
                        if (end != null) {
                            end = end[0];
                        } else {
                            end = '';
                        }
                        let newPath = imageFolder.replace(/\/\s*$/, '') + '/' + hash + end;

                        //replaceAll
                        // outHTML = outHTML.split(oldPath).join(newPath);
                        outHTML = outHTML.replace(oldPath, newPath);

                        fs.stat(newPath, (err, stat) => {
                            if (stat && stat.isFile()) {
                                this.log.info('Copy File Exist:\t' + newPath);
                            } else {
                                fs.copyFile(oldPath, newPath, (err) => {
                                });
                            }
                        });
                    }
                } while (data != null);

                outdate['html'] = outHTML;
                return outdate;
            };

            html = dealHTML(html)['html'];

            this.log.debug(content + '\t' + html);
            outdata.push([tuple[0], html, tuple[2]]);
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
