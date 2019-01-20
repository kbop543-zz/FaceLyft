const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');

'use strict';


app.set('view engine', 'ejs');
app.use(express.static(__dirname));


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var landing_page = require('./controllers/landingController');
var dashboard = require('./controllers/dashboardController');
var carLocked = require('./controllers/carLockedController');

app.use('/', landing_page);
app.use('/dashboard', dashboard);
app.use('/carLocked', carLocked);

//Host the app
app.listen(8003, () => console.log('Example app listening on port 8003!'));
