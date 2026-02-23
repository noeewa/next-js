# 🔒 Panduan Keamanan Firebase - UGM Chatbot

## 📋 Daftar Isi
1. [Penjelasan Keamanan](#penjelasan-keamanan)
2. [Setup Firebase Security Rules](#setup-firebase-security-rules)
3. [Konfigurasi Domain Whitelist](#konfigurasi-domain-whitelist)
4. [Enkripsi API Keys](#enkripsi-api-keys)
5. [Rate Limiting](#rate-limiting)
6. [Monitoring & Audit Log](#monitoring--audit-log)
7. [Best Practices](#best-practices)

---

## 🛡️ Penjelasan Keamanan

### Mengapa Firebase Config Terlihat di Source Code Itu AMAN?

**PENTING:** Firebase dirancang untuk aplikasi client-side, jadi config Firebase yang terlihat di browser **BUKAN masalah keamanan**. Yang penting adalah **Firebase Security Rules** di server!

### Layer Keamanan yang Diterapkan:

1. **Firebase Security Rules** (Layer 1 - PALING PENTING)
   - Validasi di level server/database
   - Mengontrol siapa bisa read/write data
   - Mengecek autentikasi admin token

2. **Domain Whitelist** (Layer 2)
   - Membatasi akses hanya dari domain terdaftar
   - Admin token terikat dengan domain tertentu
   - Log semua akses dari domain tidak dikenal

3. **Rate Limiting** (Layer 3)
   - Mencegah spam/abuse
   - Block otomatis setelah 100 requests/menit
   - Tracking per browser fingerprint

4. **Enkripsi Data Sensitif** (Layer 4)
   - API keys dienkrip sebelum disimpan
   - Dekripsi hanya di memory client
   - Simple XOR cipher untuk obfuscation

5. **Audit Logging** (Layer 5)
   - Log semua aksi penting (login, CRUD knowledge)
   - Tracking domain asal request
   - Review aktivitas mencurigakan

---

## ⚙️ Setup Firebase Security Rules

### Langkah 1: Upload Rules ke Firebase Console

1. **Buka Firebase Console**
   - Go to: https://console.firebase.google.com/
   - Pilih project Anda: `argamada-ac6cc`

2. **Navigasi ke Realtime Database Rules**
   ```
   Firebase Console → Realtime Database → Rules (tab)
   ```

3. **Copy-Paste Rules dari File**
   - Buka file: `firebase-security-rules.json`
   - Copy SELURUH isi file
   - Paste ke Firebase Rules editor
   - Klik **"Publish"**

4. **Verifikasi Rules**
   - Klik tab "Data" di Realtime Database
   - Coba akses `settings` → Harus bisa READ (publik)
   - Coba akses `knowledge` → Harus bisa READ (publik)
   - Coba WRITE tanpa auth → Harus DITOLAK ❌

### Langkah 2: Struktur Rules yang Diterapkan

```json
{
  "rules": {
    // ✅ Settings - PUBLIC read, ADMIN write
    "settings": {
      ".read": true,
      ".write": "auth != null && root.child('adminTokens').child(auth.token).exists()"
    },
    
    // ✅ Knowledge - PUBLIC read, ADMIN write + validation
    "knowledge": {
      ".read": true,
      "$docId": {
        ".write": "auth != null && root.child('adminTokens').child(auth.token).exists()",
        ".validate": "newData.hasChildren(['title', 'content', 'timestamp'])"
      }
    },
    
    // 🔒 Admin Tokens - Self-managed
    "adminTokens": {
      ".read": false,
      "$tokenId": {
        ".read": "auth != null && auth.token == $tokenId",
        ".write": "!data.exists() || (auth != null && auth.token == $tokenId)",
        ".validate": "newData.child('expires').val() > now"
      }
    }
  }
}
```

### Penjelasan Rules:

- **`.read: true`** → Semua orang bisa baca settings & knowledge (untuk chat bot)
- **`.write: "auth != null && ..."`** → HANYA admin dengan valid token yang bisa edit
- **`.validate`** → Validasi format data (mencegah data corrupt)
- **`adminTokens` protected** → Hanya pemilik token yang bisa akses token-nya sendiri

---

## 🌐 Konfigurasi Domain Whitelist

### Langkah 1: Update Domain di Code

Edit file: `js/security.js`

```javascript
CONFIG: {
    ALLOWED_DOMAINS: [
        'localhost',
        '127.0.0.1',
        // 👇 TAMBAHKAN DOMAIN PRODUCTION ANDA
        'chatbot.ugm.ac.id',           // Domain utama
        'ugm-chatbot.netlify.app',     // Netlify
        'ugm-chatbot.vercel.app'       // Vercel
    ],
    // ...
}
```

### Langkah 2: Tambah Domain via Firebase (Dynamic)

**Via Firebase Console:**
1. Go to Firebase Console → Realtime Database → Data
2. Buat node baru: `allowedDomains`
3. Tambahkan child untuk setiap domain:
   ```
   allowedDomains/
       localhost: true
       chatbot.ugm.ac.id: true
       ugm-chatbot.netlify.app: true
   ```

**Via Code (Settings Panel):**
- Fitur ini bisa ditambahkan di `settings.html` jika diperlukan

### Langkah 3: Test Domain Validation

```javascript
// Di browser console:
await Security.isAllowedDomain()
// ✅ Should return true jika domain diizinkan
// ❌ Should return false jika domain tidak terdaftar
```

---

## 🔐 Enkripsi API Keys

### Cara Kerja:

1. **Saat Menyimpan API Key** (di Settings):
   ```javascript
   // Original API key
   const apiKey = 'gsk_xxxxxxxxxxxxx';
   
   // Dienkrip sebelum disimpan
   const encrypted = Security.encrypt(apiKey);
   // Result: 'SGVsbG8gV29ybGQh...' (base64 + XOR cipher)
   
   // Disimpan ke Firebase
   await database.ref('settings/apiKey').set(encrypted);
   ```

2. **Saat Membaca API Key** (untuk Groq API):
   ```javascript
   // Baca dari Firebase (encrypted)
   const encrypted = await database.ref('settings/apiKey').once('value');
   
   // Dekripsi di memory
   const apiKey = Security.decrypt(encrypted.val());
   
   // Gunakan untuk API call
   ```

### Level Keamanan:

- ⚠️ **Bukan enkripsi militer-grade** (ini obfuscation)
- ✅ **Cukup untuk mencegah casual copying**
- ✅ **Tidak ada plain-text API key di Firebase**
- ✅ **Dekripsi hanya di memory, tidak di localStorage**

### Upgrade ke Enkripsi Lebih Kuat (Optional):

Gunakan library seperti **CryptoJS** untuk AES-256:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
```

```javascript
// Enkripsi AES-256
const encrypted = CryptoJS.AES.encrypt(apiKey, SECRET_KEY).toString();

// Dekripsi
const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
```

---

## ⏱️ Rate Limiting

### Cara Kerja:

1. **Per Browser Fingerprint:**
   ```javascript
   // Setiap request dicek rate limit-nya
   const rateCheck = await Security.checkRateLimit();
   
   if (!rateCheck.allowed) {
       // 🚫 Blocked - terlalu banyak request
       throw new Error(`Tunggu ${rateCheck.remainingBlockTime} detik`);
   }
   ```

2. **Konfigurasi Default:**
   ```javascript
   RATE_LIMIT: {
       MAX_REQUESTS: 100,        // Max 100 requests
       WINDOW_MS: 60000,         // Per 1 menit
       BLOCK_DURATION_MS: 300000 // Block 5 menit jika exceeded
   }
   ```

3. **Firebase Structure:**
   ```
   rateLimits/
       abc123xyz: {
           count: 45,
           timestamp: 1643723456789,
           blocked: false
       }
   ```

### Customize Rate Limits:

Edit `js/security.js`:

```javascript
RATE_LIMIT: {
    MAX_REQUESTS: 200,        // 👈 Ubah limit
    WINDOW_MS: 120000,        // 👈 2 menit window
    BLOCK_DURATION_MS: 600000 // 👈 10 menit block
}
```

---

## 📊 Monitoring & Audit Log

### Akses Audit Logs:

**Via Firebase Console:**
1. Go to: Realtime Database → Data → `auditLog`
2. Lihat semua events yang ter-log

**Via Code (Browser Console):**
```javascript
// Get 50 latest audit logs
const logs = await Security.getAuditLogs(50);
console.table(logs);
```

### Events yang Di-log:

| Event | Deskripsi | Data |
|-------|-----------|------|
| `page_load` | User buka halaman | page path |
| `admin_login` | Admin login sukses | domain |
| `admin_logout` | Admin logout | truncated token |
| `rate_limit_exceeded` | User kena rate limit | identifier |
| `rate_limit_error` | Error di rate limiter | error message |
| `token_domain_mismatch` | Token dipakai di domain lain | both domains |

### Contoh Log Entry:

```json
{
  "id": "1643723456789_abc123",
  "action": "admin_login",
  "timestamp": 1643723456789,
  "domain": "localhost",
  "origin": "http://localhost:5500",
  "data": {
    "domain": "localhost"
  }
}
```

### Monitoring Aktivitas Mencurigakan:

**Indicator Anomali:**
- ❌ `token_domain_mismatch` - Token dicuri & dipakai di domain lain
- ❌ Banyak `rate_limit_exceeded` - Possible DDoS attempt
- ❌ `admin_login` dari domain tidak dikenal
- ❌ Banyak `page_load` dalam waktu singkat - Bot activity

---

## 🏆 Best Practices

### 1. **Ganti Password Admin**

Edit file: `js/auth.js` & `js/security.js`

```javascript
// ⚠️ GANTI INI!
ADMIN_PASSWORD: 'ugm2025'  // 👈 Ubah ke password kuat

// Dan di security.js:
const correctPassword = 'ugm2025'; // 👈 Ubah juga di sini
```

**Password yang Baik:**
- Minimal 12 karakter
- Kombinasi huruf, angka, simbol
- Tidak mudah ditebak
- Contoh: `UGM_Ch4tb0t!2025#Secure`

### 2. **Restrict Firebase API Key** (Firebase Console)

1. Go to: Firebase Console → Project Settings → General
2. Scroll ke "Web API Key"
3. Klik "Manage" → Go to Google Cloud Console
4. Set **Application restrictions**:
   - HTTP referrers (web sites)
   - Add: `chatbot.ugm.ac.id/*`
   - Add: `localhost:*/*` (untuk development)

5. Set **API restrictions**:
   - Pilih: Firebase Realtime Database API
   - Jangan centang yang tidak perlu

### 3. **Enable Firebase App Check** (Advanced)

Firebase App Check = ReCAPTCHA untuk API calls

1. Go to: Firebase Console → App Check
2. Register app untuk App Check
3. Pilih provider: reCAPTCHA v3
4. Enforce untuk Realtime Database

**Note:** Ini advanced feature, bisa bikin setup lebih ribet

### 4. **HTTPS Only untuk Production**

Pastikan domain production pakai **HTTPS**:
- ✅ `https://chatbot.ugm.ac.id`
- ❌ `http://chatbot.ugm.ac.id`

Kenapa? HTTP bisa di-sniff, HTTPS encrypted.

### 5. **Regular Security Audit**

**Setiap Minggu:**
- Check audit logs untuk aktivitas aneh
- Review rate limit logs
- Check jumlah admin tokens aktif

**Setiap Bulan:**
- Rotate admin password
- Review Firebase rules
- Update dependencies

**Query untuk Audit:**
```javascript
// Check active admin tokens
const tokens = await database.ref('adminTokens').once('value');
console.log('Active tokens:', tokens.numChildren());

// Check rate limit violations
const rateLimits = await database.ref('rateLimits').once('value');
let blocked = 0;
rateLimits.forEach(child => {
    if (child.val().blocked) blocked++;
});
console.log('Blocked users:', blocked);
```

### 6. **Backup Data Rutin**

**Export Knowledge Base:**
1. Firebase Console → Realtime Database → ⋮ menu
2. Export JSON
3. Save securely (encrypted backup)

**Atau via code:**
```javascript
async function backupKnowledge() {
    const snapshot = await database.ref('knowledge').once('value');
    const data = JSON.stringify(snapshot.val(), null, 2);
    
    // Download as file
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knowledge-backup-${Date.now()}.json`;
    a.click();
}
```

### 7. **Environment Variables untuk API Keys** (Next Level)

Untuk production yang lebih serius, pisahkan config:

```javascript
// config.dev.js (untuk development)
const config = {
    firebase: { /* dev config */ },
    security: {
        allowedDomains: ['localhost']
    }
};

// config.prod.js (untuk production)
const config = {
    firebase: { /* prod config */ },
    security: {
        allowedDomains: ['chatbot.ugm.ac.id']
    }
};
```

Build tool (webpack/vite) bisa inject config sesuai environment.

---

## 🚀 Deployment Checklist

Sebelum deploy ke production:

- [ ] ✅ Firebase Security Rules sudah di-publish
- [ ] ✅ Admin password sudah diganti dari default
- [ ] ✅ Domain whitelist sudah diupdate dengan domain production
- [ ] ✅ Firebase API key sudah di-restrict ke domain production
- [ ] ✅ HTTPS enabled di domain production
- [ ] ✅ API keys untuk Groq sudah dienkrip
- [ ] ✅ Rate limiting sudah ditest
- [ ] ✅ Audit logging sudah jalan
- [ ] ✅ Backup knowledge base sudah dibuat
- [ ] ✅ Test akses dari domain tidak dikenal (harus blocked)
- [ ] ✅ Test login dengan password salah (harus rejected)

---

## 🆘 Troubleshooting

### Problem: "Domain tidak diizinkan"

**Solusi:**
1. Check `js/security.js` → `ALLOWED_DOMAINS`
2. Check Firebase `allowedDomains` node
3. Pastikan hostname EXACT match (case-sensitive)

### Problem: "Unauthorized: Invalid or expired token"

**Solusi:**
1. Logout dan login ulang
2. Check Firebase Rules sudah di-publish
3. Check `adminTokens` node di Firebase

### Problem: "Terlalu banyak percobaan login"

**Solusi:**
1. Tunggu 5 menit (block duration)
2. Atau hapus entry di `rateLimits` via Firebase Console
3. Adjust rate limit settings jika terlalu ketat

### Problem: Data validation failed

**Solusi:**
1. Check format data (title, content, timestamp required)
2. Check length constraints (title: 3-200, content: 10-50000)
3. Check Firebase Rules → validate section

---

## 📚 Resources

**Firebase Security:**
- https://firebase.google.com/docs/rules
- https://firebase.google.com/docs/database/security

**Web Security Best Practices:**
- https://owasp.org/www-project-web-security-testing-guide/

**Rate Limiting Patterns:**
- https://cloud.google.com/architecture/rate-limiting-strategies-techniques

---

## 📝 Summary

**Keamanan yang Diterapkan:**

1. ✅ **Firebase Security Rules** - Server-side validation
2. ✅ **Domain Whitelist** - Restrict akses per domain
3. ✅ **Admin Token System** - Secure authentication
4. ✅ **Rate Limiting** - Prevent abuse
5. ✅ **Data Encryption** - API keys encrypted
6. ✅ **Input Sanitization** - XSS protection
7. ✅ **Audit Logging** - Track all activities
8. ✅ **Data Validation** - Format & length checks

**Level Keamanan:** 🔒🔒🔒🔒 (4/5)

Cocok untuk **production deployment** dengan traffic moderate. Untuk enterprise-level, pertimbangkan:
- Firebase App Check
- Backend API dengan authentication
- Database encryption at rest
- DDoS protection (Cloudflare)

---

*Dibuat untuk UGM Chatbot Security Implementation*  
*Last Updated: 2026-02-05*
