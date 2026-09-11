# SiberMu Connect

Landing page untuk lomba pembuatan landing page SiberMu dengan tema:

- Kemahasiswaan
- Al-Islam dan Kemuhammadiyahan (AIK)

## Struktur Folder

```text
sibermu-connect/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Cara Menjalankan

1. Buka folder proyek.
2. Klik dua kali file `index.html`.
3. Website akan terbuka di browser.

Untuk hasil pengembangan yang lebih nyaman, gunakan Visual Studio Code dan ekstensi Live Server.

## Bagian yang Mudah Diubah

### Mengubah nama website
Buka `index.html`, lalu cari teks:

```html
SiberMu
CONNECT
```

### Mengubah warna utama
Buka `css/style.css`, lalu ubah variabel di bagian paling atas:

```css
:root {
  --primary: #1764d8;
  --primary-dark: #0d3d8f;
}
```

### Mengubah isi kartu
Buka `index.html`, cari bagian:

```html
<section class="feature-section section-padding" id="kemahasiswaan">
```

atau:

```html
<section class="aik-section section-padding" id="aik">
```

### Mengubah kegiatan
Cari bagian:

```html
<div class="activities-grid" id="activitiesGrid">
```

Setiap kartu kegiatan memiliki atribut:

```html
data-category="aik"
```

Pilihan kategori:

- `aik`
- `kemahasiswaan`

### Menambah fitur JavaScript
Tambahkan kode pada `js/script.js`. File tersebut sudah dibagi berdasarkan fungsi agar mudah dikembangkan.

## Catatan

- Konten kegiatan pada template ini adalah contoh dan harus diganti dengan informasi resmi.
- Tautan media sosial pada footer masih menggunakan tanda `#`; ganti dengan tautan resmi.
- Jika menggunakan gambar atau ikon tambahan, cantumkan sumbernya pada bagian kredit halaman.
- Template ini tidak memakai database atau backend. Jika nantinya diperlukan login, formulir, admin, atau data dinamis, backend/Firebase dapat ditambahkan pada tahap berikutnya.
