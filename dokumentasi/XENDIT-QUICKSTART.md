# 🚀 Xendit Integration - Quick Start Guide

Panduan cepat deploy Xendit payment gateway untuk platform Anda.

## ✅ Prerequisites Checklist

Before starting, make sure you have:
- [ ] Akun Xendit (register di https://dashboard.xendit.co/register)
- [ ] Cloudflare account (free tier OK)
- [ ] Node.js installed (untuk Wrangler CLI)
- [ ] Firebase rules sudah deployed
- [ ] Git Bash atau PowerShell

---

## 📝 Step-by-Step Deployment (30 Minutes)

### 1️⃣ Setup Xendit Account (10 min)

```bash
# 1. Register di Xendit
https://dashboard.xendit.co/register

# 2. Verify email

# 3. Get TEST API Key
# Dashboard → Settings → API Keys → Generate secret key
# Mode: TEST (toggle di kanan atas)
# Copy: xnd_development_xxxxxxxxxxxxx
```

**Save API key** somewhere safe!

---

### 2️⃣ Install Wrangler & Deploy Worker (10 min)

```powershell
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login
# Browser akan terbuka → Allow akses

# 3. Navigate to project folder
cd d:\ugm-chatbot

# 4. Deploy worker
wrangler publish

# Output will show:
# ✨ Success! Uploaded xendit-worker
# 🌎 https://xendit-worker.YOUR-SUBDOMAIN.workers.dev
```

**Copy worker URL!** You'll need it.

---

### 3️⃣ Set Environment Variables (5 min)

```powershell
# Still in d:\ugm-chatbot folder

# 1. Set Xendit API Key
wrangler secret put XENDIT_API_KEY
# When prompted, paste: xnd_development_xxxxxxxxxxxxx

# 2. Set Webhook Token (temporary, will update later)
wrangler secret put XENDIT_WEBHOOK_TOKEN
# Paste any random string for now: temp-token-123

# 3. Set Firebase URL
wrangler secret put FIREBASE_DATABASE_URL
# Paste: https://argamada-ac6cc-asia-southeast1.firebasedatabase.app
```

---

### 4️⃣ Setup Xendit Webhook (5 min)

```bash
# 1. Go to Xendit Dashboard
https://dashboard.xendit.co/settings/webhooks

# 2. Click "+ Add Webhook"

# 3. Fill form:
Type: Invoice Paid
URL: https://xendit-worker.YOUR-SUBDOMAIN.workers.dev/webhook
Environment: Test

# 4. Copy Verification Token that appears

# 5. Update worker secret:
wrangler secret put XENDIT_WEBHOOK_TOKEN
# Paste the verification token from step 4
```

---

### 5️⃣ Update subscribe.html (2 min)

```powershell
# Open: d:\ugm-chatbot\subscribe.html
# Find line: const XENDIT_WORKER_URL = 'https://xendit-worker.YOUR-SUBDOMAIN.workers.dev';
# Replace YOUR-SUBDOMAIN with your actual worker URL
```

Example:
```javascript
// ❌ Before:
const XENDIT_WORKER_URL = 'https://xendit-worker.YOUR-SUBDOMAIN.workers.dev';

// ✅ After:
const XENDIT_WORKER_URL = 'https://xendit-worker.meera-chatbot.workers.dev';
```

Save file!

---

### 6️⃣ Deploy Firebase Rules (1 min)

```powershell
# If not deployed yet:
cd d:\ugm-chatbot
firebase deploy --only database
```

---

### 7️⃣ Test End-to-End (5 min)

```bash
# 1. Test worker health
curl https://xendit-worker.YOUR-SUBDOMAIN.workers.dev/health
# Should return: {"status":"ok","service":"xendit-payment-gateway"}

# 2. Open subscribe.html in browser
start chrome d:\ugm-chatbot\subscribe.html

# 3. Fill form and create invoice

# 4. You should see Xendit payment page with multiple payment options

# 5. Pay using test credentials:
# - QRIS: Use Xendit simulator (https://simulator.xendit.co/)
# - Or choose Virtual Account BCA → Pay in simulator

# 6. After payment success, should auto-redirect to dashboard!
```

---

## 🧪 Test Xendit Payments

### Method 1: Xendit Simulator (Recommended)

```
1. Create invoice di subscribe.html
2. Open simulator: https://simulator.xendit.co/
3. Login dengan Xendit test account
4. Find your invoice → Click "Pay"
5. Wait 3-5 seconds → Auto approved!
```

### Method 2: Test Virtual Account

```
Payment method: Virtual Account BCA
VA Number: Will be generated in invoice
Pay via: Xendit simulator or Xendit mobile app (test mode)
```

### Method 3: Test E-Wallet

```
Choose: OVO / Dana / LinkAja
Phone: 081234567890 (test number)
Complete payment in Xendit simulator
```

---

## 🔍 Verify Success

After successful payment:

✅ **Check 1: Browser Console**
```
Should see redirect to dashboard.html
No errors in console
```

✅ **Check 2: Firebase Database**
```
Go to: Firebase Console → Realtime Database → Data
Path: /subscriptions/{userId}
Check:
  status: "active" ✅
  approvedBy: "xendit-auto" ✅
  paidAt: [timestamp] ✅
  xenditInvoiceId: "64b8f9..." ✅
```

✅ **Check 3: Cloudflare Worker Logs**
```powershell
wrangler tail
# Should show:
# Webhook received: {...}
# ✅ Auto-approved subscription for user: xxx
# Firebase updated for user: xxx
```

✅ **Check 4: Xendit Dashboard**
```
https://dashboard.xendit.co/transactions
Status: PAID ✅
Amount: Rp 25,000
```

---

## 🚨 Common Issues & Fixes

### Issue 1: "Failed to create invoice"

**Possible causes:**
- API key salah atau expired
- Worker belum deployed
- CORS error

**Fix:**
```powershell
# Check API key
wrangler secret put XENDIT_API_KEY
# Paste API key lagi

# Test worker
curl https://xendit-worker.YOUR-SUBDOMAIN.workers.dev/health

# Check browser console for detailed error
```

---

### Issue 2: "Payment success but not approved"

**Possible causes:**
- Webhook token salah
- Webhook URL tidak diset di Xendit
- Firebase rules block write

**Fix:**
```powershell
# 1. Check webhook configured
https://dashboard.xendit.co/settings/webhooks

# 2. Check worker logs
wrangler tail
# Look for "Webhook received" messages

# 3. Manual approve via Firebase Console
/subscriptions/{userId}
  status: "active"
  approvedAt: [current timestamp]
  approvedBy: "manual-fix"
```

---

### Issue 3: "Worker URL not found"

**Possible causes:**
- Worker belum deployed
- URL salah di subscribe.html

**Fix:**
```powershell
# Deploy worker
wrangler publish

# Copy URL dari output
# Update subscribe.html dengan URL yang benar
```

---

### Issue 4: "Invoice expired immediately"

**Possible causes:**
- Clock skew
- Test mode issue

**Fix:**
```javascript
// Check invoice_duration in xendit-worker.js
invoice_duration: 86400, // 24 hours = OK

// Or regenerate invoice (click "Coba Lagi")
```

---

## 📊 Monitor & Maintenance

### Daily Checks

```bash
# 1. Check Cloudflare Worker analytics
https://dash.cloudflare.com → Workers → xendit-worker → Analytics

# 2. Check Xendit transactions
https://dashboard.xendit.co/transactions

# 3. Check Firebase for pending subscriptions
Firebase Console → Database → subscriptions
Filter: status == "pending"
```

### Weekly Tasks

```bash
# 1. Review failed payments
Xendit Dashboard → Transactions → Filter: Failed

# 2. Check worker error rate
Cloudflare Dashboard → Worker analytics

# 3. Clean up expired invoices (optional)
# Xendit auto-cleans after 24h
```

---

## 🎓 Next Steps

### Move to Production

When ready for real payments:

```bash
# 1. Get Production API Key
Xendit Dashboard → Switch to LIVE mode → Get API key

# 2. Update worker secret
wrangler secret put XENDIT_API_KEY
# Paste: xnd_production_xxxxxxxxxxxxx

# 3. Update webhook to Live mode
Xendit Dashboard → Webhooks → Edit → Environment: Live

# 4. Test with small amount first (Rp 1,000)

# 5. Go live! 🚀
```

### Add Features

- Email notifications (SendGrid/Mailgun)
- Invoice history page
- Refund handling
- Multiple pricing tiers
- Discount codes

---

## 📞 Support

**Xendit Support:**
- Email: support@xendit.co
- Docs: https://developers.xendit.co/
- Status: https://status.xendit.co/

**Cloudflare Support:**
- Docs: https://developers.cloudflare.com/workers/
- Community: https://community.cloudflare.com/

---

## ✅ Final Checklist

Before going live:

- [ ] Xendit account verified (production)
- [ ] Production API key obtained
- [ ] Worker deployed successfully
- [ ] Worker secrets set (production keys)
- [ ] Webhook configured (Live mode)
- [ ] subscribe.html updated with worker URL
- [ ] Firebase rules deployed
- [ ] End-to-end test successful
- [ ] Payment tested with real Rp 1,000
- [ ] Dashboard redirect works
- [ ] Monitoring setup

---

**Expected Timeline:**
- Setup: 30 minutes
- Testing: 15 minutes
- Production: 15 minutes
- **Total: ~1 hour** ⚡

🎉 **Done! Your payment gateway is live!**
