
'use strict';

    var mapping = {'Amr':'4','kyra':'2','misan':'3','Asseel':'1'}
function onClickSnap(){
  $('#snapButton').click(function(){
    snap();
  });
}
function lock(){
  $.get('./dashboard/lock').then(function(resp){
    console.log(resp)
  });
}
function unlock(){
  $.get('./dashboard/unlock').then(function(resp){
    console.log(resp)
  });
}
function snap () {
  $('#overlay').css('display', 'block');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  canvas.width = video.clientWidth;
  canvas.height = video.clientHeight;
  context.drawImage(video, 0, 0);
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
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();
    // var ref = storageRef.child('images');
    canvas.toBlob(function(blob){
      var image = new Image();
      image.src = blob;
      var uploadTask = storageRef.child('image').put(blob);
      uploadTask.on('state_changed', function(snapshot){
        $('#video').css('display', 'none');
        $('#validating').css('display','block');
        $('#canvas').css('display', 'block');
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            $('#authenticating').css('display', 'block');
            $('#video').css('display', 'none');
            $('#canvas').css('display', 'block');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            $('#authenticating').css('display', 'block');
            $('#video').css('display', 'none');
            $('#canvas').css('display', 'block');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
        console.log('Unsuccessful upload.');
        $('#overlay').css('display', 'none');
        $('#authenticating').css('display', 'none');
        $('#validating').css('display','none');
        $('#success').css('display', 'none');
        $('#canvas').css('display', 'none');
        $('#video').css('display', 'block');
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          $.get('/sendImage/?IURL='+downloadURL).then(function(resp){
            console.log(resp)
            if(resp.length == 0) {
              $('#canvas').css('display', 'none');
              $('#video').css('display', 'block');
              $('#overlay').css('display', 'none');
              $('#authenticating').css('display','none');
              $('#validating').css('display','none');
              $('#success').css('display', 'none');
              $('#failed').css('display','visibile');
              return;
            }
            if(resp[0].score>=0.85){
              $('#success').css('display', 'block');
              $('#overlay').css('display', 'none');
              $.get('/updateRiderInfo?uuid='+mapping[resp[0].class], function(res) {
                console.log(res);
              })
            //  window.location.replace("http://localhost:8003/dashboard?UUID="+mapping[resp[0].class]);
            }else{
                window.location.replace("http://localhost:8003/");
            }
          });
        });
      });
    });
    // ref.put(image).then(function(snapshot) {
    //   console.log('Uploaded a blob or file!');
    // });
  //fs.createWriteStream('tick.png'))
  // window.location.href= image;

  //var dataUrl = canvas.toDataURL();

  //console.log(dataUrl);

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


function onlock(){

  $('#lock').click(function(){
    lock();
  });
}
function onunlock(){
  $('#unlock').click(function(){
    unlock();
  });
}
/* Set up the page */
$( document ).ready(function (){
    setUpWebcam();
    onClickSnap();
    onlock();
    onunlock();

})

window.onload = () => {
  var data = String($('#hidden').html())
  if(data.includes('https://')){

var parser = new DOMParser;
var dom = parser.parseFromString(
    '<!doctype html><body>' + data,
    'text/html');
var decodedString = dom.body.textContent;

  console.log(unescape(decodedString))

     window.location.replace(decodedString);
  }
}

function openCameraOverlay() {
  $('#overlay').css('display', 'block')
  $('#canvas').css('display', 'none')
}
