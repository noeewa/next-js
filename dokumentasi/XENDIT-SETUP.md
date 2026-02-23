# 🔥 Xendit Payment Gateway Setup

Complete guide untuk integrasi Xendit dengan Multi-tenant AI Chatbot Platform.

## 📋 Overview

**Xendit Integration Features:**
- ✅ Multiple payment methods (QRIS, VA, E-Wallet)
- ✅ Auto-approve subscription setelah payment success
- ✅ Real-time payment notification via webhook
- ✅ Invoice management & tracking
- ✅ Secure payment gateway

---

## 🎯 Step 1: Create Xendit Account

### 1. Register

Visit: https://dashboard.xendit.co/register

- **Email**: Use real email (akan dikirim verification)
- **Business Name**: Nama bisnis Anda
- **Country**: Indonesia
- **Phone**: Nomor WhatsApp aktif

### 2. Verify Account

1. Check email untuk verification link
2. Upload KTP / dokumen identitas
3. Isi informasi bisnis lengkap
4. Tunggu approval (biasanya 1-2 hari kerja)

**⚠️ Important:**
- Test mode: Bisa langsung pakai tanpa verifikasi
- Production mode: Harus verifikasi dulu

---

## 🔑 Step 2: Get API Keys

### 1. Login to Dashboard

https://dashboard.xendit.co/

### 2. Get Test API Key (Development)

1. Go to: **Settings** → **API Keys** → **Generate secret key**
2. Mode: **Test Mode** (toggle di kanan atas)
3. Copy **Secret API Key**: `xnd_development_xxx...`
4. Save securely (jangan share!)

### 3. Get Production API Key (Live)

1. Switch to **Live Mode** (toggle di kanan atas)
2. Settings → API Keys → Generate secret key
3. Copy **Secret API Key**: `xnd_production_xxx...`
4. Save for production deployment

**API Key Format:**
```
Test: xnd_development_O46JfOtYIGH3Lew0h9FqjbxZ0LbM
Live: xnd_production_O46JfOtYIGH3Lew0h9FqjbxZ0LbM
```

---

## 🛠️ Step 3: Setup Webhook URL

Webhook = URL yang Xendit call ketika payment success/failed.

### 1. Deploy Cloudflare Worker First

```bash
cd d:\ugm-chatbot
wrangler publish xendit-worker.js
```

Output:
```
Published xendit-worker
  https://xendit-worker.YOUR-SUBDOMAIN.workers.dev
```

Copy URL ini!

### 2. Set Webhook in Xendit Dashboard

1. Go to: **Settings** → **Webhooks**
2. Click: **+ Add Webhook**
3. Type: **Invoice Paid**
4. URL: `https://xendit-worker.YOUR-SUBDOMAIN.workers.dev/webhook`
5. Environment: **Test** (untuk testing) atau **Live** (production)
6. Click: **Create**

**Webhook Events to Enable:**
- ✅ `invoice.paid` - Payment berhasil
- ✅ `invoice.expired` - Invoice expired
- ⚠️ `invoice.failed` - Payment gagal (optional)

### 3. Get Webhook Verification Token

1. Di halaman Webhooks, klik webhook yang baru dibuat
2. Copy **Verification Token**
3. Save untuk dipakai di Cloudflare Worker

---

## 💻 Step 4: Deploy Cloudflare Worker

### File Structure
```
d:\ugm-chatbot\
├── xendit-worker.js       ← Xendit API handler
├── wrangler.toml          ← Cloudflare Worker config
└── subscribe.html         ← Updated with Xendit
```

### 1. Install Wrangler CLI

```powershell
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

### 2. Create wrangler.toml

Already created! See `wrangler.toml`

### 3. Set Environment Variables

```bash
# Xendit API Key (Test Mode)
wrangler secret put XENDIT_API_KEY
# Paste: xnd_development_xxx...

# Xendit Webhook Token
wrangler secret put XENDIT_WEBHOOK_TOKEN
# Paste: token dari Xendit dashboard

