# Halaman Daftar Perangkat tanpa login + kolom baru

## Yang berubah

1. **Tanpa login.** Halaman `/perangkat` dipindah keluar dari area terkunci, jadi bisa dibuka siapa saja tanpa password. Menu "Perangkat" muncul untuk semua pengunjung.
2. **Kolom tabel** (urutan sesuai permintaan): No, Nama, Tipe Perangkat, Posisi, Seri Perangkat, Gambar, IP Address, User Perangkat, Password Perangkat, SSID (hanya relevan untuk Access Point).
3. **Kolom lama tetap ada di form** (MAC address, password WiFi, catatan) tapi tidak ditampilkan di tabel.
4. **Gambar perangkat**: upload foto dari HP/komputer, otomatis dikompres jadi WebP maksimal 300 KB sebelum disimpan ke penyimpanan cloud. Thumbnail tampil di tabel, klik untuk perbesar.
5. Semua data tersimpan di cloud (database + storage), sama seperti sekarang.

## Peringatan penting

Karena halaman bebas diakses tanpa login, siapa pun yang membuka alamat `/perangkat` bisa **melihat dan mengubah** IP, user, dan password perangkat jaringan Anda — termasuk lewat internet. Ini risiko keamanan nyata. Kalau nanti ingin lebih aman, opsi ringan: satu kode akses sederhana untuk membuka halaman, atau kembali memakai login. Saya kerjakan sesuai permintaan dulu.

## Rincian teknis

- Migrasi database: tambah kolom `serial_number` (teks) dan `image_url` (teks) pada tabel `devices`; tambah policy dan GRANT untuk peran `anon` (baca, tambah, ubah, hapus) agar halaman publik berfungsi.
- Buat bucket storage publik `device-images` dengan policy upload/baca untuk `anon` dan `authenticated`.
- Kompresi gambar dilakukan di browser (canvas → `image/webp`, turunkan resolusi/kualitas bertahap sampai ≤ 300 KB), lalu upload lewat klien Supabase browser.
- `src/lib/devices.functions.ts`: hapus `requireSupabaseAuth`, ganti ke klien publishable server-side di dalam handler (fungsi tetap publik dan tervalidasi).
- Pindahkan `src/routes/_authenticated/perangkat.tsx` → `src/routes/perangkat.tsx`; hapus tombol mata/sensor password (tetap ada tombol salin). Tabel dirombak ke urutan kolom baru + nomor urut; tampilan kartu untuk layar HP disesuaikan.
- `src/lib/devices-types.ts`: tambah `serial_number` dan `image_url` ke tipe dan normalisasi input.
- `SiteHeader`: link Perangkat tidak lagi bergantung status login.
- Kolom SSID/Password WiFi di form hanya ditampilkan saat tipe = Access Point.
