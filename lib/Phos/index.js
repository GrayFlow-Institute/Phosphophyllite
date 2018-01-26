'use strict';




function Phos(argc, argv) {
    this.now=0;
    
    // like:
    // [
    //     {'in':'string','out':'string'},  //0
    //     {'in':'string','out':'string'},  //1
    //     {'in':'string','out':'string'},  //2
    //     {'in':'string','out':'string'}   //3
    // ]
    this.history=[];
}

Phos.prototype.getIn=function(where = -1){
    return this._getHistory(where)['in'];
}

Phos.prototype.getOut=function(where = -1){
    return this._getHistory(where)['out'];
}

Phos.prototype._getHistory=function(where = -1){
    where = where== -1?this.now:where;
    return this.history[where];
}

Phos.prototype.START = 0;
Phos.prototype.ENV_LOADER = 1;
Phos.prototype.DOC_FINDER = 2 ;
Phos.prototype.DOC_SPLITTER = 3;
Phos.prototype.HEAD_PROCESSOR = 4;
Phos.prototype.CTT_PROCESSOR = 5;
Phos.prototype.TEMP_ORGANIZER = 6;
Phos.prototype.FILE_EXPORTER = 7;
Phos.prototype.END = 8;


module.exports = Phos;