# Firebase Database URL
wrangler secret put FIREBASE_DATABASE_URL
# Paste: https://argamada-ac6cc-asia-southeast1.firebasedatabase.app
```

### 4. Deploy Worker

```bash
wrangler publish
```

Expected output:
```
✨ Success! Uploaded xendit-worker
🌎 https://xendit-worker.YOUR-SUBDOMAIN.workers.dev
```

### 5. Test Worker

```bash
curl https://xendit-worker.YOUR-SUBDOMAIN.workers.dev/health
# Expected: {"status":"ok","service":"xendit-payment-gateway"}
```

---

## 🧪 Step 5: Test Payment Flow

### Test Mode Credentials

Xendit provides test payment methods:

**Test QRIS:**
- Use Xendit mobile app in test mode
- Or use simulator: https://simulator.xendit.co/

**Test Virtual Account:**
- Bank: BCA
- VA Number: Will be generated
- Pay via simulator

**Test E-Wallet:**
- OVO: Use `081234567890`
- Dana: Use `081234567890`
- LinkAja: Use `081234567890`

### Testing Flow

1. **Open**: `subscribe.html` in browser
2. **Fill**: AI Name → Click "Lanjut ke Pembayaran"
3. **Choose**: Payment method (QRIS/VA/E-Wallet)
4. **Get**: Payment URL from Xendit
5. **Pay**: Using test credentials
6. **Wait**: Webhook will auto-approve
7. **Redirect**: To `dashboard.html` automatically

### Expected Results

✅ **After Payment Success:**
- Subscription status: `pending` → `active`
- User redirected to dashboard
- Firebase updated with:
  - `paidAt`: timestamp
  - `approvedAt`: timestamp
  - `approvedBy`: "xendit-auto"
  - `xenditInvoiceId`: invoice ID
  - `paymentMethod`: "QRIS" / "VIRTUAL_ACCOUNT" / "OVO"

---

## 🔒 Security Best Practices

### 1. API Key Security

❌ **NEVER** expose API key in frontend:
```javascript
// ❌ BAD - API key visible!
const apiKey = 'xnd_development_xxx';
fetch('https://api.xendit.co/v2/invoices', {
  headers: { Authorization: `Basic ${btoa(apiKey + ':')}` }
});
```

✅ **ALWAYS** use backend (Cloudflare Worker):
```javascript
// ✅ GOOD - API key hidden in worker
fetch('https://xendit-worker.YOUR-SUBDOMAIN.workers.dev/create-invoice', {
  method: 'POST',
  body: JSON.stringify({ userId, aiName, email })
});
```

### 2. Webhook Verification

Always verify webhook signature:
```javascript
const xenditWebhookToken = 'your-webhook-token';
const receivedToken = request.headers.get('X-CALLBACK-TOKEN');

if (receivedToken !== xenditWebhookToken) {
  return new Response('Unauthorized', { status: 401 });
}
```

### 3. Firebase Rules

Prevent users from manually changing subscription:
```json
"subscriptions": {
  "$userId": {
    ".write": "root.child('adminSettings/admins/' + auth.uid).exists()"
    // Only admin can write, Xendit via Firebase Admin SDK too
  }
}
```

---

## 📊 Step 6: Monitor Payments

### Xendit Dashboard

**Transaction List:**
https://dashboard.xendit.co/transactions

View:
- All invoices (paid, pending, expired)
- Payment method used
- Amount received
- Settlement status

**Reports:**
https://dashboard.xendit.co/reports

Download:
- Daily transaction reports
- Settlement reports
- Invoice reports

### Firebase Database

Check subscription updates:
```
/subscriptions/{userId}
  ├─ status: "active"
  ├─ xenditInvoiceId: "64b8f9..."
  ├─ paymentMethod: "QRIS"
  ├─ paidAt: 1738819200000
  └─ approvedAt: 1738819200000
