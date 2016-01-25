<?php

// Get filestore values
$storageObj = json_decode(file_get_contents('../storage.json'));

// Header
include __DIR__ . "/../views/header.html";
require_once 'clues.php';
?>

<div class="container">
    <form class="answer-form" name="answer-form">
        <input type="hidden" id="started" value="<?php echo $storageObj->started; ?>" />
        <input type="hidden" id="start-time" value="<?php echo $storageObj->startTime; ?>" />
        <input type="hidden" id="clue" value="<?php echo $storageObj->clue; ?>" />
        <img class="logo" src="/images/whereina2.png" />
        <div class="clue-holder"><?php echo $clues[$storageObj->clue]; ?></div>
        <input type="text" id="answer" name="answer" placeholder="..." />
        <div class="hint">
            <strong id="strong-hint">
            <?php 
            if ($storageObj->num_guesses >= 1 && $storageObj->num_guesses <=3) {
                echo "Wrong guess. Try again.";
            } else if ($storageObj->num_guesses > 3) {
                echo "Hint.";
            }
            ?>
            </strong>
        </div>
        <button type="submit" class="start-btn" id="start-btn">Start!</button>
    </form>
    <div class="timer-holder">
        You have been searching for <span class="timer">...</span>.
    </div>
</div>

<?php
// Footer
include __DIR__ . "/../views/footer.html";
