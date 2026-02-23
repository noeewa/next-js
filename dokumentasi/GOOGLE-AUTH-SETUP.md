# Setup Google OAuth - Firebase Console

## 🔐 Cara Mengaktifkan Google Sign-In

### Step 1: Buka Firebase Console
1. Buka https://console.firebase.google.com
2. Pilih project **argamada-ac6cc**
3. Klik menu **Authentication** di sidebar kiri

### Step 2: Enable Google Sign-In Provider
1. Klik tab **Sign-in method**
2. Di bagian **Sign-in providers**, cari **Google**
3. Klik **Google** untuk expand
4. Toggle **Enable** menjadi ON (biru)
5. **Project support email**: Pilih email Anda dari dropdown
6. Klik **Save**

### Step 3: Whitelist Domain (Untuk Deployment)
1. Masih di **Authentication** > **Settings**
2. Scroll ke bagian **Authorized domains**
3. Pastikan **localhost** sudah ada (untuk development)
4. Nanti saat deploy, tambahkan domain production Anda:
   - Klik **Add domain**
   - Masukkan: `yourdomain.com`
   - Klik **Add**

### Step 4: Test Google Sign-In
1. Buka **index.html** di browser
2. Klik **Mulai Gratis** atau **Masuk**
3. Klik tombol **Lanjutkan dengan Google**
4. Pilih akun Google Anda
5. Seharusnya langsung masuk dan redirect ke halaman berikutnya

## ✅ Verifikasi Setup Berhasil

Google Sign-In berhasil jika:
- ✅ Tombol Google tidak error
- ✅ Popup window Google muncul
- ✅ Setelah pilih akun, redirect ke subscribe.html (jika belum langganan)
- ✅ User data tersimpan di Firebase Database > users/{userId}

## 🐛 Troubleshooting

### Error: "This app is not authorized to use Firebase Authentication"
**Solusi:** 
- Pastikan Google provider sudah di-enable di Firebase Console
- Clear browser cache dan coba lagi

### Error: "Unauthorized domain"
**Solusi:**
- Tambahkan domain Anda di **Authorized domains**
- Untuk localhost: pastikan `localhost` dan `127.0.0.1` ada di list

### Error: "Popup closed by user"
**Solusi:**
- User menutup popup sebelum login selesai
- Coba lagi dengan tidak menutup popup

### Email/Password Sign-In Not Working?
Email/Password sudah otomatis enabled dan tidak perlu setup tambahan!

## 📝 Notes

- **Google OAuth sudah terintegrasi** di code (login.html)
- **Email/Password** juga sudah ready to use
- Untuk production, pastikan domain production sudah di-whitelist
- Google Sign-In menggunakan popup, bukan redirect (lebih smooth UX)

## 🚀 Next Steps After Setup

1. ✅ Test Google login di localhost
2. ✅ Test email/password registration
3. ✅ Cek apakah user data tersimpan di Firebase Database
4. ✅ Test full flow: login → subscribe → waiting approval → active

---

**IMPORTANT:** Jangan lupa **Enable Google provider** di Firebase Console sebelum test! 🔥
