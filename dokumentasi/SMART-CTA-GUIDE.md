# 🧠 Smart CTA System - Panduan Lengkap

## 📋 Apa yang Berubah?

### ❌ Sistem Lama (Annoying):
- CTA muncul **di SETIAP pesan** → monoton & annoying
- Selalu push form → tidak natural
- Variasi tidak efektif → AI tetap monoton
- Percakapan terasa sales-y

### ✅ Sistem Baru (Professional):
- **Smart CTA**: AI selalu tutup percakapan dengan pertanyaan balik natural
- **No Dead-End**: Tidak ada percakapan yang "berhenti gantung"
- **Context-Aware**: CTA disesuaikan dengan konteks percakapan
- **Natural Flow**: Percakapan terasa profesional seperti customer service asli

---

## 🎯 3 Mode CTA Baru

### 1. 🧠 Smart CTA (Recommended)
**Konsep**: AI otomatis buat follow-up question yang relevan dengan konteks.

**Contoh Percakapan**:
```
User: "Buka jam berapa?"
Bot: "Kami buka jam 09.00-17.00, Kak. Mau reservasi tempat sekarang atau lihat menu dulu?"

User: "Harga produk X berapa?"
Bot: "Harganya Rp 150.000. Ada paket bundling juga nih, lebih hemat! Mau lihat paket lainnya?"

User: "Lokasi di mana?"
Bot: "Kami di Jl. Malioboro No. 123, Yogyakarta. Mau petunjuk arah atau cek ketersediaan kursi dulu?"
```

**Kapan Pakai**: 
- Untuk chatbot customer service umum
- Chatbot yang fokus engagement & conversation flow
- Tidak punya formulir spesifik yang harus diisi

**Setting**:
- Mode: Smart CTA
- Follow-up Examples (opsional): Isi dengan contoh pertanyaan jika ingin AI ikuti style tertentu
- Variasi: ✅ Aktifkan (recommended)

---

### 2. 📋 Form CTA
**Konsep**: Sesekali (tidak setiap pesan) ajak user isi formulir, hanya saat **relevan**.

**Contoh Percakapan**:
```
User: "Mau daftar kursus"
Bot: "Oke! Kursus apa yang diminati? Kita punya Web Dev, Mobile Dev, sama Data Science."

User: "Web Dev"
Bot: "Mantap! Web Development cocok banget buat yang mau jadi Full-Stack Developer. Mau lihat detail kurikulum atau langsung daftar? Ada formulir pendaftaran di tombol 📋 sebelah chat box ya!"

User: "Biaya berapa?"
Bot: "Biaya untuk Web Dev Rp 2.500.000 untuk 3 bulan. Sudah include project portfolio! Ada pertanyaan lain atau mau langsung daftar?"
```

**Kapan Pakai**:
- Punya formulir pendaftaran/pemesanan yang spesifik
- User perlu submit data untuk proses lanjutan
- Lead generation (capture email, phone, dll)

**Setting**:
- Mode: Form CTA
- Pilih Formulir: Pilih form yang mau ditampilkan
- Pesan Ajakan: "Yuk isi formulir pendaftaran untuk info lengkap!"
- Variasi: ✅ Aktifkan (recommended)

**Catatan**: Form TIDAK akan muncul setiap pesan. Hanya saat:
- User menunjukkan interest (misal: "mau daftar", "tertarik", "gimana caranya")
- Percakapan sudah cukup panjang (butuh capture lead)
- AI menilai user siap untuk next step

---

### 3. ✏️ Custom CTA
**Konsep**: Tulis template CTA sendiri yang akan AI gunakan dengan variasi.

**Contoh Percakapan** (Custom CTA: "Kalau ada pertanyaan lagi, langsung tanya aja ya!"):
```
User: "Jam operasional?"
Bot: "Kami buka Senin-Jumat jam 08.00-21.00. Kalau mau tau lebih lanjut, tanya aja!"

User: "Lokasi?"
Bot: "Lokasinya di Jl. Sudirman No. 45. Ada yang mau ditanyakan lagi?"

User: "Parkir gratis?"
Bot: "Yep, parkir gratis untuk pelanggan! Kalau ada pertanyaan lain, jangan ragu ya!"
```

**Kapan Pakai**:
- Punya style komunikasi brand yang spesifik
- Ingin kontrol penuh atas CTA message
- Template CTA yang harus konsisten (misal: branding requirement)

**Setting**:
- Mode: Custom CTA
- CTA Template: Tulis template yang mau digunakan
- Variasi: ✅ Aktifkan untuk paraphrase natural

---

## 🎨 Cara Setting Smart CTA

### Di Dashboard Admin:

1. **Masuk ke menu Pengaturan**
2. **Scroll ke bagian "Smart CTA (Call-to-Action)"**
3. **Centang "Aktifkan Smart CTA"**
4. **Pilih mode CTA** (Smart / Form / Custom)
5. **Isi setting sesuai mode yang dipilih**:
   - **Smart**: Opsional isi contoh follow-up questions
   - **Form**: Pilih formulir + tulis pesan ajakan
   - **Custom**: Tulis CTA template
6. **Centang "Variasi Natural"** (recommended)
7. **Klik "💾 Simpan CTA"**

### Preview CTA:
Setelah simpan, akan muncul preview warna biru yang menjelaskan mode CTA aktif.

---

## 💡 Best Practices

