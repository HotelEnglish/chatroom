export default {
  async fetch(request, env) {
    // 处理 CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // 处理消息逻辑
    if (request.method === "POST") {
      const data = await request.json();
      // 存储消息到 KV 或其他存储
      await env.MESSAGES.put(Date.now().toString(), JSON.stringify(data));
      
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 获取消息列表
    if (request.method === "GET") {
      // 从 KV 获取消息
      const messages = await env.MESSAGES.list();
      
      return new Response(JSON.stringify(messages), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
}; 