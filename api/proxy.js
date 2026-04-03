const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // 1. طلب الصفحة من المنصة الأصلية كأننا متصفح عادي
    const response = await axios.get('http://fullmark.online', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
      }
    });

    let html = response.data;

    // 2. حقن سكريبت الدخول التلقائي جوه الـ HTML قبل ما نبعته ليك
    const autoLoginScript = `
      <script>
        window.onload = function() {
          const MY_CODE = "6188310641";
          // ابحث عن كل الـ inputs وحط فيها الكود
          const inputs = document.querySelectorAll('input');
          inputs.forEach(input => {
            if(input.type === 'text' || input.type === 'number') {
              input.value = MY_CODE;
            }
          });
          // دوس على زرار الدخول أوتوماتيك بعد ثانية
          setTimeout(() => {
            const btn = document.querySelector('button') || document.querySelector('input[type="submit"]');
            if(btn) btn.click();
          }, 1000);
        };
      </script>
    `;

    // حط السكريبت قبل قفلة الـ body
    html = html.replace('</body>', `${autoLoginScript}</body>`);

    // 3. بعت الـ HTML المعدل للمتصفح بتاعك
    res.setHeader('Content-Type', 'text/html');
    res.send(html);

  } catch (error) {
    res.status(500).send("Error fetching platform content");
  }
};
