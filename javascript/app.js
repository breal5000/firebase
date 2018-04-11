
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyB-DizNRFwI2lwbtpPeL24qmdolk1yIc2I",
    authDomain: "firesbase-homework.firebaseapp.com",
    databaseURL: "https://firesbase-homework.firebaseio.com",
    projectId: "firesbase-homework",
    storageBucket: "firesbase-homework.appspot.com",
    messagingSenderId: "381231899552"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var currentTime = moment();

database.ref().on("child_added", function(childSnap) {

    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;

    
    var tableRow = $("<tr>");
    tableRow.append("<td>"+ name + "</td>");
    $("tbody").append(tableRow);
    tableRow.append("<td>"+ destination + "</td>");
    $("tbody").append(tableRow);
    tableRow.append("<td>"+ frequency + "</td>");
    $("tbody").append(tableRow);
    tableRow.append("<td>"+ next + "</td>");
    $("tbody").append(tableRow);
    tableRow.append("<td>"+ min + "</td></tr>");
    $("tbody").append(tableRow);
});

database.ref().on("value", function(snapshot) {
});


$("#addTrainBtn").on("click", function() {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    //ensures that each input has a value
    //if (trainName == "") {
      //  alert('Enter a train name.');
        //return false;
    //}
    //if (destination == "") {
      //  alert('Enter a destination.');
        //return false;
    //}
    //if (firstTrain == "") {
      //  alert('Enter a first train time.');
        //return false;
    //}
    //if (frequency == "") {
      //  alert('Enter a frequency');
        //return false;
    //}


    //go back 1 year to make sure it's before current time.
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    // use modolo to assign the time between first and next train
    var remainder = difference % frequency;
    // uses remainder to calculate next train
    var minUntilTrain = frequency - remainder;
    // calculates time until next train
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    //return false;
});

