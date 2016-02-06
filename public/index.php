<?php

// Header
include __DIR__ . "/../views/header.html";
?>

<div class="container">
    <form class="answer-form" name="answer-form">
        <img class="logo" src="/images/whereina2.png" />
        <div class="clue-holder">Great! Now that you're awake let's get started...</div>
        <input type="text" id="answer" name="answer" placeholder="Answers go in the box!" />
        <div class="hint">
            <strong id="strong-hint">
                Hint.
            </strong>
        </div>
        <button type="submit" class="start-btn" id="start-btn">Start!</button>
    </form>
    <div class="timer-holder">
        You have been searching for <span id="timer">...</span>.
    </div>
</div>

<?php
// Footer
include __DIR__ . "/../views/footer.html";
