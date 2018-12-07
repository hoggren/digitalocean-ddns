require('dotenv').config({ path: './digitalocean.env' });
const request = require('request-promise-native');

const doClient = request.defaults({
    baseUrl: 'https://api.digitalocean.com/v2',
    json: true,
    auth: {
        bearer: process.env.TOKEN
    }
});

console.log(`** DNS record ids for ${process.env.DOMAIN} **`);
console.log('');

const getIdsForDomain = (domain) => doClient.get(`/domains/${domain}/records`);

const getRecords = async () => {
    try {
        let response = await getIdsForDomain(process.env.DOMAIN);

        response = response.domain_records.map(x => ({
            id: x.id,
            type: x.type,
            name: x.name
        }));

        console.log(response);
        console.log('');
    } catch (error) {
        throw error;
    }
};

exports.getRecords = getRecords;
