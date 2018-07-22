
const clc = require('cli-color');
const lodash = require('lodash');
const multiExecAsync = require('multi-exec-async');

const colors = {
    debug: clc.xterm(251),
    some: clc.cyan,
    info: clc.blue,
    warn: clc.yellow,
    error: clc.red
};

const console_log = (level, args) => {
    const object = args.find(arg => typeof arg === 'object');
    if (object) {
        if (level === 'error' && object.message) {
            console.error(colors[level](object.message));
        } else {
            console.error(colors[level](JSON.stringify(args, null, 2)));
        }
    } else {
        console.error(colors[level](args.join(' ')));
    }
}

const state = {
    timestamp: 0,
    count: 0,
};

module.exports = (client, loggerName) => {
    const log = (level, args) => {
        const arg = args[0];  
        const timestamp = Date.now();
        state.count++;
        if (typeof arg === 'object' && arg.name === 'DataError' && arg.message && arg.data) {
        }
        state.timestamp = timestamp;
        console_log(level, args);
        if (process.env.NODE_ENV === 'development') {
        }
    };
    return ['debug', 'some', 'info', 'warn', 'error']
    .reduce((logger, level) => {
        logger[level] = (...args) => log(level, args);
        return logger;
    }, {
       end: () => {
           client.end(true);
       }
    });
};
