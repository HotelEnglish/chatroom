let lastMessageId = 0;
let soundEnabled = true;
let contextMenu = null;

// 初始化
$(document).ready(function() {
    loadMessages();
    setInterval(loadMessages, 2000);
    
    // 发送消息
    $('#sendButton').click(sendMessage);
    $('#messageInput').keypress(function(e) {
        if (e.which == 13) sendMessage();
    });
    
    // 主题切换
    $('#themeToggle').click(function() {
        $('body').toggleClass('dark-theme');
        localStorage.setItem('theme', $('body').hasClass('dark-theme') ? 'dark' : 'light');
    });
    
    // 声音开关
    $('#soundToggle').click(function() {
        soundEnabled = !soundEnabled;
        $(this).text(soundEnabled ? '声音开关' : '声音关闭');
    });
    
    // 右键菜单
    $(document).on('contextmenu', '.message', function(e) {
        e.preventDefault();
        showContextMenu(e.pageX, e.pageY, $(this).find('.message-content').text());
    });
    
    // 点击其他地方关闭右键菜单
    $(document).click(function() {
        if (contextMenu) {
            contextMenu.remove();
            contextMenu = null;
        }
    });
});

function loadMessages() {
    $.get('api/get_messages.php', { last_id: lastMessageId }, function(data) {
        if (data.messages && data.messages.length > 0) {
            data.messages.forEach(message => {
                appendMessage(message);
                if (message.id > lastMessageId) {
                    lastMessageId = message.id;
                    playNotification();
                }
            });
            scrollToBottom();
        }
    });
}

function sendMessage() {
    const message = $('#messageInput').val().trim();
    if (message) {
        $.post('api/send_message.php', { message: message }, function(response) {
            if (response.success) {
                $('#messageInput').val('');
                loadMessages();
            }
        });
    }
}

function appendMessage(message) {
    const messageHtml = `
        <div class="message" data-id="${message.id}">
            <img src="${message.avatar}" class="message-avatar" alt="avatar">
            <div class="message-content">
                <div class="message-header">
                    <strong>${message.username}</strong>
                </div>
                <div class="message-text">${formatMessage(message.content)}</div>
                <div class="message-meta">${formatTime(message.timestamp)}</div>
            </div>
        </div>
    `;
    $('#messageContainer').append(messageHtml);
}

function formatMessage(content) {
    // 将URL转换为可点击的链接
    return content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
}

function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString();
}

function showContextMenu(x, y, text) {
    if (contextMenu) contextMenu.remove();
    
    contextMenu = $('<div class="context-menu">')
        .append($('<div class="context-menu-item">').text('复制消息').click(function() {
            navigator.clipboard.writeText(text);
            contextMenu.remove();
            contextMenu = null;
        }))
        .css({
            top: y + 'px',
            left: x + 'px'
        })
        .appendTo('body');
}

function playNotification() {
    if (soundEnabled && document.hidden) {
        $('#notificationSound')[0].play();
    }
}

function scrollToBottom() {
    const container = $('#messageContainer');
    container.scrollTop(container[0].scrollHeight);
} 