# Portofolio Waffir (React + Vite)

Versi React dari portofolio. Acuan desain ada di [`../DESIGN.md`](../DESIGN.md).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Obrolan Astra

Kotak obrolan di bubble Astra memanggil `POST /api/chat` (fungsi Vercel di `../api/chat.js`).

Untuk mencobanya lokal (`npm run dev` atau `npm run preview`), salin `env.example` jadi `.env.local` dan isi `GEMINI_API_KEY` (dan `SUPABASE_URL`, `SUPABASE_ANON_KEY` kalau mau umur dari Supabase). Server lokal lalu menjalankan `api/chat.js` sendiri. Tanpa kunci, Astra menjawab bahwa obrolan lokal belum diatur.

Alternatifnya isi `VITE_API_TARGET` dengan alamat deploy Vercel; `/api` akan diteruskan ke sana.

Saat deploy, folder `api/` harus ada di root proyek Vercel yang dipakai.

## Isi penting

- `src/lib/scrollcraft.*` mesin scroll (atribut `data-sc-*`).
- `src/components/reactbits/` komponen ReactBits. Dua salinan dipatch kecil: `FluxLines`, `CursorGrid`, `Ferrofluid` (tidak memanggil `loseContext` saat unmount, supaya aman di React StrictMode) dan `FlyingButton` (pointer dipantau di window agar panggungnya bisa selebar halaman).
