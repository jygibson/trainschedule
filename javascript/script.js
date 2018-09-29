$(document).ready(function () {
    console.log("testing");

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCUvtLBMs8pzlPtbVeuF6kfnttBKCCEjOY",
    authDomain: "wmata-schedule.firebaseapp.com",
    databaseURL: "https://wmata-schedule.firebaseio.com",
    projectId: "wmata-schedule",
    storageBucket: "wmata-schedule.appspot.com",
    messagingSenderId: "500233366242"
  };
  firebase.initializeApp(config);

});