```

### Cloudflare Worker Logs

```bash
wrangler tail
```

Real-time logs:
- Invoice creation
- Webhook received
- Firebase updates
- Errors

---

## 💰 Pricing & Fees

### Xendit Fees (as of 2024)

**QRIS:**
- Fee: 0.7% per transaction
- Example: Rp 25,000 → Fee: Rp 175
- You receive: Rp 24,825

**Virtual Account:**
- Fee: Rp 4,000 flat per transaction
- Example: Rp 25,000 → Fee: Rp 4,000
- You receive: Rp 21,000

**E-Wallet:**
- OVO: 2% per transaction
- Dana: 2% per transaction
- LinkAja: 2% per transaction
- Example: Rp 25,000 → Fee: Rp 500
- You receive: Rp 24,500

**Settlement:**
- T+1 (next business day) ke rekening bank Anda

### Recommended Pricing Strategy

Jika subscription fee: **Rp 25,000**

**Option 1: Absorb fees (simplest)**
- User bayar: Rp 25,000
- You receive: Rp 24,325 - Rp 21,000 (depends on method)
- You absorb payment gateway fee

**Option 2: Pass fees to customer**
- QRIS: User bayar Rp 25,200 (includes 0.7% fee)
- VA: User bayar Rp 29,000 (includes Rp 4,000 fee)
- E-Wallet: User bayar Rp 25,500 (includes 2% fee)

**Option 3: Increase base price**
- Subscription: Rp 30,000
- Covers all payment methods comfortably

---

## 🚨 Troubleshooting

### Issue: Invoice creation fails

**Error:** `401 Unauthorized`

**Solution:**
```bash
# Check API key
wrangler secret put XENDIT_API_KEY
# Make sure format: xnd_development_xxx atau xnd_production_xxx
```

### Issue: Webhook not received

**Checklist:**
- ✅ Worker deployed? `wrangler publish`
- ✅ Webhook URL correct? Check Xendit dashboard
- ✅ Webhook token set? `wrangler secret put XENDIT_WEBHOOK_TOKEN`
- ✅ Test with simulator first

**Debug:**
```bash
# Check worker logs
wrangler tail

# Test webhook manually
curl -X POST https://xendit-worker.YOUR-SUBDOMAIN.workers.dev/webhook \
  -H "Content-Type: application/json" \
  -H "X-CALLBACK-TOKEN: your-webhook-token" \
  -d '{"id":"test","status":"PAID","external_id":"test-user-id"}'
```

### Issue: Payment success but not approved

**Check:**
1. Webhook received? Check worker logs
2. Firebase rules allow write? Check database.rules.json
3. userId in external_id correct? Check invoice creation

**Manual fix:**
```javascript
// In Firebase Console
/subscriptions/{userId}
  status: "active"
  approvedAt: Date.now()
  approvedBy: "manual-admin"
```

### Issue: Test payment not working

**Solution:**
- Make sure using **Test Mode** in Xendit dashboard
- Use test credentials from: https://docs.xendit.co/testing/test-scenarios
- Check worker uses test API key: `xnd_development_xxx`

---

## 📚 Additional Resources

**Xendit Docs:**
- API Reference: https://developers.xendit.co/api-reference/
- Invoice API: https://developers.xendit.co/api-reference/#create-invoice
- Webhooks: https://developers.xendit.co/api-reference/#webhooks
- Test Scenarios: https://docs.xendit.co/testing/test-scenarios

**Cloudflare Workers:**
- Docs: https://developers.cloudflare.com/workers/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/

**Support:**
- Xendit Support: support@xendit.co
- Xendit Slack: https://xendit-community.slack.com/

---

## ✅ Deployment Checklist

Before going live:

- [ ] Xendit account verified (KTP uploaded)
- [ ] Production API key obtained
- [ ] Webhook URL configured (Live mode)
- [ ] Cloudflare Worker deployed
- [ ] Worker secrets set (production keys)
- [ ] Payment flow tested end-to-end
- [ ] Firebase rules deployed
- [ ] subscribe.html updated with worker URL
- [ ] Test dengan real payment (Rp 1,000 test)
- [ ] Monitor first few real transactions

---

## 🎉 Success Indicators

You'll know it's working when:
- ✅ User creates invoice → Gets Xendit payment URL
- ✅ User pays → Webhook received in worker logs
- ✅ Subscription auto-approved (no manual admin action)
- ✅ User redirected to dashboard
- ✅ Money settled to your bank account (T+1)

---

**Next Steps:**
1. Follow Step 1-2 to get Xendit API key
2. Run `firebaseeploy --only database` (deploy rules)
3. Deploy Cloudflare Worker (Step 4)
4. Update subscribe.html with worker URL
5. Test payment flow!

🚀 **Ready to accept payments automatically!**
