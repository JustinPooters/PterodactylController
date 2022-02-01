// Requirements
const express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const app = express();

const config = require("../config.json");
const api = require("./pterodactyl");
const port = config.appport;


function load() {
  let servers = [];
  // index page
  app.get('/', function(req, res) {
    res.render('pages/index');
    servers = api.getServers();
  });

  servers.forEach(server => {
    app.get(`/servers/${server.id}`, function(req, res) {
      var serverinfo = api.getServerInfo(server.id);
      res.render('pages/server', {
        serverinfo: serverinfo
      });
    });
  });
  // Set EJHS view engine
  app.set('view engine', 'ejs');

  // Start the webserver
  app.listen(port, () => {
    console.log(`Example app is listening on port ${port}.`);
  });

}

module.exports = {
  load: load
};