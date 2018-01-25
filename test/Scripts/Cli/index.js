const add = require('../../../lib/Cli');


it('add', () => {
    add(1,4).should.equal(5);
});