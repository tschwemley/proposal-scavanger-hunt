<?php

require_once 'answers.php';

$answer = $_POST['answer'];
$clue = $_POST['clue'];

$correct = false;

// Perform case insensitive comparision of given and correct answer (0 == same)
if (strcasecmp($answer, $answers[$clue]) == 0) {
    echo json_encode([true]);
} else {
    echo json_encode([false]);
}
exit;
