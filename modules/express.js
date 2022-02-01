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
  var connection = mysql.createConnection({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpass,
    database: config.database
  });

  let servers = [];

  app.use(session({
    secret: config.secretpassphrase,
    resave: true,
    saveUninitialized: true
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.set('view engine', 'ejs');

  // index page
  app.get('/', function(req, res) {
    res.render('pages/auth-login');
  });

  app.get('/home', function(req, res) {
    if (req.session.loggedin) {
      servers = api.getServers();
      res.render('pages/index', {
        server: servers
      });

    } else {
      res.render('pages/notloggedin')
    }

  });

  servers.forEach(server => {
    app.get(`/servers/${server.id}`, function(req, res) {
      var serverinfo = api.getServerInfo(server.id);
      res.render('pages/server', {
        serverinfo: serverinfo
      });
    });
  });

  app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
      connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/home');
        } else {
          response.send('Incorrect Username and/or Password!');
        }
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  });
  // Set EJHS view engine

  // Start the webserver
  app.listen(port, () => {
    console.log(`Example app is listening on port ${port}.`);
  });

}

module.exports = {
  load: load
};