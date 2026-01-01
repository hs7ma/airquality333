# إصلاح مشكلة 404 على Vercel 🔧

## المشكلة
Vercel يعرض خطأ 404 عند محاولة الوصول للتطبيق.

## الحلول المطبقة

### 1. تم تبسيط `vercel.json`
الآن يستخدم `rewrites` فقط لـ API routes.

### 2. إذا استمرت المشكلة، جرب الحلول التالية:

#### الحل البديل 1: نقل الملفات إلى الجذر
```bash
# انقل الملفات من public/ إلى الجذر
mv public/index.html .
mv public/app.js .
mv public/style.css .
```

ثم عدّل `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/index.js"
    }
  ]
}
```

#### الحل البديل 2: استخدام output directory
أضف في `package.json`:
```json
{
  "scripts": {
    "build": "echo 'No build needed'"
  }
}
```

#### الحل البديل 3: إنشاء serverless function للصفحة الرئيسية
أنشئ `api/index.html.js`:
```javascript
module.exports = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
};
```

## التحقق من المشكلة

1. تأكد أن مجلد `public` موجود
2. تأكد أن `api/index.js` موجود
3. تأكد أن `vercel.json` موجود في الجذر
4. راجع Logs في Vercel Dashboard لمعرفة الخطأ الدقيق

## إذا لم يعمل

جرب نشر بدون `vercel.json` - Vercel قد يكتشف البنية تلقائياً:
- احذف `vercel.json`
- Vercel سيعامل `api/` كـ serverless functions
- الملفات في `public/` قد تحتاج نقل للجذر

