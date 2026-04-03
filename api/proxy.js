const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'http://fullmark.online',
    changeOrigin: true,
    autoRewrite: true,
    followRedirects: true, // عشان لو الموقع عمل Redirect يدخل معاه
    onProxyRes: (proxyRes) => {
      // حذف الحماية تماماً عشان المتصفح ميعملش Block
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    onProxyReq: (proxyReq) => {
      // إجبار السيرفر إنه يشوف الطلب كأنه جاي من جهاز كمبيوتر ثابت
      proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }
  });

  return proxy(req, res);
};
