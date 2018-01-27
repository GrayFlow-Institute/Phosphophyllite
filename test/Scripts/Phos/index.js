'use strict';

const Env = require('../../../lib/Phos/Env');
const Plugin = require('../../../lib/Phos/Plugin');
const Task = require('../../../lib/Phos/Task');
const Phos = require('../../../lib/Phos');

class StartPlugin extends Plugin {
    constructor() {
        super();
    }

    init(env) {
        super.init(env);
        env.addHistory(321, "INIT");
    }

    run() {
        this.env.addHistory(123, "RUN");
    }

    type() {
        return 0;
    }

    out() {
        return "OUT";
    }
}

describe('Phos', () => {
    it('Env', () => {
        let env = new Env();
        env.addHistory(1, 'vqXyFs9VYP7Xr6wT');
        env.getHistory(1).should.be.equal('vqXyFs9VYP7Xr6wT');
        env.getHistory().should.empty();
        env.getHistory(2).should.be.equal('');
    });

    it('Plugin', () => {
        let plugin = new Plugin();
        let env = new Env();
        plugin.init(env);
        try {
            let p = new Plugin(123);
        } catch (e) {
            e.message.should.be.equal('env is not Env-Class');
        }
        ('function' === typeof(plugin.init)).should.be.true();
        ('function' === typeof(plugin.run)).should.be.true();
        ('function' === typeof(plugin.type)).should.be.true();
        ('function' === typeof(plugin.out)).should.be.true();
    });

    it('Task', () => {
        let task = new Task("task_name");
        task.init([new StartPlugin()]);
        task.run();

        let env = task.env;
        env.getHistory(321).should.be.equal('INIT');
        env.getHistory(123).should.be.equal('RUN');
        env.getHistory(0).should.be.equal('OUT');

    });

    it('Phos', () => {
        let phos = new Phos();
        let task = new Task("task_name");
        task.init([new StartPlugin()]);
        phos.tasks = [task];
        phos.run();

        let env = task.env;
        env.getHistory(321).should.be.equal('INIT');
        env.getHistory(123).should.be.equal('RUN');
        env.getHistory(0).should.be.equal('OUT');
    });


});