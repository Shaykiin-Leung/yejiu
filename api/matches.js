// Vercel Serverless Function: /api/matches
// 代理 football-data.org，保护 API Key，解决跨域问题
// API Key 通过 Vercel 环境变量注入，不写入代码

const https = require('https');

module.exports = async function handler(req, res) {
  // CORS headers — 允许前端页面调用
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API Key 未配置，请在 Vercel 环境变量中添加 FOOTBALL_API_KEY' });
  }

  const endpoint = 'https://api.football-data.org/v4/competitions/WC/matches?season=2026';

  try {
    const data = await new Promise((resolve, reject) => {
      const options = {
        headers: {
          'X-Auth-Token': apiKey,
          'User-Agent': 'YeJiu-App/1.0'
        }
      };

      https.get(endpoint, options, (response) => {
        let body = '';
        response.on('data', chunk => body += chunk);
        response.on('end', () => {
          if (response.statusCode !== 200) {
            reject(new Error(`football-data 返回 ${response.statusCode}: ${body}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error('JSON 解析失败'));
          }
        });
      }).on('error', reject);
    });

    // 缓存30秒，降低 API 请求频率
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return res.status(200).json(data);

  } catch (err) {
    console.error('[api/matches] 请求失败:', err.message);
    return res.status(502).json({ error: err.message });
  }
};
