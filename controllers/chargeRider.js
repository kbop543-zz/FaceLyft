var express = require('express');
var app = express();
var firebase = require('firebase');
var axios = require('axios');
var config = {
  apiKey: "AIzaSyCXj7bwM7Keiz_3JvESgzGcrTTUs5o7wY4",
  authDomain: "projectpurp-8e2e3.firebaseapp.com",
  databaseURL: "https://projectpurp-8e2e3.firebaseio.com",
  projectId: "projectpurp-8e2e3",
  storageBucket: "projectpurp-8e2e3.appspot.com",
  messagingSenderId: "214044117452"
};

if(!firebase.apps.length) {
  firebase.initializeApp(config);
}

app.get('/', function(req, res) {

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var amount = req.query.amount;
  var uuid = req.query.uuid;
  console.log("SENDING MONEY TO: " + uuid);

  axios.get('https://projectpurple.lib.id/facechain@dev/interacRequestMoney/?UUID='+uuid+'&AMOUNT='+amount, function(res) {
    console.log(res);
  })
})

module.exports = app;
