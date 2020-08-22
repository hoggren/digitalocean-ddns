const path = require("path");
const request = require("request-promise-native");

require("dotenv").config({
  path: path.join(require("os").homedir(), ".digitalocean.env"),
});

const dotenv = require("dotenv");

const digitaloceanClient = request.defaults({
  baseUrl: "https://api.digitalocean.com/v2",
  json: true,
  auth: {
    bearer: process.env.TOKEN,
  },
});

console.log(`[INFO] DNS record ids for ${process.env.DOMAIN} **\n`);

const getIdsForDomain = (domain) =>
  digitaloceanClient.get(`/domains/${domain}/records`);

const getRecords = () => {
  getIdsForDomain(process.env.DOMAIN)
    .then((response) => {
      response = response.domain_records.map((x) => ({
        id: x.id,
        type: x.type,
        name: x.name,
      }));

      console.log(response);
      console.log("");
    })
    .catch((err) => {
      console.log("Could not get records. Error message: " + err);
    });
};

exports.getRecords = getRecords;
