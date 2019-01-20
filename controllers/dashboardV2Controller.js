var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res) {
	res.render('dashboardV2' );
});

module.exports = app;
