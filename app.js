const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');

'use strict';


app.set('view engine', 'ejs');
app.use(express.static(__dirname));



app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(session({
  secret: 'secret',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  saveUninitialized: true,
  resave: false
}))

var landing_page = require('./controllers/landingController');
var dashboard = require('./controllers/dashboardController');
var carLocked = require('./controllers/carLockedController');
var dashboardV2 = require('./controllers/dashboardV2Controller');
var updateRiderInfo = require('./controllers/updateRiderInfo');

app.use('/', landing_page);
app.use('/dashboard', dashboard);
app.use('/carLocked', carLocked);
app.use('/dashboardV2', dashboardV2);
app.use('/updateRiderInfo', updateRiderInfo);
//Host the app
app.listen(8003, () => console.log('Example app listening on port 8003!'));
