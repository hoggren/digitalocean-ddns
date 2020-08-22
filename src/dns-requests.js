const pkg = require("../package.json");
const fs = require("fs").promises;
const path = require("path");
const got = require("got");
const dotenv = require("dotenv").config({
    path: path.join(require("os").homedir(), ".digitalocean.env"),
});

if (dotenv.error) {
    console.log("[ERRRO] Could not read environment file from home directory");
    throw dotenv.error;
}

const digitalOcean = got.extend({
    prefixUrl: "https://api.digitalocean.com/v2",
    headers: {
        "user-agent": `digitalocean-ddns/${pkg.version}`,
        Authorization: `Bearer ${process.env.DO_TOKEN}`,
    },
});

//
// const doClient = request.defaults({
//     baseUrl: "https://api.digitalocean.com/v2",
//     json: true,
//     auth: {
//         bearer: process.env.DO_TOKEN,
//     },
// });

const setDnsRecord = async (settings) => {
    try {
        const ipAddress = (await got.get("https://ipinfo.io/ip").text()).trim();

        /* it hasn't changed, silently return */
        if (ipAddress === settings.lastIp) {
            process.exit(0);
        }

        settings.lastIp = ipAddress;
    } catch (error) {
        console.log("[ERROR] An error occured while fetching IP, message: ", error);
        process.exit(-0xaa);
    }

    try {
        const response = await digitalOcean
            .put(`domains/${process.env.DO_DOMAIN}/records/${process.env.DO_ID}`, {
                json: { data: settings.lastIp },
            })
            .json();

        settings.lastIp = response["domain_record"].data;

        return settings;
    } catch (error) {
        console.error("[ERROR] An error occured while setting domain info, message:", error);
        process.exit(-0xbb);
    }
};

const getDnsRecords = async () => digitalOcean.get(`domains/${process.env.DO_DOMAIN}/records`).json();

module.exports = {
    setDnsRecord,
    getDnsRecords,
};
exports.update = setDnsRecord;
