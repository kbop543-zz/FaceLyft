var express = require('express');
var app = express();
var fs = require('fs');
const smartcar = require('smartcar');
const axios = require('axios');
const firebase = require('firebase');

const client = new smartcar.AuthClient({
  clientId: '7ef629c4-9bf6-47c5-b901-984824b0af32',
  clientSecret: 'f7a1c636-b604-4a80-bfe9-3c38def9a527',
  redirectUri: 'http://localhost:8003/dashboard',
  scope:[ 'read_location','read_odometer','read_vehicle_info','read_vin','control_security', 'control_security:unlock', 'control_security:lock']
});



app.get('/', function(req, res) {
	code = req.query.code;

  if(req.query.UUID){
    req.session.uuid = req.query.UUID;
  }

  if(code){
    req.session.code = code;
  }

	if(code!=''&&code){
    client.exchangeCode(code).then(function(_access) {
      access = _access;
			access = access.accessToken;
      console.log(access)
    });
    console.log(req.session);
    axios.get('https://projectpurple.lib.id/facechain@dev/smartcarInfo?code='+req.session.code)
    .then((resp) => {
      var smartCarInfo = resp.data;
      console.log(smartCarInfo)
    })
    .catch((error) => {
      console.error(error)
    })

    axios.get('https://projectpurple.lib.id/facechain@dev/lookupUser?UUID='+req.session.uuid)
    .then((resp) => {

      console.log(resp.data)
      var data = resp.data;
      // data[smartCarInfo] = smartCarInfo;

      res.render('dashboard' ,{data:resp.data});
      // console.log(resp.data)
      // res.redirect(resp.data);
    })
    .catch((error) => {
      console.error(error)
    })
	}
		else{
			axios.get('https://projectpurple.lib.id/facechain@dev/smartcarAuth')
			.then((resp) => {

        // console.log(resp.data)
        res.render('dashboard' ,{'link':resp.data});
			  // console.log(resp.data)
				// res.redirect(resp.data);
			})
			.catch((error) => {
			  console.error(error)
			})
		}
});

app.get('/lock', function(req, res) {
  axios.get('https://projectpurple.lib.id/facechain@dev/smartcarSecure?lock=true&code='+req.session.code)
  .then((resp) => {
    var info = resp.data;
    console.log(info)
  })
  .catch((error) => {
    console.error(error)
  })
});
// app.get('/unlock', function(req, res) {
//
// });
module.exports = app;


// var express = require('express');
// var app = express();
// var fs = require('fs');
// var a
//
// app.get('/', function(req, res) {
//   var results = req.query.data + "\"}";
//   console.log(results)
//   console.log()
//   var resultsJson = JSON.parse(results)
//   console.log(resultsJson)
// 	res.render('dashboard', {data:resultsJson});
//
// });
//
// module.exports = app;
