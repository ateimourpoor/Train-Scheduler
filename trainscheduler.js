var config = {
    apiKey: "AIzaSyBagM0VtO7YxQTJ_n9EddMRB4GBk6DJoOc",
    authDomain: "gtcbc72-bba8c.firebaseapp.com",
    databaseURL: "https://gtcbc72-bba8c.firebaseio.com",
    projectId: "gtcbc72-bba8c",
    storageBucket: "gtcbc72-bba8c.appspot.com",
    messagingSenderId: "371475465748"
};



firebase.initializeApp(config);
var database = firebase.database();

var name = "";
var destination = "";
var time = "";
var frequency = 0;

$("#add-employee-btn").on("click", function() {

    name = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    time = $("#train-time").val().trim();
    frequency = $("#train-frequency").val().trim();

    database.ref('/train').push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    })
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");
    event.preventDefault();
});

database.ref('/train').on("child_added", function(childsnapshot) {


    var child = childsnapshot.val();
    var childName = child.name;
    var childDestination = child.destination;
    var childTime = child.time;
    var childFrequency= child.frequency;
    var militaryFormat = "HH:mm";
    var convertedDate = moment(childTime, militaryFormat);


    var differenceMins = moment().diff(convertedDate, 'minutes');
    var minsAway = Math.floor(((differenceMins/childFrequency) - Math.floor(differenceMins/childFrequency))*childFrequency);
    console.log(differenceMins);
    console.log(minsAway);
    var arrivalTime = moment().add(minsAway, 'minutes').format(militaryFormat);
    //var arrivalTime1 = moment(arrivalTime,militaryFormat);
    console.log(arrivalTime);


    $("#employee-table > tbody").append("<tr><td>" + childName + "</td><td>" + childDestination + "</td><td>" +
        childFrequency + "</td><td>" + arrivalTime + "</td><td>" + minsAway );
})