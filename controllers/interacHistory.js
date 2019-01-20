var express = require('express');
var app = express();
var axios = require('axios');

app.get('/getHistory', function(req, res) {
	console.log("GETTING HISTROY");
	axios.get('https://projectpurple.lib.id/facechain@dev/interacHistory/').then( function(resp) {
		console.log(resp.data);
		res.send(resp.data)
	});
});

module.exports = app;
