var express = require('express');
var app = express();
var fs = require('fs');
const smartcar = require('smartcar');
const axios = require('axios');
const firebase = require('firebase');

/*const client = new smartcar.AuthClient({
  clientId: '7ef629c4-9bf6-47c5-b901-984824b0af32',
  clientSecret: 'f7a1c636-b604-4a80-bfe9-3c38def9a527',
  redirectUri: 'http://localhost:8003/dashboard',
  scope:[ 'read_location','read_odometer','read_vehicle_info','read_vin','control_security', 'control_security:unlock', 'control_security:lock']
});*/


app.get('/', function(req, res) {
  console.log(req);
	//code = req.query.code;
  var fullData={}
  /*if(req.query.UUID){
    req.session.uuid = req.query.UUID;
  }

  if(code){
    req.session.code = code;
  }*/

/*	if(code!=''&&code){
      client.exchangeCode(code).then(function(_access) {
      access = _access;
			access = access.accessToken;
      req.session.access=access;
    }).then(function(){*/

      //console.log(req.session);
      //axios.get('https://projectpurple.lib.id/facechain@dev/smartcarInfo?access='+req.session.access)
      //.then((resp) => {
        //var smartCarInfo = resp.data;
        //fullData.odometer.data.distance = Math.round(fullData.odometer.data.distance);
        fullData.info = {};
        fullData.info.year = 2019;
        fullData.info.make = "Tesla";
        fullData.info.model = "Model 3";
        fullData.odometer = {};
        fullData.odometer.data = {};
        fullData.odometer.data.distance = 10093;
        fullData.VIN = "3819f7hg31g783uej"
        console.log(req)

        axios.get('https://projectpurple.lib.id/facechain@dev/lookupUser/?UUID='+req.query.UUID)
        .then((resp) => {

          console.log(resp.data)
          var data = resp.data;
          // data[smartCarInfo] = smartCarInfo;

          //res.render('dashboard' ,{data:resp.data,carData:'fullData'});
          res.render('dashboard', {data: resp.data, carData: fullData});
          // console.log(resp.data)
          // res.redirect(resp.data);
        })
        .catch((error) => {
          console.error(error)
        })
      //})
      //.catch((error) => {
      //  console.error(error)
      //})
  //  });


	//}
		/*else{
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
		}*/
});


app.get('/lock', function(req, res) {

  	// console.log(req.session.access)
   axios.get('https://projectpurple.lib.id/facechain@dev/smartcarSecure?lock=true&access='+req.session.access)
  .then((resp) => {
    var info = resp.data;
    console.log(info)
    res.send('success')
  })
  .catch((error) => {
    console.error(error)
  })
});
app.get('/unlock', function(req, res) {
	// console.log(req.session.access)
  axios.get('https://projectpurple.lib.id/facechain@dev/smartcarSecure?lock=false&access='+req.session.access)
  .then((resp) => {
    var info = resp.data;
    console.log(info)

    res.send('success')
  })
  .catch((error) => {
    console.error(error)
  })
});
// app.get('/lock', function(req, res) {
//   console.log('yo')
//   axios.get('https://projectpurple.lib.id/facechain@dev/smartcarSecure?lock=true&access='+req.session.access)
//   .then((resp) => {
//     var info = resp.data;
//     // console.log(info)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// });
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
