'use strict';




function lookupUser(uuid) {

}

/* Set up the page */
$( document ).ready(function (){

  var uuid =2;

  //GET COOKIE UUID HERE

  var name = "Undefined";
  var phone = "Undefined";
  var email = "Undefined";
  var car = "Undefined";
  var imageURL = "Undefined";



  var res = lookupUser(uuid);


  $.ajax({
    url: 'https://projectpurple.lib.id/facechain@dev/lookupUser/?UUID='+uuid,
    async: false,
    success: function(res) {
      console.log(res);
      name = res.name;
      phone = res.phonenumber;
      email = res.email
      car = "Tesla Model S";
      imageURL = res.pictureURL;
      $('#profileImage').attr('src', imageURL);
      $('#profileName').html(name);
      $('#profileEmail').html(email);
      $('#profilePhone').html(phone);
      return res;
    }
  })



  //GET COOKIE FOR (TESLA) CODE

})
