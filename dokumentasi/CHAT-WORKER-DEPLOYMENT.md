# 🚀 Chat Worker Deployment Guide

Panduan lengkap untuk deploy Chat Worker ke Cloudflare Workers untuk menangani request dari widget chatbot.

## 📋 Prerequisites

- ✅ Akun Cloudflare (gratis)
- ✅ Node.js v16+ dan npm terinstall
- ✅ Wrangler CLI
- ✅ Firebase Realtime Database sudah setup

## 📦 Step 1: Install Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Verify installation
wrangler --version
```

## 🔐 Step 2: Login ke Cloudflare

```bash
# Login via browser
wrangler login

# Verify login
wrangler whoami
```

## ⚙️ Step 3: Configure Worker

1. **Edit `wrangler-chat.toml`** - Tambahkan Account ID:

```bash
# Get your account ID
wrangler whoami
```

Copy Account ID dan paste ke `wrangler-chat.toml`:

```toml
account_id = "your-account-id-here"
```

2. **Set Environment Variables** (Secrets):

```bash
# Set Firebase Database URL
wrangler secret put FIREBASE_DATABASE_URL -c wrangler-chat.toml

# Paste when prompted:
# https://argamada-ac6cc-asia-southeast1.firebasedatabase.app

# Optional: Set fallback Groq API key
wrangler secret put GROQ_API_KEY -c wrangler-chat.toml
# Paste your Groq API key: gsk_...
```

## 🚀 Step 4: Deploy Worker

```bash
# Deploy to production
wrangler deploy -c wrangler-chat.toml --env production

# Or deploy to development first
wrangler deploy -c wrangler-chat.toml --env development
```

Output akan menampilkan URL worker, contoh:
```
✨ Deployed chatbot-widget-api
   https://chatbot-widget-api.YOUR_SUBDOMAIN.workers.dev
```

## ✅ Step 5: Test Worker

```bash
# Test health endpoint
curl https://chatbot-widget-api.YOUR_SUBDOMAIN.workers.dev/health

# Expected output:
# {
#   "status": "ok",
#   "service": "chatbot-widget-api",
#   "version": "1.0.0",
#   "timestamp": "2024-..."
# }
```

## 🔧 Step 6: Update Widget Configuration

Edit file `chatbot-widget.js` line 35:

```javascript
// Ganti dengan URL worker Anda
const API_ENDPOINT = 'https://chatbot-widget-api.YOUR_SUBDOMAIN.workers.dev/chat';
```

Atau gunakan custom domain (opsional):

```javascript
const API_ENDPOINT = 'https://chatbot-api.meera.id/chat';
```

## 🌐 Step 7: Setup Custom Domain (Opsional)

1. **Di Cloudflare Dashboard:**
   - Workers & Pages → chatbot-widget-api
   - Settings → Triggers → Custom Domains
   - Add: `chatbot-api.meera.id` atau subdomain lain

2. **Update DNS:**
   - Cloudflare akan otomatis buat DNS record
   - Tunggu propagasi (~5 menit)

3. **Test Custom Domain:**
```bash
curl https://chatbot-api.meera.id/health
```

## 📤 Step 8: Deploy Widget ke CDN

### Option A: GitHub + jsDelivr (Gratis & Recommended)

1. **Push ke GitHub:**
```bash
git add chatbot-widget.js
git commit -m "Update widget with worker URL"
git push origin main
```

2. **Use CDN URL:**
```html
<!-- Replace YOUR_GITHUB_USERNAME with your username -->
<script src="https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/ugm-chatbot@main/chatbot-widget.js"></script>
```

3. **Update Dashboard** - Edit URL di `dashboard.html` line 1397

### Option B: Vercel (Alternative)

1. **Deploy to Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Copy chatbot-widget.js to public folder
# Then use: https://your-project.vercel.app/chatbot-widget.js
```

### Option C: Cloudflare Pages

1. **Create Pages Project:**
```bash
# Create _headers file for CORS
echo "/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=3600" > _headers

# Deploy
npx wrangler pages deploy . --project-name=chatbot-widget
```

## 🧪 Testing End-to-End

1. **Create Test HTML:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Widget Test</title>
</head>
<body>
    <h1>Test Chatbot Widget</h1>
    
    <!-- Widget Script -->
    <script src="https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/ugm-chatbot@main/chatbot-widget.js"></script>
    <script>
      ChatbotAI.init({
        userId: 'PASTE_YOUR_USER_ID_HERE', // From Firebase
        position: 'bottom-right',
        primaryColor: '#6366F1'
      });
    </script>
</body>
</html>
```

2. **Open in Browser** dan test:
   - ✅ Widget button muncul
   - ✅ Click button, chat window terbuka
   - ✅ Kirim pesan, dapat response

## 🔍 Troubleshooting

### Widget tidak muncul:
1. Buka Console (F12) → cek error JavaScript
2. Pastikan URL widget benar dan accessible
3. Cek CORS headers di network tab

### Chat tidak respond:
1. Test worker endpoint:
```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","message":"hello"}'
```

2. Cek logs:
```bash
wrangler tail -c wrangler-chat.toml
```

3. Pastikan:
   - Subscription status = 'active'
   - Ada API keys (admin atau user keys)
   - Firebase rules allow read publicData

### Error "Subscription not active":
- User harus subscribe dulu via dashboard
- Admin harus approve subscription
- Cek di Firebase: `/subscriptions/{userId}/status` = "active"

## 📊 Monitoring

```bash
# View real-time logs
wrangler tail -c wrangler-chat.toml

# View worker analytics
# Go to: Cloudflare Dashboard → Workers & Pages → chatbot-widget-api → Metrics
```

## 💰 Pricing

**Cloudflare Workers Free Tier:**
- ✅ 100,000 requests/day
- ✅ 10ms CPU time per request
- ✅ Cukup untuk ~3,000+ chat messages/day

**Paid Plan ($5/month):**
- 10 juta requests/bulan
- 50ms CPU time per request

## 🎯 Next Steps

1. ✅ Deploy worker ke production
2. ✅ Update widget URL ke CDN
3. ✅ Test dengan real user
4. ✅ Monitor usage di Cloudflare dashboard
5. ✅ Setup alerting (optional)

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [jsDelivr CDN](https://www.jsdelivr.com/)

---

**Need Help?** Check logs dengan `wrangler tail` atau lihat Firebase console untuk debug data issues.
