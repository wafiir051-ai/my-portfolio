# DESIGN.md

Panduan desain untuk portofolio Waffir. Semua keputusan visual di `react-app/` mengacu ke file ini. Kalau ada yang diubah di kode, ubah juga di sini.

## Arah

Meja kerja, bukan brosur. Waffir mengerjakan kode dan hardware sekaligus (React, Flutter, ESP32), jadi halamannya dibaca seperti katalog benda di atas meja: tiap proyek adalah satu objek dengan label yang selalu berformat sama, bukan kartu promosi.

Tiga kata: **gelap, rapat, bergaris**. Warna tema tetap hijau, sama seperti versi statis sebelumnya.

Yang dihindari dengan sengaja, karena itu ciri halaman template:

- ungu-biru bergradasi, dan hijau neon yang berpendar (glow)
- kartu ikon + judul + teks berjajar sama rata
- karakter kode melayang (`{ }`, `</>`) sebagai hiasan latar
- emoji di dalam antarmuka
- tanda pisah panjang (—) di teks yang tampil
- teks bergradasi, glow neon, kaca buram sebagai hiasan
- angka statistik yang tidak ada sumbernya

## Warna

Tema tetap hijau. Satu warna aksen (mint), dipakai untuk satu peran: sinyal, seperti LED hijau di papan sirkuit. Latarnya hijau tua yang hampir hitam, bukan abu netral.

| Peran | Nilai | Dipakai untuk |
|---|---|---|
| Canvas | `#081410` | latar halaman |
| Surface | `#0F2119` | panel yang terangkat sedikit |
| Ink | `#EEF3EF` | teks utama |
| Ink soft | `#9FB5AB` | teks sekunder, selalu condong hangat, bukan abu datar |
| Accent | `#3ED8A8` | tombol utama, penanda aktif, garis sinyal |
| Accent ink | `#04211A` | teks di atas aksen |
| Hairline | ink 14% | semua garis pemisah |

Ritme terang-gelap: bagian Tentang dan Layanan memakai latar krem-hijau (`#E6EFE8`, teks `#0B1C15`, aksen gelap `#0A7A57` supaya kontras cukup di atas terang). Perpindahan antar latar selalu potongan tegas, tidak digradasi.

Tidak ada hitam murni. Kontras teks diukur di halaman jadi: isi ≥ 4.5:1, teks besar ≥ 3:1.

## Huruf

Dua keluarga, ditambah satu mono untuk label.

- **Archivo** (variabel, berat 700 sampai 900) untuk judul dan kata besar. Rapat, lebar sedikit.
- **Geist** untuk paragraf.
- **Geist Mono** hanya untuk label, nama alat, dan data. Bukan hiasan.

Inter tidak dipakai. Judul dirapatkan semakin besar ukurannya. Paragraf dibatasi 62 karakter per baris.

## Bentuk dan jarak

- Radius hanya dua: `4px` untuk kontrol, `10px` untuk panel. Tidak ada tombol pil di halaman yang sudutnya persegi.
- Jarak berbasis 4px. Ruang di atas judul selalu lebih besar daripada di bawahnya.
- Bayangan selalu punya offset dan blur, warnanya ditarik dari canvas. Tidak ada halo berwarna.
- Garis halus lebih dipilih daripada kotak. Kalau dua hal berhubungan, dekatkan, jangan dikotak.

## Struktur halaman

Katalog. Urutannya: perkenalan sebagai objek pertama, daftar alat, rak proyek yang digeser menyamping, layanan sebagai daftar huruf besar, lalu kontak yang disusun seperti label.

| Bagian | Perilaku scroll | Komponen |
|---|---|---|
| Pemuat | tampil sebentar saat pertama dibuka | LatticeLoader |
| Navigasi | menetap di atas, indikator aktif mengikuti scroll | GooeyNav (layar lebar), BranchedMenu (HP) |
| Hero | lapisan bergerak dengan laju berbeda | FluxLines (latar), TechText (kata besar), ProfileCard (foto) |
| Tentang | muncul sekali saat masuk layar | teks biasa, daftar fakta bergaris |
| Stack | muncul sekali, latar bereaksi pada kursor | CursorGrid |
| Proyek | rak menyamping, sticky selama digeser | FolderFloat (indeks), label proyek seragam |
| Layanan | baris besar, deskripsi terbuka saat disorot | teks biasa |
| Kontak | menutup halaman, tidak memudar | Ferrofluid (latar) |
| Penutup | kata besar | FuzzyText |
| Kursor | hanya mouse halus, bukan layar sentuh | TargetCursor |

Tidak ada dua bagian berurutan yang memakai perilaku scroll sama. Rak proyek adalah satu-satunya bagian yang di-pin.

## Label proyek

Semua proyek memakai skema yang sama, tidak ada kata promosi:

```
Jenis     Website bisnis
Stack     React, Supabase
Status    Live | Dalam pengembangan | Prototipe
Tautan    alamat atau "belum dirilis"
```

## Gerak

- Hanya `transform`, `opacity`, dan `clip-path`. Tidak ada `transition: all`.
- Kontrol: 120 sampai 180ms, easing `cubic-bezier(0.23, 1, 0.32, 1)`.
- Muncul dari `scale(0.95)` atau naik 14px, tidak pernah dari nol.
- `prefers-reduced-motion`: efek WebGL dan kursor dimatikan, posisi tidak bergeser, konten tetap utuh.
- Efek yang butuh kursor halus (TargetCursor, tilt kartu) tidak jalan di layar sentuh.

## Kata-kata

Bahasa Indonesia sehari-hari, kalimat pendek, orang pertama. Tidak ada "solusi inovatif", "seamless", "tingkatkan". Tidak ada angka yang tidak bisa dibuktikan. Umur tidak ditulis mati di kode karena berubah tiap tahun (di versi statis diambil dari Supabase).

## Aksesibilitas

- Semua teks yang digambar di canvas (TechText, FuzzyText) punya padanan teks yang terbaca pembaca layar.
- Fokus keyboard terlihat: garis aksen 2px, offset 3px.
- Target sentuh minimal 44px.
- Rak proyek tetap bisa dipakai tanpa gerak: berubah jadi area geser biasa.

## Catatan teknis

- Mesin scroll: `src/lib/scrollcraft.js` (scroll-craft). Elemen ditandai dengan `data-sc-*`. Jangan diubah per proyek.
- Komponen ReactBits ada di `src/components/reactbits/`, salinan utuh dari registry mereka. Penyesuaian ada di pembungkus, bukan di salinan.
- Token warna dan huruf ada di `:root` pada `src/index.css`.
