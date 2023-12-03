$(function () {
  // Get the current date using Day.js and display it in the header
  // FIGURE OUT HOW TO GET THE TIME USING JQUERY
  var currentDate = dayjs().format("dddd, MMMM D");
  //document.getElementById("currentDay").textContent = currentDate;
  $("#currentDay").text(currentDate);
  console.log(currentDate);
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the parent time-block id (e.g., "hour-9")
    var timeBlockId = $(this).parent().attr("id");

    // Get the user input from the textarea
    var eventDescription = $(this).siblings(".description").val();

    // Save the user input in local storage using the time block id as the key
    localStorage.setItem(timeBlockId, eventDescription);
  });

  // Function to update time block colors based on the current time
  function updateColors() {
    // Get the current hour using Day.js in 24-hour format
    var currentHour = parseInt(dayjs().format("H"));

    // Loop through each time block and apply past, present, or future class
    $(".time-block").each(function () {
      // Extract the hour from the time-block id (e.g., "hour-9" -> 9)
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Compare blockHour with currentHour and apply appropriate class
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call updateColors on page load
  updateColors();

  // Get saved events from local storage and display them in the textareas
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedEvent = localStorage.getItem(timeBlockId);

    if (savedEvent !== null) {
      $(this).children(".description").val(savedEvent);
    }
  });

  // Set up an interval to update colors every hour
  setInterval(updateColors, 1000 * 60 * 60); // Update every hour (in milliseconds)
});


