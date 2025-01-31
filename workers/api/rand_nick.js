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
      const adjectives = ["快乐的", "聪明的", "可爱的", "善良的", "活泼的"];
      const nouns = ["小猫", "小狗", "小兔", "小鸟", "小熊"];
      
      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      
      return new Response(JSON.stringify({
        success: true,
        nickname: `${randomAdjective}${randomNoun}`
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
}; 