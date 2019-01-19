var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.render('landing_page');
});


module.exports = app;
