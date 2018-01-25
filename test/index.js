'use strict';
var should = require('should');

describe('Phos', done => {
    require('./Scripts/Cli');
    require('./Scripts/Phos');
    require('./Scripts/EnvLoader');
    require('./Scripts/DocFinder');
    require('./Scripts/DocSplitter');
    require('./Scripts/HeadProcessor');
    require('./Scripts/CttProcessor');
    require('./Scripts/TempOrganizer');
    require('./Scripts/FileExporter');
});