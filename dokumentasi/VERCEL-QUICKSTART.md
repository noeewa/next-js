# 🚀 Quick Deploy to Vercel

**Zero installation needed! Deploy via browser only.**

## ⚡ 5-Minute Setup

### 1️⃣ Get Xendit API Key (2 min)

```
1. Register: https://dashboard.xendit.co/register
2. Verify email
3. Switch to TEST mode (top-right toggle)
4. Settings → API Keys → Generate
5. Copy: xnd_development_xxxxxxxxx
```

### 2️⃣ Push to GitHub (1 min)

```
1. Go to your GitHub repo
2. Upload these new files:
   - api/create-invoice.js
   - api/xendit-webhook.js
   - api/health.js
   - vercel.json
   - .gitignore
3. Commit: "Add Xendit Vercel integration"
```

### 3️⃣ Deploy to Vercel (2 min)

```
1. Visit: https://vercel.com
2. Sign up with GitHub
3. Import your repo
4. Add Environment Variables:
   
   XENDIT_API_KEY = xnd_development_xxxxxxxxx
   XENDIT_WEBHOOK_TOKEN = temp-token-123
   FIREBASE_DATABASE_URL = https://argamada-ac6cc-asia-southeast1.firebasedatabase.app

5. Click Deploy
6. Wait ~1 minute
7. Done! Copy your URL: https://your-project.vercel.app
```

### 4️⃣ Setup Webhook (1 min)

```
1. Xendit Dashboard → Settings → Webhooks → Add
2. URL: https://your-project.vercel.app/api/xendit-webhook
3. Type: Invoice Paid
4. Environment: Test
5. Create → Copy verification token
6. Vercel → Settings → Environment Variables
   → Edit XENDIT_WEBHOOK_TOKEN → Paste token → Save
7. Redeploy
```

### 5️⃣ Test! (2 min)

```
1. Visit: https://your-project.vercel.app
2. Subscribe → Create invoice
3. Pay with simulator: https://simulator.xendit.co/
4. Auto-approved! 🎉
```

---

## 📚 Full Documentation

See [VERCEL-XENDIT-SETUP.md](VERCEL-XENDIT-SETUP.md) for:
- Detailed instructions
- Troubleshooting
- Production deployment
- Monitoring & analytics

---

## ✅ What You Get

- ✅ Auto-payment (QRIS, VA, E-Wallet)
- ✅ Auto-approval (no manual work)
- ✅ Auto-deploy on push
- ✅ Free hosting (Vercel)
- ✅ Zero installation!

**Total Time:** 8 minutes ⚡  
**Cost:** $0 (free tier) 💰

---

## 🆘 Need Help?

**Common Issues:**

**"Failed to create invoice"**
→ Check Vercel logs → Verify `XENDIT_API_KEY`

**"Payment not approved"**
→ Check webhook URL → Update `XENDIT_WEBHOOK_TOKEN`

**"404 on /api/xxx"**
→ Check `api/` folder pushed to GitHub → Redeploy

---

**Ready to launch! 🚀**
