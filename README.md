# SIBERMU — Struktur & Panduan Edit

## Isi folder

```text
sibermu/
├── index.html   # Isi dan struktur halaman
├── style.css    # Warna, layout, ukuran, responsive
├── script.js    # Interaksi dan animasi
└── README.md    # Panduan ini
```

## Urutan kerja yang disarankan

### 1. Mengubah tulisan
Buka `index.html`.

Cari pembatas:

- `01. NAVBAR`
- `02. HERO`
- `03. INTRO`
- `04. KEMAHASISWAAN`
- `05. AKTIVITAS MAHASISWA`
- `06. AIK`
- `07. HIGHLIGHT`
- `08. INFORMASI UTAMA`
- `09. TENTANG & KREDIT`
- `10. FOOTER`

### 2. Mengubah warna
Buka `style.css`.

Warna utama yang paling sering digunakan:

- `#1766d9` = biru utama
- `#0e4b91` = biru gelap section
- `#0e2d58` = footer
- `#f5f9ff` = latar biru muda
- `#ffffff` = putih

Jika ingin mengganti identitas warna seluruh website, mulai dari warna-warna tersebut.

### 3. Menambah card

Cari contoh:

```html
<article class="info-card">
```

Copy satu `<article>` lengkap sampai `</article>`, kemudian ubah:

- nomor
- ikon
- judul
- deskripsi
- teks link

Jangan mengubah `class="info-card"` jika ingin tampilannya tetap sama.

### 4. Menambah section baru

Letakkan section baru **sebelum**:

```html
</main>
```

Gunakan pola:

```html
<!-- =====================================================
     11. SECTION BARU
     ===================================================== -->
<section class="section">
  ...
</section>
```

Jika membutuhkan desain khusus, tambahkan class baru di `style.css`.

### 5. Menambah fitur JavaScript

Tambahkan di `script.js` sebagai blok baru:

```javascript
/* =========================================================
   11. NAMA FITUR BARU
   ========================================================= */
```

Dengan cara ini fitur baru tidak tercampur dengan fitur lama.

## Hal yang jangan dilakukan

- Jangan memasukkan CSS panjang ke dalam `index.html`.
- Jangan memasukkan JavaScript panjang ke dalam `index.html`.
- Jangan menghapus class HTML tanpa mengecek CSS.
- Jangan mengubah nama file `style.css` atau `script.js` tanpa mengubah pemanggilannya.
- Jangan memasukkan data resmi organisasi/AIK sebelum sumbernya jelas.

## Pengembangan berikutnya

Struktur ini sengaja dibuat agar nantinya mudah ditambah:

- menu mobile / hamburger
- modal detail kegiatan
- slider kegiatan
- galeri foto
- daftar organisasi
- daftar UKM
- prestasi mahasiswa
- agenda AIK
- pencarian informasi
- filter kegiatan
- dark mode
- integrasi Firebase/API jika memang diperlukan

**Prinsip utama:** HTML untuk konten, CSS untuk tampilan, JavaScript untuk perilaku.
