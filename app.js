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

app.use('/', landing_page);

//Host the app
app.listen(8001, () => console.log('Example app listening on port 8001!'));