### ✅ DO:
1. **Aktifkan Variasi**: Biar AI nggak monoton
2. **Pilih mode sesuai kebutuhan**:
   - Engagement focus → Smart CTA
   - Need leads → Form CTA
   - Branding strict → Custom CTA
3. **Test percakapan**: Coba chat di AI Preview untuk lihat hasilnya
4. **Update berkala**: Ubah contoh follow-up jika dirasa kurang pas

### ❌ DON'T:
1. **Jangan isi Custom CTA dengan hard-sell** (misal: "DAFTAR SEKARANG ATAU RUGI!")
2. **Jangan kombinasi mode**: Pilih 1 mode saja
3. **Jangan matikan Variasi** kecuali butuh exact text (misal: legal disclaimer)

---

## 📊 Kapan Pakai Mode Apa?

| Use Case | Mode yang Cocok | Alasan |
|----------|-----------------|--------|
| Customer Service Umum | 🧠 Smart CTA | Fokus engagement, no pressure |
| Lead Generation | 📋 Form CTA | Capture data user yang tertarik |
| Toko Online (Info Produk) | 🧠 Smart CTA | Guide user explore produk |
| Pendaftaran Event/Kursus | 📋 Form CTA | Perlu formulir pendaftaran |
| Chatbot Restoran | 🧠 Smart CTA | Bantu pilih menu, reservasi via chat |
| Customer Support (Ticketing) | 📋 Form CTA | Submit tiket via form |
| General FAQ Bot | 🧠 Smart CTA | Keep conversation alive |
| Brand dengan Style Spesifik | ✏️ Custom CTA | Kontrol penuh branding |

---

## 🔥 Contoh Real-World

### 🏪 **Toko Online (Smart CTA)**
```
User: "Ada sepatu ukuran 42?"
Bot: "Ada dong! Untuk ukuran 42 ready stock. Mau lihat model yang mana? Atau langsung order?"

User: "Berapa harga?"
Bot: "Harganya Rp 350.000, belum ongkir. Ada promo bundling 2 pasang diskon 10% lho! Tertarik?"
```

### 🎓 **Kursus Online (Form CTA)**
```
User: "Program apa aja?"
Bot: "Ada 3 program: (1) Web Dev, (2) Data Science, (3) UI/UX Design. Mau tau detail masing-masing?"

User: "Web Dev detail dong"
Bot: "Web Dev 3 bulan, include HTML/CSS/JS, React, Node.js, dan final project. Harga Rp 2.5jt. Cocok buat yang mau career switch! Mau lihat kurikulum lengkap atau langsung daftar? Ada formulir pendaftaran di tombol 📋 sebelah chat!"
```

### 🍽️ **Restoran (Smart CTA)**
```
User: "Menu rekomendasi?"
Bot: "Bestseller kami Nasi Goreng Spesial (Rp 35k) dan Ayam Bakar Madu (Rp 45k)! Mau order sekarang atau cek menu dessert dulu?"

User: "Bisa delivery?"
Bot: "Bisa banget! Free delivery radius 5km. Mau pesan sekarang atau ada pertanyaan soal menu lainnya?"
```

---

## 🐛 Troubleshooting

### Problem: "AI masih monoton meskipun Variasi aktif"
**Solusi**: 
1. Tambahkan 5-10 contoh follow-up di "Follow-up Examples" (Smart CTA)
2. Pastikan System Prompt tidak bertentangan dengan CTA instruction
3. Coba ubah Mode CTA (misal: Smart → Custom dengan template lebih spesifik)

### Problem: "Form tidak muncul meskipun Form CTA aktif"
**Solusi**:
1. Pastikan Mode = "Form CTA" (bukan Smart atau Custom)
2. Cek Formulir sudah dipilih di dropdown
3. Form hanya muncul saat relevan (tidak setiap pesan by design)
4. Test dengan user interest tinggi (misal: "mau daftar", "gimana caranya")

### Problem: "AI terlalu sering push action"
**Solusi**:
1. Gunakan Smart CTA (bukan Form CTA)
2. Atau pakai Custom CTA dengan soft CTA template
3. Tambahkan di System Prompt: "Jangan terlalu pushy, biarkan user explore santai"

---

## 📝 Migration dari Sistem Lama

**Jika sebelumnya sudah setting CTA lama**:
1. CTA akan otomatis di-convert ke mode "Smart CTA"
2. Pesan CTA lama tidak hilang, bisa dipindah ke Custom CTA jika mau tetap pakai
3. Form yang sudah dipilih tetap tersimpan (bisa switch ke Form CTA mode)

**Recommended Action**:
1. Buka Dashboard → Pengaturan
2. Cek setting CTA yang aktif
3. Pilih mode yang sesuai (Smart recommended untuk most cases)
4. Test di AI Preview
5. Deploy ke widget

---

## 🎯 Kesimpulan

**Smart CTA System** dirancang untuk membuat chatbot Anda terasa lebih **profesional** dan **natural** seperti customer service manusia asli.

**Key Principles**:
✅ No dead-end conversation  
✅ Always engage with follow-up question  
✅ Context-aware CTA  
✅ Natural variation (not robotic)  

**Pilih mode CTA sesuai kebutuhan bisnis**, dan chatbot Anda siap memberikan pengalaman percakapan yang jauh lebih baik! 🚀

---

**Butuh bantuan?** Hubungi support atau cek dokumentasi lainnya di folder project.
