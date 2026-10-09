# Data Project Craftivation

Halaman **/projects**, slider Portofolio homepage, dan Hub membaca koleksi yang sama, yaitu **GET /api/projects** (tabel SQLite `projects`). Halaman /projects **tidak memiliki daftar proyek hardcoded dari mockup**. Foto hero dan banner mengikuti `project.svg`, sedangkan kartu menggunakan gambar dari setiap record.

## Field record

| Field | Fungsi |
| --- | --- |
| id | ID SQLite otomatis; identitas komponen |
| slug | Identitas unik proyek |
| number | Nomor publikasi yang tampil di kartu (opsional; fallback 01, 02, ...) |
| title | Nama proyek |
| client | Nama klien pada dialog detail |
| description | Deskripsi pada dialog detail |
| image | URL/path gambar untuk kartu dan modal; contoh `/assets/portfolio-coffeebooth.webp` |
| imageAlt | Deskripsi aksesibilitas gambar |
| href | Link lama proyek untuk kompatibilitas sistem homepage; galeri baru memakai dialog detail |
| sortOrder | Urutan ascending, lalu id |
| isActive | Hanya `true` yang tampil di website |

`/api/projects` tanpa parameter hanya mengembalikan proyek aktif. `/api/projects?all=1` juga memuat yang nonaktif untuk alur pengelolaan.

## Perilaku halaman

- Galeri pertama kali menampilkan sampai enam record aktif, lalu tombol **Lihat proyek lainnya** menampilkan enam berikutnya. Jumlah proyek tidak dibatasi.
- Kartu dapat dibuka menjadi dialog detail, dengan foto, klien, deskripsi, dan tombol konsultasi WhatsApp. Dialog ditutup dengan tombol X, Escape, atau klik area di luar panel.
- Saat API masih memuat, frontend menampilkan `data/dummy.ts` sebagai placeholder awal; saat API gagal, placeholder tetap terlihat disertai informasi koneksi.
- Saat API berhasil mengembalikan `data: []`, frontend menampilkan **Belum ada proyek yang dipublikasikan**. Data contoh tidak disisipkan kembali.
- Perubahan data proyek akan terlihat ketika halaman dimuat ulang, tanpa mengubah file komponen.

## SQLite dan deployment

Database standar tetap `<root>/data/craftivation.db`. History dan seed yang sudah ada tidak direset. Variabel opsional `CRAFTIVATION_DB_PATH` dapat diisi dengan path absolut menuju berkas SQLite **di penyimpanan persisten** pada host yang mendukung disk writable. Jika tidak diatur, konfigurasi lama tetap berlaku.

**Penting:** Database SQLite lokal pada lingkungan serverless dengan filesystem sementara atau read-only bukan penyimpanan produksi permanen. Jika deploy di Vercel serverless, gunakan host/stateful volume yang benar untuk SQLite atau migrasikan storage ke layanan database persisten sebelum pengelolaan real-time dipakai. Build berhasil tidak otomatis menjamin keberlanjutan database runtime.

API mutasi proyek (POST/PATCH/DELETE) yang sudah ada perlu dilindungi autentikasi dan otorisasi sebelum fitur pengelolaan dibuka kepada publik. Perubahan halaman /projects ini tidak mengaktifkan atau mengubah izin endpoint mutasi tersebut.

## Penambahan proyek

Gunakan mekanisme pengelolaan database/API proyek yang telah disiapkan. Jangan menambah duplikasi daftar proyek pada file `app/projects/page.tsx`, `ProjectsGallery.tsx`, atau aset SVG. `data/dummy.ts` adalah seed awal dan fallback saja.
