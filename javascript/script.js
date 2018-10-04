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

        function nextTrainCalcs() {
            //calculate difference for next train arrival
            var interval = frequency;
            var start = first;
            var startConverted = moment(start, "HH:mm").subtract(1, "years");
            console.log(startConverted);


            var now = moment();
            console.log("current time: " + moment(now).format("hh:mm"));

            //difference
            var diffTime = now.diff(moment(startConverted), "minutes");
            console.log("difference in time: " + diffTime);

            //  time apart is the remainer (modulus)

            var tRemainder = diffTime % interval;
            console.log(tRemainder);

            //time until train
            var nextTrain = moment().add(tRemainder, "minutes");
            console.log("arrival time: " + moment(nextTrain).format("hh:mm"));
        };

        nextTrainCalcs();
        //creates a new temporary variable for train info
        var newTrain = {
            name: trainName,
            destination: dest,
            firstTrain: first,
            often: frequency,
            nextTrain: nextTrain,
            tRemainder: tRemainder
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
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        //store all the info into a variable
        var trainName = childSnapshot.val().name;
        var dest = childSnapshot.val().destination;
        var first = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().often;
        var upcoming = childSnapshot.val().next;
        var minutesTo = childSnapshot.val().tRemainder;

        //log that shit

        console.log(trainName);
        console.log(dest);
        console.log(first);
        console.log(frequency);
        console.log(upcoming);
        console.log(minutesTo);

        // //creating the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(dest),
            $("<td>").text(frequency),
            $("<td>").text(upcoming),
            $("<td>").text(minutesTo)
        );

        $(".table").append(newRow);
    })

    // function nextTrainCalcs() {
    //     //calculate difference for next train arrival
    //     var interval = frequency;
    //     var start = first;
    //     var startConverted = moment(start, "HH:mm").subtract(1, "years");
    //     console.log(startConverted);


    //     var now = moment();
    //     console.log("current time: " + moment(now).format("hh:mm"));

    //     //difference
    //     var diffTime = now.diff(moment(startConverted), "minutes");
    //     console.log("difference in time: " + diffTime);

    //     //  time apart is the remainer (modulus)

    //     var tRemainder = diffTime % interval;
    //     console.log(tRemainder);

    //     //time until train
    //     var nextTrain = moment().add(tRemainder, "minutes");
    //     console.log("arrival time: " + moment(nextTrain).format("hh:mm"));
    // };
    // nextTrainCalcs();

});