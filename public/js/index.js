console.log('test')
var firebase = require("firebase");
var firebaseui = require('firebaseui');
console.log('test')
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCXj7bwM7Keiz_3JvESgzGcrTTUs5o7wY4",
  authDomain: "projectpurp-8e2e3.firebaseapp.com",
  databaseURL: "https://projectpurp-8e2e3.firebaseio.com",
  projectId: "projectpurp-8e2e3",
  storageBucket: "projectpurp-8e2e3.appspot.com",
  messagingSenderId: "214044117452"
};
firebase.initializeApp(config);

ui.start('#firebaseui-auth-container', uiConfig);
