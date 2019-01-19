var express = require('express');
var app = express();
var fs = require('fs');

app.get('/carLocked', function(req, res) {
	res.render('carLocked' );
});

module.exports = app;
