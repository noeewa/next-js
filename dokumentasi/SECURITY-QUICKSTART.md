# 🚀 Quick Start - Firebase Security Setup

## ⚡ Setup Cepat (5 Menit)

### 1️⃣ Upload Firebase Security Rules

```bash
# 1. Buka Firebase Console
https://console.firebase.google.com/

# 2. Pilih project: argamada-ac6cc

# 3. Go to: Realtime Database → Rules

# 4. Copy-paste isi file: firebase-security-rules.json

# 5. Klik "Publish"
```

### 2️⃣ Update Domain Whitelist

Edit [js/security.js](js/security.js) line 15-20:

```javascript
ALLOWED_DOMAINS: [
    'localhost',
    '127.0.0.1',
    'chatbot.ugm.ac.id',        // 👈 Tambahkan domain production
    'ugm-chatbot.netlify.app'   // 👈 Tambahkan domain deployment
],
```

### 3️⃣ Ganti Admin Password

Edit [js/auth.js](js/auth.js) line 5:

```javascript
ADMIN_PASSWORD: 'ugm2025',  // 👈 GANTI INI!
```

Edit [js/security.js](js/security.js) line 141:

```javascript
const correctPassword = 'ugm2025'; // 👈 GANTI INI JUGA!
```

### 4️⃣ Test Security

```javascript
// Buka browser console di localhost

// Test 1: Check domain
await Security.isAllowedDomain()
// ✅ Harus return: true

// Test 2: Check rate limit
await Security.checkRateLimit()
// ✅ Harus return: { allowed: true, remaining: 99 }

// Test 3: Login
await Auth.login('password_baru')
// ✅ Harus return: token string
```

### 5️⃣ Verify Firebase Rules

```bash
# Test di Firebase Console → Realtime Database → Data

# Test READ (harus bisa):
- Buka node: settings ✅
- Buka node: knowledge ✅

# Test WRITE tanpa auth (harus gagal):
- Coba add data ke settings ❌
- Coba add data ke knowledge ❌
```

---

## 🔐 Fitur Keamanan yang Aktif

### ✅ Firebase Security Rules
- Read public, Write admin only
- Data validation (title, content, timestamp)
- Token expiration check

### ✅ Domain Whitelist
- Hanya domain terdaftar yang bisa akses
- Admin token terikat dengan domain
- Log akses dari domain asing

### ✅ Rate Limiting
- Max 100 requests/menit per user
- Auto-block 5 menit jika exceeded
- Tracking per browser fingerprint

### ✅ Enkripsi Data
- API keys dienkrip sebelum save
- Dekripsi hanya di memory
- XOR cipher + base64 encoding

### ✅ Audit Logging
- Log semua admin actions
- Track login/logout
- Monitor rate limit violations

### ✅ Input Validation
- Sanitize HTML/script injection
- Validate data structure
- Length constraints enforcement

---

## 🛡️ Security Checklist

Sebelum deploy ke production:

```
□ Firebase Rules sudah di-publish
□ Admin password sudah diganti
□ Domain whitelist sudah diupdate
□ Test login/logout berhasil
□ Test rate limiting berfungsi
□ API keys sudah dienkrip
□ Audit log sudah jalan
□ Backup knowledge base dibuat
```

---

## 📖 Dokumentasi Lengkap

Lihat: [SECURITY-GUIDE.md](SECURITY-GUIDE.md)

---

## 🆘 Need Help?

**Error Messages:**

| Error | Solusi |
|-------|--------|
| "Domain tidak diizinkan" | Update `ALLOWED_DOMAINS` di security.js |
| "Invalid or expired token" | Logout & login ulang |
| "Terlalu banyak percobaan" | Tunggu 5 menit atau clear rate limit |
| "Validation failed" | Check format data (title/content length) |

**Quick Fixes:**

```javascript
// Clear rate limit (browser console)
await database.ref('rateLimits').remove()

// Clear all admin tokens (reset auth)
await database.ref('adminTokens').remove()

// Clear audit log (cleanup)
await database.ref('auditLog').remove()
```

---

*Sistem keamanan berlapis untuk melindungi Firebase dari akses tidak sah*
