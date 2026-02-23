# 🚀 Xendit + Vercel Setup - Zero Installation!

Complete guide untuk deploy Xendit payment gateway **100% via browser**. No CLI, no installation!

---

## 🎯 Overview

**What You'll Get:**
- ✅ Auto-payment via Xendit (QRIS, VA, E-Wallet)
- ✅ Auto-approval (no manual admin action)
- ✅ Deploy via GitHub push
- ✅ Vercel auto-deploy on every push
- ✅ **Zero installation on your laptop!**

**Tech Stack:**
- Frontend: Vercel (hosting)
- Backend: Vercel Serverless Functions
- Database: Firebase Realtime Database
- Payment: Xendit

**Time Required:** ~20 minutes ⚡

---

## 📋 Prerequisites

- [x] Akun GitHub (free)
- [x] Akun Vercel (free)
- [x] Akun Xendit (free/test mode)
- [x] Code already di GitHub

---

## 🚀 Step 1: Register Xendit (5 min)

### 1.1 Create Account

Visit: https://dashboar d.xendit.co/register

- Email: Use real email
- Business Name: Nama bisnis Anda
- Country: Indonesia
- Phone: Nomor aktif

### 1.2 Verify Email

Check inbox → Click verification link

### 1.3 Get API Key

1. Login: https://dashboard.xendit.co/
2. Top-right toggle → Switch to **TEST** mode
3. Go to: **Settings** → **API Keys**
4. Click: **Generate secret key**
5. **Copy** the key: `xnd_development_xxxxxxxxxxxxxxxx`

**⚠️ IMPORTANT:** Save this key somewhere safe! You'll need it in Step 3.

---

## 📂 Step 2: Push Code to GitHub (2 min)

### 2.1 Verify Files

Make sure these files exist in your repo:
```
your-repo/
├── api/
│   ├── create-invoice.js     ✅ (just created)
│   ├── xendit-webhook.js     ✅ (just created)
│   └── health.js             ✅ (just created)
├── index.html
├── subscribe.html             ✅ (updated with auto-detect)
├── dashboard.html
├── ... (other files)
└── database.rules.json
```

### 2.2 Commit & Push

**Via GitHub Web UI (no Git needed):**

1. Go to your repo on GitHub: `https://github.com/YOUR-USERNAME/YOUR-REPO`
2. Click **"Add file"** → **"Upload files"**
3. Drag & drop the **`api`** folder
4. Scroll down → Add commit message: `Add Xendit Serverless Functions`
5. Click **"Commit changes"**

**Or via Git (if you have it):**
```bash
git add api/
git add subscribe.html
git commit -m "Add Xendit payment integration"
git push origin main
```

---

## ☁️ Step 3: Deploy to Vercel (8 min)

### 3.1 Connect GitHub to Vercel

1. Visit: https://vercel.com/
2. Click: **"Sign Up"** (or Login if you have account)
3. Choose: **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### 3.2 Import Project

1. On Vercel Dashboard, click: **"Add New..."** → **"Project"**
2. Find your repo: `ugm-chatbot` (or whatever your repo name is)
3. Click: **"Import"**

### 3.3 Configure Project

**Framework Preset:** Select **"Other"** (karena static HTML)

**Root Directory:** `.` (leave default)

**Build Settings:**
- Build Command: (leave empty)
- Output Directory: `.` (leave default)
- Install Command: (leave empty)

### 3.4 Add Environment Variables

**IMPORTANT:** Before clicking "Deploy", add these environment variables:

Click **"Environment Variables"** section → Add 3 variables:

**Variable 1:**
```
Name: XENDIT_API_KEY
Value: xnd_development_xxxxxxxxxxxxxxxx
```
(Paste API key dari Step 1.3)

**Variable 2:**
```
Name: XENDIT_WEBHOOK_TOKEN
Value: temp-token-12345
```
(Temporary, akan diupdate nanti)

**Variable 3:**
```
Name: FIREBASE_DATABASE_URL
Value: https://argamada-ac6cc-asia-southeast1.firebasedatabase.app
```

### 3.5 Deploy!

Click: **"Deploy"**

Wait ~1-2 minutes...

✅ **Deployment Successful!**

Your site is now live at: `https://your-project.vercel.app`

**Copy this URL!** You'll need it.

---

## 🔗 Step 4: Setup Xendit Webhook (5 min)

### 4.1 Create Webhook

1. Go to: https://dashboard.xendit.co/settings/webhooks
2. Click: **"+ Add Webhook"**
3. Fill form:
   - **Type:** Invoice Paid
   - **URL:** `https://your-project.vercel.app/api/xendit-webhook`
     - Replace `your-project.vercel.app` with your Vercel URL
   - **Environment:** Test
4. Click: **"Create"**

### 4.2 Get Verification Token

After creating webhook, you'll see a **"Verification Token"**

**Copy this token!**

Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4.3 Update Environment Variable

