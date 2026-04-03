const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'http://fullmark.online',
    changeOrigin: true,
    onProxyReq: (proxyReq) => {
      // هنا الخدعة: إرسال الـ Cookie اللي المنصة بتطلبها
      // ملاحظة: لازم تجيب اسم الـ Cookie من الـ Inspect بتاع المنصة بعد ما تسجل دخول
      proxyReq.setHeader('Cookie', 'session_id=6188310641; authorized=true'); 
      proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0');
    },
    onProxyRes: (proxyRes) => {
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
    }
  });

  return proxy(req, res);
};
