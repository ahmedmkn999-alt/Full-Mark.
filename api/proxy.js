const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // إعداد البروكسي لموقع المنصة
  const proxy = createProxyMiddleware({
    target: 'http://fullmark.online',
    changeOrigin: true,
    pathRewrite: {
      '^/api/proxy': '', // إعادة توجيه المسارات
    },
    onProxyRes: (proxyRes) => {
      // حذف قيود الحماية عشان تفتح في أي جهاز (Iframe)
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
    },
  });

  return proxy(req, res);
};
