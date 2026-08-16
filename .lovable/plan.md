# Dashboard Mobile-Friendly + Splash + Grafik MRTG Ether1

## 1. Tampilan ramah smartphone dengan side menu
- Ganti navigasi tab horizontal di header dengan tombol menu (hamburger) di layar kecil yang membuka side menu geser (drawer) dari kiri: Ringkasan, User Hotspot, Graph, Perangkat, plus tombol Masuk/Keluar dan Perbarui.
- Di layar besar, navigasi tetap tampil mendatar seperti sekarang.
- Rapikan padding, ukuran font, dan tabel (Hotspot & Perangkat) agar bisa digulir horizontal tanpa merusak layout di layar HP.

## 2. Pembaruan data tiap 60 detik + splash screen
- Ubah interval auto-refresh dari 15 detik menjadi 60 detik di halaman Ringkasan dan Hotspot (teks "tiap 15 detik" ikut diperbarui).
- Tambahkan splash screen singkat saat aplikasi pertama dibuka: logo bergaya hi-tech sederhana (lingkaran/garis neon dengan animasi pulse dan progress tipis), latar gelap sesuai tema, hilang otomatis setelah data awal siap atau maksimal ~1,5 detik.
- Buat aset logo hi-tech sederhana (SVG/PNG transparan) untuk splash.

## 3. Grafik MRTG Ether1 di halaman awal
- Tambahkan kartu "Trafik Internet — Ether1 (Harian)" di dashboard, di bawah kartu status router.
- Gambar diambil lewat endpoint internal aplikasi (proxy) supaya tetap tampil di situs https; browser tidak bisa memuat gambar http langsung dari halaman https.
- Failsafe: proxy mencoba `http://117.121.207.223:2627/graphs/iface/ether1/daily.gif` lebih dulu, bila gagal/timeout beralih ke `http://192.168.35.1/graphs/iface/ether1/daily.gif`. Bila keduanya gagal, kartu menampilkan pesan "grafik tidak tersedia" beserta tautan langsung ke kedua URL.
- Gambar disegarkan otomatis mengikuti siklus 60 detik.

## Catatan Teknis
- Side menu memakai komponen Sheet shadcn yang sudah ada; header dipecah agar dipakai ulang di semua halaman.
- Proxy grafik: server route `src/routes/api/graph/ether1[.]gif.ts` dengan timeout ~5 detik per sumber, header `Cache-Control: no-store`, respons 502 bila kedua sumber gagal.
- Alamat 192.168.35.1 hanya bisa dijangkau bila server berada di jaringan lokal; dalam praktiknya sumber publik jadi jalur utama dan lokal jadi cadangan.
