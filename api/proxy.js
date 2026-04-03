const axios = require('axios');

module.exports = async (req, res) => {
    const targetUrl = 'http://fullmark.online';
    try {
        const response = await axios.get(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' }
        });

        let html = response.data;
        
        // حل مشكلة التنسيق: تعديل الروابط لتشير للموقع الأصلي
        html = html.replace(/(src|href)="\//g, `$1="${targetUrl}/`);

        // سكريبت الحقن
        const injection = `
        <script>
            window.addEventListener('load', () => {
                const code = "6188310641";
                const inputs = document.querySelectorAll('input');
                inputs.forEach(i => { if(i.type==='text'||i.type==='number') i.value = code; });
                setTimeout(() => {
                    const btn = document.querySelector('button') || document.querySelector('input[type="submit"]');
                    if(btn) btn.click();
                }, 1500);
            });
        </script></body>`;
        
        res.setHeader('Content-Type', 'text/html');
        res.send(html.replace('</body>', injection));
    } catch (e) {
        res.status(500).send("Crash: " + e.message);
    }
};
