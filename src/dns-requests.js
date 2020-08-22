const pkg = require("package.json");
const fs = require("fs/promises");
const path = require("path");
const got = require("got");

const digitalOcean = got.extend({
    prefixUrl: "https://api.digitalocean.com/v2",
    headers: {
        "user-agent": `digitalocean-ddns/${pkg.version}`,
        token: process.env.TOKEN,
    },
});

let dotenvResponse = require("dotenv").config({
    path: path.join(require("os").homedir(), ".digitalocean.env"),
});

if (dotenvResponse.error) {
    throw dotenvResponse.error;
}
//
// const doClient = request.defaults({
//     baseUrl: "https://api.digitalocean.com/v2",
//     json: true,
//     auth: {
//         bearer: process.env.TOKEN,
//     },
// });

const update = async (settings) => {
    try {
        const ipAddress = await got.get("https://ipinfo.io/ip").text();

        /* it hasn't changed, silently return */
        if (ipAddress === settings.lastIp) {
            return;
        }

        settings.lastIp = ipAddress;
    } catch (error) {
        console.log("[ERROR] An error occured while fetching IP, message: ", error);
        process.exit(-0xa);
    }

    try {
        const response = await digitalOcean(`/domains/${process.env.DOMAIN}/records/${process.env.ID}`, {
            method: "PUT",
            body: { data: settings.lastIp },
        }).json();

        settings.lastIp = response["domain_record"].data;
        console.log(`[INFO] Updated DNS record for "${process.env.DOMAIN}" to IP "${settings.lastIp}"`);
    } catch (error) {
        console.error("[ERROR] An error occured while setting domain info, message:", error);
        process.exit(-0xb);
    }

    fs.writeFileSync(path.join(__dirname, "settings.json"), JSON.stringify(settings), { encoding: "utf8" });
};

exports.update = update;
