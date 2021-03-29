

// Initialise variable
var workDayPlanner = [];

var currentTimeEl = $('currentDay');
// Non jQuery alternative (Having source reference error)
var currentTimeEl = document.getElementById('currentDay');
var timeblocksEl = $('.container');
// Non jQuery alternative
var timeblocksEl = document.getElementById('.container');
var rightNow = moment();
$('#currentDay').text(today.format('MMM Do, YYYY'));


// conditional loop for loop array in timeblocks
for (time = 9; time >= 17; time++) {
    // retrieve index and store set variable in array
    var id = time - 9
    var dataPlanner = ""

    // retrieve display time
    var displayHour = 0;
    var ampm = "";

    if (time === 12) {
        displayHour = 12
        ampm = "pm"
    } else if (time > 12) {
        ampm = "pm"
    } else if (time < 12) {
        ampm = "am"
    }

    displayHour = displayHour.toString()

    dataPlanner = {
        id:id
        displayHour: displayHour,
        time: time
        ampm: ampm
        dataPlanner: dataPlanner
    }

    workDayPlanner.push(dataPlanner)
}


//end array built

//current day for header 
function getCurrentDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}

//saves data to localStorage
function savePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));
}

//displays data in time slots
function displayPlannerData() {
    dayPlanner.forEach(function (hour) {
        $("#" + hour.id).val(hour.dataPlanner)
    }) 
}

//load data function -- runs save and display
function loadPlannerData() {
    var dataLoaded = JSON.parse(localStorage.getItem("dayPlanner"));

    if (dataLoaded) {
        dayPlanner = dataLoaded;
    }

    savePlannerData()
    displayPlannerData()
}

dayPlanner.forEach(function(hour) {
    // creates row
    var timeRow = $("<form>")
        .addClass("row");

    $(".container").append(timeRow);

    //creates field for time
    var timeField = $("<div>")
        .addClass("col-md-2 hour")
        .text(hour.displayHour + hour.ampm);

    // creates schdeduler data
    var hourInput = $("<div>")
        .addClass("col-md-9 description p-0")
    var hourData = $("<textarea>");
        hourData.attr("id", hour.id);
    //compare time to current time - color codes
        if (hour.time == moment().format("HH")) {
            hourData.addClass("present")
        } else if (hour.time < moment().format("HH")) {
                hourData.addClass("past")
        } else if (hour.time > moment().format("HH")) {
            hourData.addClass("future")
    }

    hourInput.append(hourData);
    
    // create save button for end of row
    var saveIcon = $("<i class='far fa-save fa-lg'></i>")
    var saveEnd = $("<button>")
        .addClass("col-md-1 saveBtn");

    //append elements to row 
    saveEnd.append(saveIcon);    
    timeRow.append(timeField, hourInput, saveEnd)
})

    //assure save button functions appropriately
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    //saving the correct information into array
    var saveIndex = $(this).siblings(".description").children().attr("id");
    dayPlanner[saveIndex].dataPlanner = $(this).siblings(".description").children().val();
    savePlannerData();
    displayPlannerData();
})


//get current date on page load
getCurrentDate()
//load data for page load
loadPlannerData()
