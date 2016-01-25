$(document).ready(function() {
  // Set up the page based on what step we're on
  if ($('#started').val() == 0) {
    $('#answer').hide();
    $('.timer-holder').hide();
  } else {
    $('.start-btn').hide();
    timer($('#start-time').val());
  }

  $('.answer-form').submit(function(e) {
    e.preventDefault(); 

    $.ajax({
      "method": "post",
      "url": "/submit.php",
      "data": {
        "answer": $('#answer').val()
      }
      // "dataType": "json"
    })
    
    .done(function(data) {
      console.log(data);
      // window.location.reload();
    });

  });
});

function timer(start) {
  var el = '.timer';
  var cDisplay = $(el);
  var format = function (t) {
      var hours = Math.floor(t / 3600),
          minutes = Math.floor(t / 60 % 60),
          seconds = Math.floor(t % 60),
          arr = [];
      if (hours > 0) {
          arr.push(hours == 1 ? '1 hour,' : hours + 'hours,');
      }
      if (minutes > 0 || hours > 0) {
          arr.push((minutes > 1 || minutes == 0) ? minutes + ' minutes and' : minutes + ' minute and');
      }
      if (seconds > 0 || minutes > 0 || hours > 0) {
          arr.push((seconds > 1 || seconds == 0) ? seconds + ' seconds' : seconds + ' second');
      }
      cDisplay.html(arr.join(' '));
  };
  setInterval(function () {
      format(new Date().getTime() / 1000 - start);
  }, 1000);
}
