# Plugin WordPress - MeerAI Chatbot

Plugin WordPress untuk mudah memasang chatbot MeerAI di website WordPress.

## 📥 Download Plugin

File plugin: **`meeraid-chatbot.zip`** (7 KB)

## 🚀 Cara Install

### Langkah 1: Install Plugin

1. Login ke **WordPress Admin**
2. Buka **Plugins → Add New**
3. Klik tombol **Upload Plugin**
4. Pilih file **`meeraid-chatbot.zip`**
5. Klik **Install Now**
6. Klik **Activate Plugin**

### Langkah 2: Konfigurasi Plugin

1. Di sidebar WordPress Admin, klik **MeerAI Chatbot**
2. Masukkan **User ID** Anda:
   - Login ke [Dashboard MeerAI](https://meeraid.vercel.app/dashboard.html)
   - Buka tab **Embed**
   - Copy User ID Anda
   - Paste ke field "User ID MeerAI"

3. Pilih dimana chatbot akan tampil:
   - **Semua Halaman**: Chatbot tampil di seluruh website
   - **Halaman Tertentu**: Pilih halaman spesifik (bisa lebih dari satu)
   - **Nonaktif**: Matikan sementara

4. Klik **Simpan Pengaturan**

## ✨ Fitur Plugin

### 1. Tampilkan di Semua Halaman
```
☑️ Semua Halaman
```
Chatbot akan muncul di setiap halaman website Anda.

### 2. Pilih Halaman Tertentu
```
☑️ Halaman Tertentu
   ☑️ Home
   ☑️ About Us
   ☑️ Contact
   ☑️ Products
   ☐ Blog
```
Chatbot hanya muncul di halaman yang dicentang. Anda bisa memilih **lebih dari satu halaman**.

### 3. Nonaktifkan Sementara
```
☑️ Nonaktif
```
Chatbot tidak akan tampil, tapi settings tetap tersimpan.

## 🎨 Customisasi Tampilan

Untuk mengatur warna, posisi, logo, dll:

1. Login ke [Dashboard MeerAI](https://meeraid.vercel.app/dashboard.html)
2. Buka tab **Pengaturan**
3. Atur:
   - Nama AI
   - Logo
   - Warna widget
   - Posisi (bottom-right, bottom-left, dll)
   - Pesan welcome
   - Model AI
   - Temperature, max tokens, dll

Perubahan akan otomatis tersinkronisasi ke WordPress Anda.

## 📋 Contoh Konfigurasi

### Konfigurasi 1: Support di Semua Halaman
**Use Case**: Toko online yang ingin customer support di semua area
```
User ID: abc123xyz...
Tampilkan di: Semua Halaman
```

### Konfigurasi 2: FAQ di Halaman Tertentu
**Use Case**: Website perusahaan yang hanya ingin chatbot di area penjualan
```
User ID: abc123xyz...
Tampilkan di: Halaman Tertentu
  ✓ Home
  ✓ Products
  ✓ Pricing
  ✓ Contact
```

### Konfigurasi 3: Testing Mode
**Use Case**: Sedang setup, belum mau live
```
User ID: abc123xyz...
Tampilkan di: Nonaktif
(Settings tersimpan, tinggal aktifkan nanti)
```

## 🔧 Troubleshooting

### ❌ Chatbot tidak muncul

**Cek 1: User ID sudah benar?**
- Login ke Dashboard MeerAI
- Tab Embed → Copy ulang User ID
- Paste ke plugin settings

**Cek 2: Setting sudah disimpan?**
- Klik "Simpan Pengaturan"
- Lihat notifikasi hijau "Pengaturan berhasil disimpan!"

**Cek 3: Tidak memilih "Nonaktif"?**
- Pastikan pilih "Semua Halaman" atau "Halaman Tertentu"

**Cek 4: Halaman sudah dipilih?** (jika "Halaman Tertentu")
- Centang minimal 1 halaman

**Cek 5: Cache browser**
- Buka dalam mode Incognito/Private
- Atau clear cache browser
- Atau clear cache plugin WordPress (jika pakai cache plugin)

### ⚠️ Chatbot muncul di halaman yang salah

Cek pengaturan "Tampilkan Chatbot di":
- Jika "Semua Halaman" → chatbot akan muncul dimana-mana
- Jika "Halaman Tertentu" → cek centang hanya di halaman yang diinginkan

## 📝 Technical Details

### Plugin Info
- **Version**: 1.0.0
- **Requires PHP**: 7.0+
- **Requires WordPress**: 5.0+
- **Size**: ~7 KB
- **License**: GPL v2+

### File Structure
```
meeraid-chatbot/
├── meeraid-chatbot.php  (Main plugin file)
├── admin-style.css      (Admin panel styling)
├── admin-script.js      (Admin panel JavaScript)
└── README.md            (Documentation)
```

### Widget Script Injection
Plugin akan inject script ini ke footer halaman yang dipilih:
```html
<script src="https://meeraid.vercel.app/chatbot-widget.js" data-user-id="YOUR_USER_ID"></script>
```

### Database Options
Plugin menyimpan 3 options di WordPress database:
- `meeraid_user_id`: User ID Anda
- `meeraid_page_selection`: 'all' | 'specific' | 'none'
- `meeraid_selected_pages`: Array of page IDs

## 🔄 Update Plugin

Jika ada versi baru:
1. Download `meeraid-chatbot.zip` versi baru
2. **Deactivate** plugin lama
3. **Delete** plugin lama
4. Install versi baru (settings akan tetap tersimpan)
5. **Activate** plugin baru

## 🗑️ Uninstall Plugin

Jika ingin hapus plugin:
1. **Deactivate** plugin
2. **Delete** plugin
3. Semua settings akan otomatis terhapus dari database

## 💡 Tips Penggunaan

### Tip 1: Testing Sebelum Live
```
1. Install & konfigurasi plugin
2. Set "Nonaktif"
3. Test chatbot di Dashboard MeerAI dulu
4. Kalau sudah oke, ubah ke "Semua Halaman"
```

### Tip 2: Gradual Rollout
```
Week 1: Aktifkan di halaman Contact dulu
Week 2: Tambah halaman Products
Week 3: Aktifkan di semua halaman
```

### Tip 3: Seasonal Campaign
```
- Black Friday: Aktifkan di semua halaman
- Normal days: Hanya di halaman Products & Contact
```

## 📞 Support

- **Website**: [https://meeraid.vercel.app](https://meeraid.vercel.app)
- **Dashboard**: [https://meeraid.vercel.app/dashboard.html](https://meeraid.vercel.app/dashboard.html)

## 🆕 What's Next?

Fitur yang akan datang:
- [ ] Support untuk Custom Post Types
- [ ] Exclude pages (pilih halaman yang TIDAK mau tampil)
- [ ] Conditional display (berdasarkan logged in user, dll)
- [ ] A/B testing support
- [ ] Analytics integration

## ⭐ Feedback

Punya saran atau masalah? Hubungi kami di Dashboard MeerAI!
