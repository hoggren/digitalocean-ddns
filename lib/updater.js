require('dotenv').config({ path: './digitalocean.env' });
const fs = require('fs');
const path = require('path');
const request = require('request-promise-native');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json'), { encoding: 'utf8' }));

const ipClient = request.defaults({
    baseUrl: 'https://ipinfo.io',
    json: true
});

const doClient = request.defaults({
    baseUrl: 'https://api.digitalocean.com/v2',
    json: true,
    auth: {
        bearer: process.env.TOKEN
    }
});

const getIpInfo = () => ipClient.get('/ip');
const setRecordForDomain = (domain, id, body) => doClient({ uri: `/domains/${domain}/records/${id}`, method: 'PUT', body: body });

const updater = async () => {
    try {
        let ip = await getIpInfo();
        ip = ip.trim('\n');

        if (ip === config.lastIp) {
            return;
        }

        config.lastIp = ip;
    } catch (error) {
        process.exit(1);
    }

    try {
        const previousIp = config.lastIp;
        const response = await setRecordForDomain(process.env.DOMAIN, process.env.ID, { data: config.lastIp });

        config.lastIp = response.domain_record.data;
        console.log(`updaterd DNS record for "${process.env.DOMAIN}", "${previousIp}" to IP "${config.lastIp}".`);
    } catch (error) {
        console.error('An error occured while setting domain info, exiting.', error);
        process.exit(1);
    }

    fs.writeFileSync(path.join(__dirname, 'settings.json'), JSON.stringify(config), { encoding: 'utf8' });
};

exports.updater = updater;
// updater();
