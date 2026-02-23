# 🚨 CARA MEMPERBAIKI WIDGET CHATBOT

## ❌ Masalah yang Ditemukan:

1. **URL Widget Salah** - Dashboard mengarah ke URL yang tidak valid
2. **Chat API Belum Deploy** - Widget butuh backend API untuk chat
3. **Widget File Belum di-Host** - File widget harus accessible via internet

## ✅ SOLUSI CEPAT (5 Langkah):

### 1️⃣ Install Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

### 2️⃣ Deploy Chat Worker

```bash
# Copy account ID
wrangler whoami

# Edit wrangler-chat.toml, isi account_id

# Set Firebase URL secret
wrangler secret put FIREBASE_DATABASE_URL -c wrangler-chat.toml
# Paste: https://argamada-ac6cc-asia-southeast1.firebasedatabase.app

# Deploy!
wrangler deploy -c wrangler-chat.toml --env production
```

**Catat URL worker yang muncul!**
Contoh: `https://chatbot-widget-api.xxxxx.workers.dev`

### 3️⃣ Update Widget File

Edit file `chatbot-widget.js` baris 35:

```javascript
// GANTI dengan URL worker Anda dari step 2
const API_ENDPOINT = 'https://chatbot-widget-api.xxxxx.workers.dev/chat';
```

### 4️⃣ Push ke GitHub

```bash
git add chatbot-widget.js chat-worker.js wrangler-chat.toml
git commit -m "Fix widget and add chat worker"
git push origin main
```

### 5️⃣ Update Dashboard

Edit file `dashboard.html` baris 1397:

```javascript
// GANTI YOUR_GITHUB_USERNAME dengan username GitHub Anda
'<script src="https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/ugm-chatbot@main/chatbot-widget.js">'
```

## 🧪 Test Widget

Buat file `test-widget.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Widget</title>
</head>
<body>
    <h1>Test Chatbot Widget</h1>
    
    <!-- GANTI dengan URL dan User ID Anda -->
    <script src="https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/ugm-chatbot@main/chatbot-widget.js"></script>
    <script>
      ChatbotAI.init({
        userId: 'PASTE_FIREBASE_USER_ID_DISINI',
        position: 'bottom-right',
        primaryColor: '#6366F1'
      });
    </script>
</body>
</html>
```

Buka di browser → Widget harus muncul di pojok kanan bawah!

## ⚠️ PENTING - Cek Subscription

Widget hanya bekerja jika:
1. ✅ User sudah subscribe (status: **active**)
2. ✅ Admin sudah approve subscription
3. ✅ Ada API keys (admin keys untuk Groq/Cerebras)

Cek di Firebase: `/subscriptions/{userId}/status` harus **"active"**

## 🔍 Debugging

### Widget tidak muncul?
```bash
# Buka browser → F12 → Console
# Cek error apa yang muncul
```

### Chat tidak merespon?
```bash
# Test worker endpoint
curl -X POST https://your-worker.workers.dev/health

# Lihat logs worker
wrangler tail -c wrangler-chat.toml
```

### Error "Subscription not active"?
- Approve subscription dulu via admin dashboard
- Pastikan status = "active" di Firebase
- Tambahkan admin API keys (Groq/Cerebras)

## 📝 Checklist

Sebelum widget bisa dipakai, pastikan:

- [ ] Chat worker sudah di-deploy ke Cloudflare
- [ ] URL worker sudah diupdate di `chatbot-widget.js`
- [ ] Widget file sudah di-push ke GitHub
- [ ] URL CDN di dashboard sudah diganti (YOUR_GITHUB_USERNAME)
- [ ] User subscription status = "active"
- [ ] Admin keys sudah diset di Firebase
- [ ] Test di browser - widget muncul dan bisa chat

## 🎯 Files yang Sudah Dibuat:

1. ✅ `chat-worker.js` - Cloudflare Worker untuk handle chat
2. ✅ `wrangler-chat.toml` - Konfigurasi deployment
3. ✅ `CHAT-WORKER-DEPLOYMENT.md` - Panduan lengkap (English)
4. ✅ `dashboard.html` - URL widget sudah diperbaiki

## 🆘 Butuh Bantuan?

1. Cek [CHAT-WORKER-DEPLOYMENT.md](CHAT-WORKER-DEPLOYMENT.md) untuk panduan lengkap
2. Lihat logs: `wrangler tail -c wrangler-chat.toml`
3. Test endpoint: `curl https://your-worker.workers.dev/health`
4. Cek Firebase Console untuk data subscription

---

**Estimasi Waktu Setup: 10-15 menit** ⏱️