1. Go back to Vercel Dashboard: https://vercel.com/dashboard
2. Click your project
3. Go to: **"Settings"** → **"Environment Variables"**
4. Find: `XENDIT_WEBHOOK_TOKEN`
5. Click: **"Edit"**
6. **Replace** `temp-token-12345` with the verification token from 4.2
7. Click: **"Save"**
8. **Important:** Click **"Redeploy"** to apply new environment variable

---

## 🔥 Step 5: Deploy Firebase Rules (1 min)

**Only if not deployed yet:**

### Option A: Via Firebase Console (Web UI)

1. Go to: https://console.firebase.google.com/project/argamada-ac6cc/database/rules
2. Copy content dari `database.rules.json`
3. Paste to the editor
4. Click: **"Publish"**

### Option B: Via CLI (if you have it)

```bash
firebase deploy --only database
```

---

## 🧪 Step 6: Test Payment Flow (5 min)

### 6.1 Open Your Site

Visit: `https://your-project.vercel.app`

### 6.2 Test Subscribe

1. Click: **"Mulai Gratis"** or navigate to `subscribe.html`
2. Login dengan Google/Email
3. Fill **AI Name**: `Test Bot`
4. Click: **"Lanjut ke Pembayaran"**

Should see: **"✅ Invoice Berhasil Dibuat"**

### 6.3 Test Payment

1. Click: **"🚀 Bayar Sekarang"**
2. You'll be redirected to Xendit payment page
3. Choose payment method (e.g., QRIS)

### 6.4 Pay with Simulator

**For QRIS:**
1. Open: https://simulator.xendit.co/
2. Login with your Xendit test account
3. Find your invoice
4. Click: **"Pay"**

**For Virtual Account:**
1. Choose: Bank BCA (or any bank)
2. Copy VA number
3. Go to simulator: https://simulator.xendit.co/
4. Select: Virtual Account → BCA
5. Enter VA number → Pay

### 6.5 Verify Success

After payment:
- ✅ Should see: Loading → "Menunggu Approval"
- ✅ Wait 3-5 seconds → Auto-redirect to Dashboard
- ✅ Dashboard loads successfully!

**Check Firebase:**
1. Go to: Firebase Console → Database → Data
2. Navigate to: `/subscriptions/{your-uid}`
3. Should see:
   ```
   status: "active" ✅
   approvedBy: "xendit-auto" ✅
   paidAt: [timestamp] ✅
   xenditInvoiceId: "xxx" ✅
   ```

---

## ✅ Verification Checklist

Make sure everything works:

- [ ] Vercel deployment successful
- [ ] Environment variables set (3 variables)
- [ ] Webhook configured in Xendit
- [ ] Firebase rules deployed
- [ ] Can access: `https://your-project.vercel.app/api/health`
  - Should return: `{"status":"ok","service":"xendit-payment-gateway","platform":"vercel"}`
- [ ] Subscribe flow works (invoice created)
- [ ] Payment page opens
- [ ] Payment success → Auto-approved
- [ ] Redirected to dashboard

---

## 🔍 Troubleshooting

### Issue 1: "Failed to create invoice"

**Check:**
1. Vercel logs: Project → Deployments → Click latest → View Function Logs
2. Look for errors in `/api/create-invoice`

**Fix:**
```
Vercel Dashboard → Settings → Environment Variables
→ Verify XENDIT_API_KEY is correct
→ Should start with: xnd_development_
```

### Issue 2: Payment success but not approved

**Check:**
1. Webhook configured? https://dashboard.xendit.co/settings/webhooks
2. Webhook URL correct? Should be: `https://your-project.vercel.app/api/xendit-webhook`
3. Token correct? Check `XENDIT_WEBHOOK_TOKEN` in Vercel

**Debug:**
```
Vercel → Project → Deployments → View Function Logs
→ Look for "/api/xendit-webhook" logs
→ Should see: "Webhook received" and "Auto-approved subscription"
```

**Manual Fix:**
Go to Firebase Console → Database → Data → `/subscriptions/{userId}`
```json
{
  "status": "active",
  "approvedAt": 1738819200000,
  "approvedBy": "manual-fix"
}
```

### Issue 3: "404 Not Found" on API calls

**Possible causes:**
- `api/` folder not pushed to GitHub
- Vercel not detecting serverless functions

**Fix:**
1. Check GitHub repo: `api/create-invoice.js` exists?
2. Vercel Dashboard → Project → Settings → Functions
   - Should show: `/api/create-invoice`, `/api/xendit-webhook`, `/api/health`
3. If not showing → Redeploy:
   - Deployments → Click latest → "⋯" → Redeploy

### Issue 4: CORS errors

**Fix:**
Already handled in code! But if still occurs:

