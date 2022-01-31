const https = require("https");
const axios = require('axios')
const config = require("../config.json");
const apiurl = config.endpoint;

function api(endpoint) {
  var requesturl = apiurl + endpoint;
  console.log(requesturl)

  axios.get(requesturl, {
      headers: {
        'Authorization': `Bearer ${config.apikey}`,
        'Accept': 'application/json',
        'Content-Type': "application/json"
      }
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    })

}

async function getServers() {

  const req = api("application/servers");
  console.log(req);

}

module.exports = {
  api: api,
  getServers: getServers
}