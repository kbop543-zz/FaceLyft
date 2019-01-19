'use strict';

function onClickSnap(){
  $('#snapButton').click(function(){
    snap();
  });
}

function snap () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  canvas.width = video.clientWidth;
  canvas.height = video.clientHeight;
  // var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(imgData);
  context.drawImage(video, 0, 0);
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  //fs.createWriteStream('tick.png'))
  window.location.href= image;

  //var dataUrl = canvas.toDataURL();

  //console.log(dataUrl);
  $.get('/sendImage').then(function(resp){
    if(resp.success){
      window.location.replace("http://localhost:8003/dashboard");
    }else{
      // window.location.replace("http://localhost:8003/");
    }
  });
}



function setUpWebcam(){
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  navigator.getUserMedia = navigator.getUserMedia
  || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
  || navigator.oGetUserMedia || navigator.msGetUserMedia;

  if(navigator.getUserMedia){
    navigator.getUserMedia({video:true}, streamWebCam, throwError);
  }

  function streamWebCam (stream) {
    video.srcObject=stream;
    video.play();
  }

  function throwError (e) {
    alert(e.name);
  }
}

/* Set up the page */
$( document ).ready(function (){
    setUpWebcam();
    onClickSnap();

})