Add `vercel.json` in root:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
      ]
    }
  ]
}
```

Push to GitHub → Vercel auto-redeploys.

---

## 📊 Monitor Your Setup

### Vercel Analytics

**Deployment Logs:**
```
Vercel Dashboard → Your Project → Deployments
→ Click any deployment → View Function Logs
```

**Real-time Logs:**
```
Vercel Dashboard → Your Project → Functions
→ See all API calls in real-time
```

### Xendit Dashboard

**Transactions:**
https://dashboard.xendit.co/transactions

- View all invoices (paid, pending, expired)
- Check payment methods used
- See settlement status

**Webhook Logs:**
https://dashboard.xendit.co/settings/webhooks
- Click your webhook → View logs
- See all webhook calls & responses

### Firebase Database

**Monitor subscriptions:**
```
Firebase Console → Database → Data
→ /subscriptions
→ Filter by: status == "pending" or "active"
```

---

## 🚀 Going to Production

When ready for real payments:

### 1. Get Production Xendit API Key

```
Xendit Dashboard → Top-right toggle → Switch to LIVE mode
→ Settings → API Keys → Generate secret key
→ Copy: xnd_production_xxxxxxxxxxxxxxxx
```

### 2. Update Environment Variables

```
Vercel Dashboard → Settings → Environment Variables
→ Edit XENDIT_API_KEY
→ Replace with: xnd_production_xxxxxxxxxxxxxxxx
→ Save → Redeploy
```

### 3. Update Webhook to Live Mode

```
Xendit Dashboard → Settings → Webhooks
→ Click your webhook → Edit
→ Environment: Change from "Test" to "Live"
→ Save
```

### 4. Test with Small Amount

Before going live, test with real money (Rp 1,000):

1. Create subscription
2. Pay Rp 1,000 with real payment
3. Verify auto-approval works
4. Check money received in Xendit balance

### 5. Go Live! 🎉

Update your pricing if needed, then launch!

---

## 💰 Cost Breakdown

### Vercel (Free Tier)

- ✅ Hosting: Free
- ✅ Serverless Functions: 100,000 invocations/month (free)
- ✅ Bandwidth: 100GB/month (free)
- ✅ Auto-deploy on push: Free

**Sufficient for:** ~3,000 payments/month ✅

### Xendit Fees

**QRIS:** 0.7%
- Rp 25,000 → Fee: Rp 175 → You get: Rp 24,825

**Virtual Account:** Rp 4,000 flat
- Rp 25,000 → Fee: Rp 4,000 → You get: Rp 21,000

**E-Wallet:** 2%
- Rp 25,000 → Fee: Rp 500 → You get: Rp 24,500

### Firebase (Free Tier)

- ✅ Database: 1GB storage (free)
- ✅ Reads: 10GB/month (free)
- ✅ Writes: 10GB/month (free)

**Sufficient for:** ~10,000 users ✅

---

## 🎓 Next Steps

### Enhancements

1. **Email Notifications**
   - Add SendGrid/Resend API
   - Send email on payment success

2. **Invoice History**
   - Create page to view past invoices
   - Download receipts

3. **Multiple Plans**
   - Add Basic/Pro/Enterprise tiers
   - Different pricing

4. **Discount Codes**
   - Implement promo codes
   - Referral system

5. **Analytics**
   - Vercel Analytics
   - Google Analytics
   - Revenue tracking

---

## 📚 Resources

**Vercel Docs:**
- Serverless Functions: https://vercel.com/docs/functions
- Environment Variables: https://vercel.com/docs/environment-variables
- Deployments: https://vercel.com/docs/deployments

**Xendit Docs:**
- API Reference: https://developers.xendit.co/api-reference/
- Invoice API: https://developers.xendit.co/api-reference/#create-invoice
- Webhooks: https://developers.xendit.co/api-reference/#webhooks
- Test Simulator: https://simulator.xendit.co/

**Firebase:**
- Realtime Database: https://firebase.google.com/docs/database
- Security Rules: https://firebase.google.com/docs/database/security

---

## ✅ Final Checklist

Before launching:

- [ ] Code pushed to GitHub
- [ ] Vercel connected to GitHub
- [ ] All 3 environment variables set
- [ ] Xendit webhook configured (Test mode)
- [ ] Firebase rules deployed
- [ ] Test payment successful
- [ ] Auto-approval working
- [ ] Dashboard loads after payment
- [ ] Verified in Firebase Database
- [ ] Ready for production (optional)

---

## 🎉 Success!

You now have:
- ✅ Automatic payment processing via Xendit
- ✅ Multiple payment methods (QRIS/VA/E-Wallet)
- ✅ Auto-approval (no manual admin work)
- ✅ Auto-deploy on every GitHub push
- ✅ **Zero installation on your laptop!**

**Total Setup Time:** ~20 minutes ⚡

**Cost:** $0 (free tier sufficient for MVP) 💰

**Next:** Test thoroughly → Go to production → Start getting customers! 🚀

---

## 📞 Support

**Vercel Support:**
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

**Xendit Support:**
- Email: support@xendit.co
- Docs: https://developers.xendit.co/
- Status: https://status.xendit.co/

**Need Help?**
- Check Vercel function logs
- Check Xendit webhook logs
- Check Firebase Database
- All errors are logged!

---

**Happy Coding! 🚀**

*Deployment tanpa install apapun di laptop - powered by Vercel + Xendit!*
