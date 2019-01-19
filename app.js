var http = require('http');
var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/index.html'));
  //__dirname : It will resolve to your project folder.
});

// router.get('/about',function(req,res){
//   res.sendFile(path.join(__dirname+'/about.html'));
// });
//
// router.get('/sitemap',function(req,res){
//   res.sendFile(path.join(__dirname+'/sitemap.html'));
// });

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
//
// var server = app.listen(3000);
// app.use(express.static('public'));
// //assuming app is express Object.
// app.get('/',function(req,res) {
//   res.sendFile('index.html');
// });
//

// app.get('/index', index);
// function index(request, response) {
//     fs.readFile('./public/html/index.html', function (err, html) {
//       response.writeHeader(200, {"Content-Type": "text/html"});
//       response.write(html);
//       response.end();
//     });
// }
// fs.readFile('./html/index.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(8000);
// });
