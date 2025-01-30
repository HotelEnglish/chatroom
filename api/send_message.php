<?php
session_start();
header('Content-Type: application/json');

if (!isset($_POST['message']) || !isset($_SESSION['username'])) {
    echo json_encode(['success' => false]);
    exit;
}

$message = [
    'id' => time() . rand(1000, 9999),
    'username' => $_SESSION['username'],
    'avatar' => $_SESSION['avatar'],
    'content' => htmlspecialchars($_POST['message']),
    'timestamp' => time()
];

file_put_contents('chat.txt', json_encode($message) . "\n", FILE_APPEND);

echo json_encode(['success' => true]); 