'use strict';
const should = require('should');

describe('Phosphophyllite', done => {
    require('./Scripts/Cli');
    require('./Scripts/Logger');
    require('./Scripts/Phos');
    require('./Scripts/EnvLoader');
    require('./Scripts/DocFinder');
    require('./Scripts/DocSplitter');
    require('./Scripts/HeadProcessor');
    require('./Scripts/CttProcessor');
    require('./Scripts/TempOrganizer');
    require('./Scripts/FileExporter');
});