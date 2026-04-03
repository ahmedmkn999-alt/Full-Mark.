module.exports = (req, res) => {
  // 1. تحديد الكوكيز اللي بتثبت الدخول (دي أهم خطوة)
  // لازم تتأكد من اسم الكوكيز من الـ Inspect في المنصة الأصلية
  const authCookie = "user_code=6188310641; status=authorized; path=/;";

  // 2. إرسال الكوكيز للمتصفح بتاعك (التابلت أو الموبايل)
  res.setHeader('Set-Cookie', [authCookie]);

  // 3. تحويلك فوراً للينك "المحتوى الداخلي" مش الصفحة الرئيسية
  // غير اللينك ده للينك اللي بيظهرلك بعد ما بتسجل دخول يدوياً
  const internalUrl = 'http://fullmark.online/home'; 

  res.writeHead(302, { Location: internalUrl });
  res.end();
};
