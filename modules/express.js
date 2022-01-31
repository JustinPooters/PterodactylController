// Requirements
const express = require('express');
const app = express();
const config = require("../config.json");
const port = config.appport;


function load() {
    // index page
    app.get('/', function(req, res) {
        res.render('pages/index');
    });
  
    // about page
    app.get('/about', function(req, res) {
        res.render('pages/about');
    });
    
    // Set EJHS view engine
    app.set('view engine', 'ejs');
    
    // Start the webserver
    app.listen(port, () =>{
        console.log(`Example app is listening on port ${port}.`);  
    });

}

module.exports = {
    load: load
};