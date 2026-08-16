# Impor aplikasi Griya Arcana Connect ke proyek ini

Repo `backuparisanto2-cloud/griya-arcana-connect` bersifat publik dan memakai stack yang sama persis dengan proyek ini (TanStack Start + Tailwind v4 + shadcn). Jadi isinya bisa disalin masuk, bukan ditulis ulang.

## Isi aplikasi yang diimpor

- Dashboard status router MikroTik di halaman utama (uptime, CPU, memori, trafik interface, auto-refresh 15 detik)
- Halaman Grafik trafik
- Halaman Hotspot (daftar user hotspot)
- Halaman Perangkat (khusus user yang sudah login) — CRUD daftar perangkat jaringan
- Halaman Auth (login/daftar)
- Header situs + logo, ikon PWA dan manifest

## Yang akan dikerjakan

1. Menyalin seluruh source dari repo: routes, komponen (SiteHeader, StatCard, komponen ui shadcn), hooks, lib (klien MikroTik RouterOS API, tipe, server functions), aset (logo, ikon PWA, manifest), styles.css, dan konfigurasi build (package.json, vite.config, components.json) — menimpa halaman placeholder saat ini.
2. Menginstal dependensi tambahan yang dibutuhkan (Supabase JS, recharts, react-hook-form, sonner, dsb.).
3. Mengaktifkan Lovable Cloud pada proyek ini dan menjalankan ulang migrasi dari repo: tabel `devices` beserta GRANT, RLS untuk user terautentikasi, trigger `updated_at`. Kredensial backend proyek ini akan dibuat baru — kunci dari `.env` repo lama tidak ikut disalin.
4. Menyiapkan integrasi auth Supabase (klien, middleware auth server, gate rute `_authenticated`).
5. Menambahkan secret MikroTik yang dibutuhkan server: `MIKROTIK_HOST`, `MIKROTIK_PORT`, `MIKROTIK_USER`, `MIKROTIK_PASSWORD`.
6. Memverifikasi build dan membuka setiap halaman di preview.

## Catatan teknis

- Data lama (isi tabel `devices` di project Supabase repo asal) tidak ikut pindah; hanya struktur database. Kalau perlu datanya, harus diekspor manual dari project lama.
- Koneksi MikroTik memakai RouterOS binary API lewat TCP (`node:net`) dari server function. Router harus bisa dijangkau dari internet (port API, default 8728), kalau tidak halaman status akan menampilkan error koneksi.
- Repo memakai `zod@3`; versi ini dipertahankan agar validator server function tetap kompatibel.
