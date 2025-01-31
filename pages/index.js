import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [nickname, setNickname] = useState('');

  // API 基础URL会根据环境变量设置
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  useEffect(() => {
    // 获取随机昵称
    fetch(`${API_BASE_URL}/rand_nick`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNickname(data.nickname);
        }
      });

    // 获取消息列表
    fetch(`${API_BASE_URL}/get_messages`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessages(data.messages);
        }
      });
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const response = await fetch(`${API_BASE_URL}/send_message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: newMessage,
        nickname: nickname,
      }),
    });

    const data = await response.json();
    if (data.success) {
      setMessages([...messages, data.message]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="pt-16 pb-16 container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-4 mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="font-bold text-gray-700 dark:text-gray-300">{msg.nickname}</p>
                <p className="text-gray-600 dark:text-gray-400">{msg.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="输入消息..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              发送
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
} 