export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method === "GET") {
      try {
        const { keys } = await env.MESSAGES.list();
        const messages = [];
        
        for (const key of keys) {
          const value = await env.MESSAGES.get(key.name);
          if (value) {
            messages.push(JSON.parse(value));
          }
        }
        
        // 按时间戳排序
        messages.sort((a, b) => a.timestamp - b.timestamp);
        
        return new Response(JSON.stringify({ success: true, messages }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }
  },
}; 