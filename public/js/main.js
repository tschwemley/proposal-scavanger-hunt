$(document).ready(function() {
  var started = localStorage.getItem('started');

  $('.start-btn').on('click', function(e) {
    if (started === null) {
      // Initialize scavanger hunt
      localStorage.setItem('startTime', Date.now());
      localStorage.setItem('started', true);
      localStorage.setItem('clue', 0);
      localStorage.setItem('numGuesses', 0);

      window.location.reload();
    }
  });
  
  // Set up the page based on what step we're on
  if (started === null) {
    $('#answer').hide();
    $('.timer-holder').hide();
  } else {
    $('.start-btn').hide();
    $('.clue-holder').html(clues[localStorage.getItem('clue')]);
  }

  $('.answer-form').submit(function(e) {
    e.preventDefault(); 

    $.ajax({
      "method": "post",
      "url": "/submit.php",
      "data": {
        "answer": $('#answer').val(),
        "clue": localStorage.getItem('clue')
      },
      "dataType": "json"
    })

    .done(function(data) {

      // True is correct answer
      if (data[0] === true) {
        var clueNum = parseInt(localStorage.getItem('clue'));
        localStorage.setItem('clue', clueNum + 1);
        localStorage.setItem('numGuesses', 0);

        $('.clue-holder').html(clues[localStorage.getItem('clue')]);
        $('#answer').val('');
        $('#strong-hint').html('');
        $('.hint').hide();
      } else {
        var numGuesses = parseInt(localStorage.getItem('numGuesses')) + 1;
        localStorage.setItem('numGuesses', numGuesses);

        // Show hint if more than 3 guesses
        if (numGuesses > 3) {
          $('#strong-hint').html(hints[localStorage.getItem('clue')]);
          $('.hint').show();
        }
      }
    });

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
