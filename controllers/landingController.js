var express = require('express');
var app = express();
var fs = require('fs');
var firebase= require('firebase');

const axios = require('axios');

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
	version: '2018-03-19',
	iam_apikey: 'TrbyP46Gfd9cWFt78W963xq3JSXokcVMZdCP-EhT0uhg'
});


app.get('/', function(req, res) {
	res.render('landing_page' );
});

app.get('/sendImage', function(req, res) {
	// console.log('url=' +req.query.IURL+'&token='+req.query.token)
	var imgurl=req.query.IURL+'&token='+req.query.token;
	//var image = req.query.image;
	// var images_file= fs.createReadStream("./uploads/download");
	var classifier_ids = ["DefaultCustomModel_1737231065"];
	var threshold = 0.8;

	var params = {
		url:imgurl,
		classifier_ids: classifier_ids,
		threshold: threshold
	};


	visualRecognition.classify(params, function(err, response) {
		if (err) {
			console.log(err);
			console.log("Unsuccessful call.");
			res.send({success:false });
		} else {
			// console.log(JSON.stringify(response, null, 2))
			console.log("Successful call.");
			res.send(response.images[0].classifiers[0].classes)
		}
	});
  console.log("verify");
});



module.exports = app;
