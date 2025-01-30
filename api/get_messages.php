<?php
header('Content-Type: application/json');

$messages = file_exists('chat.txt') ? file('chat.txt') : [];
$response = ['messages' => []];

$last_id = isset($_GET['last_id']) ? intval($_GET['last_id']) : 0;

foreach ($messages as $message) {
    $data = json_decode($message, true);
    if ($data && $data['id'] > $last_id) {
        $response['messages'][] = $data;
    }
}

// 只返回最后50条消息
$response['messages'] = array_slice($response['messages'], -50);

echo json_encode($response); 