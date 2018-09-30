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

    var database = firebase.database();

    //add the click function to the button
    $(".btn-primary").on("click", function (event) {
        event.preventDefault();
        //takes the user input from the fields
        var trainName = $("#train-name").val().trim();
        var dest = $("#destination").val().trim();
        var first = $("#first-train").val().trim();
        var frequency = $("#frequency").val().trim();

        //creates a new temporary variable for train info
        var newTrain = {
            name: trainName,
            destination: dest,
            firstTrain: first,
            often: frequency
        };

        database.ref().push(newTrain);

        //console that shit

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.often);

        //clears text boxes

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");

    });

    //creating the firebase stuff to call back stored data
 database.ref().on("child_added", function(childSnapshot){
     console.log(childSnapshot.val());

     //store all the info into a variable
     var trainName = childSnapshot.val().name;
     var dest = childSnapshot.val().destination;
     var first = childSnapshot.val().firstTrain;
     var frequency = childSnapshot.val().often;

     //log that shit

     console.log(trainName);
     console.log(dest);
     console.log(first);
     console.log(frequency);

     //calculate difference for next train arrival
     var nextTrain = moment().diff(moment(frequency, "X"), "current time");
     console.log (nextTrain);

     var timeDiff = (nextTrain - frequency);
     console.log(timeDiff);

     //creating the new row
     var newRow = $("<tr>").append(
         $("<td>").text(trainName),
         $("<td>").text(dest),
         $("<td>").text(frequency),
         $("<td>").text(timeDiff),
        //  $("<td>").text(minutes)
     );

     $(".table").append(newRow);
 })
});