var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res) {
	res.render('carLocked' );
});

module.exports = app;
