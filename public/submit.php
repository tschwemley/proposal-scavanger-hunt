<?php

ini_set('display_errors', 1);
require_once 'clues.php';
require_once 'answers.php';

$storageObj = json_decode(file_get_contents('../storage.json'));
$correct = false;

// Initialize the game
if ($storageObj->started == 0) {
    $storageObj->started = 1;
    $storageObj->startTime = time();
    $storageObj->clue = 1;

// Game is already started
} else {
    // Check to see if we got the right answer.
    $answer = $_POST['answer'];
    var_dump($answer);
    echo "\n\n";
    var_dump($answers[$storageObj->clue]);
    // Case insensitive comparison
    if (strcasecmp($answer, $answers[$storageObj->clue]) == 0) {
        echo 'Answer is correct';
    } else {
        $storageObj->num_guesses++;
    }
}

$newStorageJson = json_encode($storageObj, JSON_PRETTY_PRINT);
file_put_contents('../storage.json', $newStorageJson);

echo $newStorageJson;
