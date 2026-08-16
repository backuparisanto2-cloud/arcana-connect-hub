# Kunci aplikasi dengan satu login + komentar interface + splash pakai logo

## Yang akan dikerjakan

### 1. Satu login untuk seluruh aplikasi (tanpa pendaftaran)

- Seluruh halaman (Ringkasan, Grafik, User Hotspot, Perangkat) hanya bisa dibuka setelah masuk.
- Kredensial tunggal: username `griya-arca`, password `majubersama@2026`. Disimpan sebagai secret di server, tidak pernah dikirim ke browser.
- Halaman `/auth` diganti jadi form "Masuk" berisi Username + Password saja. Opsi "Daftar" dihapus sepenuhnya.
- Setelah masuk, status tersimpan di cookie terenkripsi, jadi refresh dan pindah halaman tetap masuk (berlaku 7 hari). Tombol "Keluar" di menu mengakhiri sesi.
- Sistem login email/password lama (akun cloud) tidak dipakai lagi di antarmuka.

### 2. Komentar interface di dashboard

- Kolom komentar dari router sudah tersedia di data. Pada tabel Interface di halaman awal, komentar ditampilkan sebagai baris kecil di atas/di bawah nama interface (mis. "Internet Indihome") sehingga tiap interface langsung dikenali. Interface tanpa komentar tetap tampil seperti biasa.

### 3. Splash screen memakai logo aplikasi

- Animasi SVG hi-tech diganti dengan logo aplikasi (`src/assets/logo.png`, sama dengan ikon PWA), dengan efek muncul/berdenyut halus dan cincin loading tipis di sekelilingnya.

## Catatan teknis

- Gate memakai `createServerFn` + `useSession` (cookie terenkripsi httpOnly). Secret baru: `SITE_USERNAME`, `SITE_PASSWORD`, dan `SESSION_SECRET` (dibuat acak otomatis).
- Perbandingan password dilakukan di server dengan pembandingan timing-safe; tidak ada kredensial di bundle browser.
- Semua rute halaman dipindah ke layout terkunci; `/auth` tetap publik agar tidak terjadi loop.
- Data perangkat saat ini terbuka untuk publik di level database. Karena aplikasi kini terkunci password, pembacaan tetap lewat aplikasi — akses langsung ke database oleh publik akan ditutup di migrasi yang sama supaya password aplikasi tidak bisa dilewati.
- Endpoint proxy grafik MRTG (`/api/graph/ether1.gif`) juga dilindungi cookie sesi.

## Yang perlu dikonfirmasi saat pengerjaan

Jika nanti ingin banyak akun berbeda (per pengguna), diperlukan sistem akun terpisah — plan ini sengaja memakai satu kredensial bersama sesuai permintaan.
