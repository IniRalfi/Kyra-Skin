# 🗺️ Rancangan Sistem, Fitur, & Roadmap Pengembangan Kyra

Dokumen ini memuat deskripsi alur kerja sistem (rancangan), daftar fitur spesifik pada setiap layanan (_microservices_), serta _To-Do List_ (Roadmap) pengembangan platform e-commerce _skincare_ Kyra.

---

## 1. Rancangan Sistem (Alur Pengguna / User Flow)

Sistem Kyra dirancang untuk memberikan pengalaman belanja yang sangat personal. Berikut adalah siklus alur pengguna dari awal hingga akhir:

1. **Onboarding & Profiling:** Pengguna baru mendaftar dan diwajibkan mengisi kuesioner singkat terkait kondisi kulit (usia, jenis kelamin, tipe kulit, masalah kulit).
2. **AI Analysis (Retrieve & Reuse):** Data profil dikirim ke AI (FastAPI). AI akan mencari profil pengguna lama yang paling mirip (K-Nearest Neighbors) dan mengembalikan rekomendasi produk _skincare_ yang terbukti cocok untuk profil tersebut.
3. **E-Commerce Experience:** Pengguna melihat katalog produk yang sudah diurutkan berdasarkan tingkat kecocokan (bukan sekadar daftar acak). Pengguna memasukkan produk ke keranjang dan melakukan _checkout_.
4. **Feedback Loop (Revise & Retain):** Setelah beberapa minggu penggunaan, pengguna diminta memberikan _rating_ atau ulasan.
   - Jika cocok: AI mencatatnya sebagai tingkat keberhasilan.
   - Jika alergi/tidak cocok (Revise): Pengguna melaporkan reaksi negatif. AI akan mengekstrak data _ingredients_ (kandungan) dari produk tersebut, menyimpannya di tabel `allergy_cases` (Retain), dan memastikan pengguna tersebut (dan pengguna lain dengan profil serupa) tidak lagi direkomendasikan produk dengan kandungan pemicu alergi yang sama.

---

## 2. Rincian Fitur Sistem (Berdasarkan Service)

### A. Frontend Layer (Next.js)

- **Smart UI/UX:** Tampilan _Aurora UI_ dengan _Glassmorphism_ yang memanjakan mata.
- **Dynamic Onboarding Form:** Kuesioner interaktif dengan animasi _smooth_ (Framer Motion) untuk menangkap data profil kulit.
- **AI Recommendation Dashboard:** Halaman khusus yang menampilkan alasan "Mengapa produk ini cocok untukmu" (memberikan _Explainable AI_ kepada pengguna).
- **Shopping Cart & Checkout:** Alur keranjang belanja standar e-commerce yang cepat dan responsif.
- **Allergy Reporter:** Formulir pelaporan jika terjadi ketidakcocokan produk setelah pembelian.

### B. Core Service & API Gateway (Laravel)

- **Authentication & Authorization:** Sistem _login/register_ dan manajemen _role_ (Admin & Customer).
- **Product Management (CRUD):** _Endpoint_ untuk menambah, mengedit, dan menghapus produk beserta _ingredients_-nya (format JSONB).
- **Order Management:** Sistem pencatatan transaksi pembelian dan status pesanan.
- **AI Orchestration:** Menjadi "jembatan" yang meneruskan data pengguna dari _database_ ke FastAPI untuk diproses, lalu mengembalikan hasilnya ke Next.js.

### C. Intelligence Layer (FastAPI)

- **KNN Computation Engine:** _Endpoint_ khusus untuk menghitung _Euclidean Distance_ antar profil pengguna.
- **Allergy Filter:** Logika untuk mengeliminasi produk dari daftar rekomendasi jika mengandung _ingredients_ yang ada di dalam tabel `allergy_cases` pengguna.

---

## 3. Roadmap Pengembangan (To-Do List)

Berikut adalah tahapan pengembangan (_checklist_) yang harus diselesaikan. Centang `[x]` untuk tugas yang sudah selesai.

### Fase 1: Inisialisasi & Infrastruktur (Selesai ✅)

- [x] Inisialisasi Monorepo dengan Bun Workspaces.
- [x] Setup Frontend (Next.js + Tailwind CSS v4).
- [x] Setup Backend Web (Laravel 11).
- [x] Setup Backend AI (FastAPI + Python venv).
- [x] Konfigurasi _script_ `bun run dev` dengan `concurrently`.
- [x] Pembuatan dokumentasi arsitektur, UI/UX, dan database.

### Fase 2: Database & Backend Web (Laravel) 🚧

- [ ] Setup proyek di dashboard Supabase.
- [ ] Konfigurasi file `.env` Laravel untuk terhubung ke PostgreSQL Supabase.
- [ ] Buat file _Migration_ untuk tabel `users`, `user_profiles`, `products`, `allergy_cases`, `orders`.
- [ ] Buat _Seeder_ (Data Dummy) untuk produk _skincare_ beserta _ingredients_-nya.
- [ ] Buat _Controllers_ & REST API Endpoint untuk katalog produk.

### Fase 3: Backend AI (FastAPI) ⏳

- [ ] Konfigurasi file `.env` FastAPI untuk membaca _database_ Supabase secara langsung.
- [ ] Buat skrip ekstraksi data (mengambil `user_profiles` dari PostgreSQL).
- [ ] Tulis logika _K-Nearest Neighbors_ (KNN) menggunakan `scikit-learn` atau _NumPy_.
- [ ] Buat _endpoint_ `/recommend/{user_id}` yang mengembalikan daftar ID produk.

### Fase 4: Frontend Development (Next.js) ⏳

- [ ] Konfigurasi _Global CSS_ (Palet warna Aurora UI & Font Plus Jakarta Sans + Calming).
- [ ] Instalasi dan setup `framer-motion` serta `lenis` untuk animasi.
- [ ] Desain _Landing Page_ (Hero Section, Fitur AI).
- [ ] Pembuatan komponen _Product Card_ dengan efek _floating_ dan _glassmorphism_.
- [ ] Integrasi pemanggilan API Laravel (menampilkan produk & rekomendasi).

### Fase 5: Integrasi, Testing, & Deployment ⏳

- [ ] Uji coba skenario _end-to-end_ (Daftar -> Isi Profil -> Dapat Rekomendasi -> Checkout).
- [ ] Uji coba skenario pelaporan alergi (Feedback Loop).
- [ ] Deploy Next.js ke Vercel (dengan _Ignored Build Step_).
- [ ] Deploy FastAPI ke Render.
- [ ] Deploy Laravel ke Railway/Koyeb.
