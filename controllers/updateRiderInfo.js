var express = require('express');
var app = express();
var firebase = require('firebase');

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

  firebase.database().ref('users/' + req.session.uuid + '/riders/').push({
    uuid: req.query.uuid
  });
})

module.exports = app;
