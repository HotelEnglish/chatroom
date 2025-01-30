<?php
session_start();
if (!isset($_SESSION['username'])) {
    include 'api/rand_nick.php';
    $_SESSION['username'] = rand_nick();
    $_SESSION['avatar'] = 'https://api.dicebear.com/6.x/avataaars/svg?seed=' . $_SESSION['username'];
}
?>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>轻量级聊天室</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/emoji-mart@latest/css/emoji-mart.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/emoji-mart.js"></script>
</head>
<body class="light-theme">
    <div class="chat-container">
        <div class="chat-header">
            <div class="user-info">
                <img src="<?php echo $_SESSION['avatar']; ?>" alt="avatar" class="avatar">
                <span class="username"><?php echo $_SESSION['username']; ?></span>
            </div>
            <div class="controls">
                <button id="themeToggle">切换主题</button>
                <button id="soundToggle">声音开关</button>
            </div>
        </div>
        <div class="messages" id="messageContainer"></div>
        <div class="input-area">
            <button id="emojiButton">😊</button>
            <input type="text" id="messageInput" placeholder="输入消息...">
            <button id="sendButton">发送</button>
        </div>
    </div>
    <div id="emojiPicker" class="emoji-picker"></div>
    <audio id="notificationSound" src="assets/sounds/notification.mp3"></audio>
    <script src="assets/js/main.js"></script>
</body>
</html> 