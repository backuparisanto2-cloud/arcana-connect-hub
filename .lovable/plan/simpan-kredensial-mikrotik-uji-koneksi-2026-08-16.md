# Simpan Kredensial MikroTik & Uji Koneksi

## Tujuan
Menyimpan empat kredensial router ke penyimpanan rahasia backend, lalu memastikan aplikasi benar-benar bisa terhubung ke router.

## Langkah
1. Simpan nilai berikut sebagai secret (nilai sudah diberikan, tidak perlu form):
   - MIKROTIK_HOST = 117.121.207.223
   - MIKROTIK_PORT = 2629
   - MIKROTIK_USER = apiuser
   - MIKROTIK_PASSWORD = (nilai yang diberikan)
   Catatan: bila nama secret sudah ada dengan nilai lama, nilainya akan diperbarui agar yang dipakai adalah data terbaru.
2. Restart lingkungan agar nilai baru terbaca oleh kode server.
3. Uji koneksi lewat halaman Ringkasan/Hotspot dan cek log server:
   - Berhasil: data router (identitas, resource, daftar hotspot) tampil.
   - Gagal "invalid user name or password": kredensial atau izin user API perlu dicek.
   - Gagal timeout/ECONNREFUSED: port 2629 belum terbuka atau service API belum aktif di router.
4. Laporkan hasil uji apa adanya, termasuk pesan error persis bila masih gagal.

## Catatan Teknis
Koneksi dibuat di `src/lib/mikrotik.server.ts` (RouterOS binary API via TCP, login plain RouterOS 6.43+). Variabel dibaca di dalam handler server, jadi tidak ada perubahan kode yang diperlukan — hanya nilai secret.
