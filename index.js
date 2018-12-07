#!/usr/bin/env node
const [,, ...args] = process.argv;

if(args.length > 0 && args[0] === '--dns-records') {
    const helper = require('./lib/helper.js');
    helper.getRecords();
    return;
}

const updater = require('./lib/updater.js');
updater.update();
