# Panduan Setup SociaBuzz Payment Gateway

## 📋 Prerequisites
- Akun SociaBuzz Creator (daftar di https://sociabuzz.com)
- Firebase Project (sudah ada)
- Vercel Account ATAU Cloudflare Workers Account

---

## 🔧 Step 1: Setup SociaBuzz

### 1.1 Daftar/Login ke SociaBuzz
1. Buka https://sociabuzz.com
2. Login atau daftar sebagai creator
3. Verifikasi akun Anda

### 1.2 Dapatkan Username SociaBuzz
1. Setelah login, cek profile Anda
2. Username Anda adalah bagian dari URL: `https://sociabuzz.com/{username}`
3. Catat username ini (contoh: `johndoe`)

### 1.3 Setup Webhook Token
1. Login ke SociaBuzz Dashboard
2. Buka menu **Settings** → **Webhook**
3. Generate webhook token baru
4. **SIMPAN TOKEN INI** - Anda akan memerlukannya nanti

### 1.4 Configure Webhook URL
1. Di halaman Webhook Settings SociaBuzz
2. Masukkan webhook URL:
   - Jika pakai **Vercel**: `https://your-domain.vercel.app/api/xendit-webhook`
   - Jika pakai **Cloudflare**: `https://your-worker.workers.dev/webhook`
3. Save settings

---

## 🔥 Step 2: Update Frontend Configuration

### 2.1 Edit subscribe.html
Buka file `subscribe.html` dan ubah baris ini:

```javascript
// Line ~75 - Ganti dengan username SociaBuzz Anda
const SOCIABUZZ_USERNAME = 'johndoe'; // ⚠️ GANTI INI!
```

**Contoh:**
```javascript
const SOCIABUZZ_USERNAME = 'ugmchatbot'; // Username SociaBuzz Anda
```

---

## ☁️ Step 3A: Deploy ke Vercel (Pilihan 1)

### 3.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 3.2 Login ke Vercel
```bash
vercel login
```

### 3.3 Deploy Project
```bash
cd d:\ugm-chatbot
vercel
```

### 3.4 Set Environment Variables
```bash
vercel env add SOCIABUZZ_WEBHOOK_TOKEN
# Paste token SociaBuzz Anda ketika diminta

vercel env add FIREBASE_DATABASE_URL
# Masukkan: https://your-project.firebasedatabase.app
```

### 3.5 Redeploy
```bash
vercel --prod
```

---

## 🌐 Step 3B: Deploy ke Cloudflare Workers (Pilihan 2)

### 3.1 Install Wrangler CLI
```bash
npm install -g wrangler
```

### 3.2 Login ke Cloudflare
```bash
wrangler login
```

### 3.3 Set Secrets
```bash
cd d:\ugm-chatbot

wrangler secret put SOCIABUZZ_WEBHOOK_TOKEN
# Paste token SociaBuzz Anda

wrangler secret put FIREBASE_DATABASE_URL
# Masukkan: https://your-project.firebasedatabase.app
```

### 3.4 Deploy Worker
```bash
wrangler deploy
```

Catat URL worker Anda (contoh: `https://sociabuzz-worker.your-subdomain.workers.dev`)

---

## 🔐 Step 4: Update Firebase Database Rules

Deploy Firebase rules yang sudah diupdate:

```bash
firebase deploy --only database
```

Atau manual di Firebase Console:
1. Buka Firebase Console → Realtime Database → Rules
2. Copy isi dari `database.rules.json`
3. Paste dan Publish

---

## ✅ Step 5: Testing

### 5.1 Test Subscription Flow
1. Buka `subscribe.html` di browser
2. Login dengan akun test
3. Masukkan nama AI chatbot
4. Klik "Lanjutkan ke Pembayaran"
5. **PENTING**: Copy Reference Code (User ID) yang muncul
6. Akan redirect ke halaman SociaBuzz donation

### 5.2 Test Payment
1. Di halaman SociaBuzz donation
2. Masukkan nominal donasi (minimal Rp 25,000)
3. **⚠️ PENTING**: Di kolom "Message", paste Reference Code (User ID) Anda
4. Selesaikan pembayaran

### 5.3 Test Webhook
1. Setelah pembayaran berhasil, SociaBuzz akan mengirim webhook
2. Cek Firebase Database → `subscriptions/{userId}`
3. Harusnya muncul field:
   - `paymentVerified: true`
   - `status: "pending"` (menunggu approval admin)
   - `sociabuzzDonationId`, `supporterName`, `supporterEmail`, dll

### 5.4 Admin Approval
1. Login sebagai admin
2. Buka `admin-dashboard.html`
3. Lihat pending subscriptions
4. Approve subscription → status berubah jadi `active`

---

## 🔍 Troubleshooting

### Webhook Tidak Jalan
1. **Cek webhook URL di SociaBuzz Dashboard**
   - Pastikan URL benar
   - Pastikan tidak ada typo

2. **Cek webhook token**
   ```bash
   # Vercel
   vercel env ls
   
   # Cloudflare
   wrangler secret list
   ```

3. **Test webhook manual dengan curl:**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/xendit-webhook \
     -H "Content-Type: application/json" \
     -H "X-Sociabuzz-Webhook-Token: YOUR_TOKEN" \
     -d '{
       "id": "test123",
       "amount_raw": 25000,
       "supporter_name": "Test User",
       "supporter_email": "test@example.com",
       "message": "YOUR_FIREBASE_UID",
       "created_at": "2026-02-12T10:00:00Z"
     }'
   ```

### User ID Tidak Match
- Pastikan user **paste PERSIS** Reference Code mereka di kolom Message
- Tidak boleh ada spasi atau karakter tambahan
- Cek di Firebase: `/subscriptions/{userId}` harus sudah ada (status: pending)

### Payment Verified Tapi Status Masih Pending
- **Ini normal!** Admin harus approve manual
- Login sebagai admin → approve di `admin-dashboard.html`

---

## 📝 Important Notes

### Untuk User
1. **HARUS** paste Reference Code (User ID) di kolom Message waktu donasi
2. Kalau lupa paste, payment tidak akan ter-verify otomatis
3. Setelah bayar, cek status di `waiting-approval.html`

### Untuk Admin
1. Cek pending subscriptions secara berkala
2. Verifikasi `paymentVerified: true` sebelum approve
3. Cek amount dan detail lainnya

### CORS Issues
Jika ada CORS error, pastikan webhook sudah include header token:
- `X-Sociabuzz-Webhook-Token` atau
- `X-Webhook-Token`

---

## 🎯 Quick Reference

### Environment Variables
```bash
# Vercel
SOCIABUZZ_WEBHOOK_TOKEN=your_webhook_token
FIREBASE_DATABASE_URL=https://your-project.firebasedatabase.app

# Cloudflare Workers
SOCIABUZZ_WEBHOOK_TOKEN=your_webhook_token
FIREBASE_DATABASE_URL=https://your-project.firebasedatabase.app
```

### Webhook Endpoints
- Vercel: `/api/xendit-webhook` atau `/api/tripay-callback`
- Cloudflare: `/webhook`

### Database Structure
```json
{
  "subscriptions": {
    "{userId}": {
      "status": "pending",
      "paymentVerified": true,
      "paymentMethod": "sociabuzz",
      "sociabuzzDonationId": "...",
      "supporterName": "...",
      "supporterEmail": "...",
      "paidAmount": 25000,
      "paidAt": 1234567890,
      "aiName": "...",
      "email": "...",
      "price": 25000,
      "subscribedAt": 1234567890
    }
  }
}
```

---

## 🚀 Next Steps

1. Setup SociaBuzz account ✓
2. Update `SOCIABUZZ_USERNAME` di `subscribe.html` ✓
3. Deploy ke Vercel/Cloudflare ✓
4. Configure webhook di SociaBuzz Dashboard ✓
5. Test payment flow ✓
6. Setup admin approval flow ✓

**Selamat! Payment gateway SociaBuzz sudah siap digunakan! 🎉**
