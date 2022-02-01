const https = require("https");
const axios = require('axios')
const config = require("../config.json");
const apiurl = config.endpoint;

async function api(endpoint, body) {
  var requesturl = apiurl + endpoint;
  console.log(requesturl)
  const response = await axios.get(requesturl, {
    headers: {
      'Authorization': `Bearer ${config.apikey}`,
      'Accept': 'application/json',
      'Content-Type': "application/json"
    }
  }).catch(error => { return error; })
  return response.data.data;
}

async function getServers() {
  let req = await api("application/servers");
  console.log(req);
}

async function getServerInfo(id) {
  let req = await api(`application/servers/${id}`);
  console.log(req);
}

async function startServer(serverid) {

  let req = await api("application/servers");
  console.log(req);

}

async function stopServer(serverid) {

  let req = await api("application/servers");
  console.log(req);

}

async function killServer(serverid) {

  let req = await api("application/servers");
  console.log(req);

}

async function createServer(ram, storage, name, serverType) {

  let req = await api("application/servers");
  console.log(req);

}


module.exports = {
  api,
  getServers,
  getServerInfo,
  startServer,
  stopServer,
  killServer,
  createServer
}