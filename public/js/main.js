$(document).ready(function() {
  var startTime = localStorage.getItem('startTime');
  var started = localStorage.getItem('started');
  var clue = localStorage.getItem('clue');
  var numGuesses = localStorage.getItem('numGuesses');
  console.log("start time: " + startTime);
  console.log("started: " + started);
  console.log("clue: " + clue);
  console.log("guesses: " + numGuesses);

  // Remove local storage items (for testing only)
  // localStorage.removeItem('startTime');
  // localStorage.removeItem('started');
  // localStorage.removeItem('clue');
  // localStorage.removeItem('numGuesses');
  // console.log(localStorage.getItem('startTime'));
  // console.log(localStorage.getItem('started'));
  // console.log(localStorage.getItem('clue'));
  // console.log(localStorage.getItem('numGuesses'));

  $('.start-btn').on('click', function(e) {
    if (startTime === null) {
      // Initialize scavanger hunt
      localStorage.setItem('startTime', Date.now());
      localStorage.setItem('started', true);
      localStorage.setItem('clue', 0);
      localStorage.setItem('numGuesses', 0);

      // Hide and show appropriate elements
      $('.start-btn').hide();
      $('#answer').show();
      $('.timer-holder').show();

      $('.clue-holder').html(clues[localStorage.getItem('clue')]);
    }
  });
  
  // Set up the page based on what step we're on
  if (started === null) {
    $('#answer').hide();
    $('.timer-holder').hide();
    console.log('not started');
  } else {
    $('.start-btn').hide();
    $('.clue-holder').html(clues[localStorage.getItem('clue')]);
  }

  $('.answer-form').submit(function(e) {
    e.preventDefault(); 

    // $.ajax({
    //   "method": "post",
    //   "url": "/submit.php",
    //   "data": {
    //     "answer": $('#answer').val()
    //   }
    //   // "dataType": "json"
    // })
    
    // .done(function(data) {
    //   console.log(data);
    //   // window.location.reload();
    // });

  });
});

// Function that displays how long it has been since scavanger hunt started.
setInterval(function() {
    // Get amount of time since started
    var timeElapsed = Math.floor((Date.now() - localStorage.getItem('startTime')) / 1000);
    var seconds = timeElapsed % 60;
    timeElapsed /= 60;
    var minutes = Math.floor(timeElapsed % 60);
    timeElapsed /= 60;
    var hours = Math.floor(timeElapsed % 24);
    timeElapsed /= 24;
    var days = Math.floor(timeElapsed);

    var timerMsg = '';
    if (days > 0) {
      timerMsg += days.toString();
      timerMsg += (days == 1) ? ' day, ' : ' days, ';
    }

    if (hours > 0) {
      timerMsg += hours.toString();
      timerMsg += (hours == 1) ? ' hour, ' : ' hours, ';
    }

    if (minutes > 0) {
      timerMsg += minutes.toString();
      timerMsg += (minutes == 1) ? ' minute and ' : ' minutes and ';
    }

    timerMsg += seconds.toString();
    timerMsg += (seconds == 1) ? ' second' : ' seconds';

    $('#timer').html(timerMsg);
      
}, 1000);
