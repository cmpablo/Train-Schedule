$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyByZO9JCJ0lCSMT3LAST2RdIFZKfdRzka8",
    authDomain: "train-schedule-79421.firebaseapp.com",
    databaseURL: "https://train-schedule-79421.firebaseio.com",
    storageBucket: "train-schedule-79421.appspot.com"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    // variables for form input
    var name = $("#name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var time = $("#time-input").val().trim();
    var freq = $("#freq-input").val().trim();

    var addTrain = {
      name: name,
      dest: dest,
      time: time,
      freq: freq
    };

    database.ref().push(addTrain);

    console.log(addTrain.name);
    console.log(addTrain.dest);
    console.log(addTrain.time);
    console.log(addTrain.freq);

    // alert("New train successfully added... CHOO! CHOO!");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
    
  });

  // firebase event to add new train to database and add a row in the table
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var addName = childSnapshot.val().name;
    var addDest = childSnapshot.val().dest;
    var addTime = childSnapshot.val().time;
    var addFreq = childSnapshot.val().freq;
   

    // new train info
    console.log(addName);
    console.log(addDest);
    console.log(addTime);
    console.log(addFreq);

    // precious moments
    var firstTime = "04:30";
    var initialConvert = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(initialConvert);

    var currentTime = moment();
    // console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(initialConvert), "minutes");
    // console.log("Difference in time: " + diffTime);

    var tRemain = diffTime % addFreq;
    // console.log(tRemain);

    var tMinsTilTrain = addFreq - tRemain;
    // console.log("Minutes til train: " + tMinsTilTrain);

    var nextTrain = moment().add(tMinsTilTrain, "minutes").format("hh:mm");
    // console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

    // adding to current schedule
     $("#add-train-data").append("<tr><td>" + addName + "</td><td>" + addDest + "</td><td>" + addFreq + "</td><td>" + nextTrain + "</td><td>" + tMinsTilTrain +"</td></tr>");

  
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});
