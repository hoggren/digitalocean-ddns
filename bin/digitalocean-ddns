#!/usr/bin/env node
const [, , ...args] = process.argv;

if (args == null || args.length === 0) {
    console.log(`No argument specified, quitting.

* --dns-records : get dns-records
* --update      : update choosen record

See README.md or https://www.npmjs.com/package/digitalocean-ddns for usage.
`);
}

switch (args[0]) {
    case '--dns-records':
        const helper = require('../lib/helper.js');
        helper.getRecords();
        return;

    case '--update':
        const updater = require('../lib/digitalocean-ddns.js');
        updater.update();
        break;
}
