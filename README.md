# 🌸 Kyra: Smart Skincare E-Commerce

> _Hyper-Personalized Skincare Recommendations powered by Artificial Intelligence._

**Kyra** adalah platform e-commerce kecantikan modern yang tidak hanya menjual produk, tetapi bertindak sebagai konsultan kulit cerdas. Menggunakan pendekatan _Case-Based Reasoning (CBR)_ dan algoritma _K-Nearest Neighbors (KNN)_, Kyra menganalisis profil kulit, usia, dan riwayat alergi pengguna untuk memberikan rekomendasi _skincare_ yang paling aman dan terbukti efektif.

Dibungkus dengan antarmuka **Aurora UI** dan efek _Glassmorphism_ yang menenangkan, Kyra memberikan pengalaman belanja premium yang mulus dan estetis.

---

## 🛠️ Tech Stack & Arsitektur

Proyek ini dibangun dengan arsitektur **Microservices** di dalam sebuah **Monorepo** yang diorkestrasi oleh **Bun**.

- **Frontend:** Next.js (App Router), Tailwind CSS v4, Framer Motion
- **Backend Web (API Gateway):** Laravel 11 (PHP 8+)
- **Backend AI (Inference Engine):** FastAPI (Python 3+), Scikit-Learn
- **Database:** Supabase (PostgreSQL)

---

## 📚 Dokumentasi Lengkap (Wiki)

Untuk menjaga struktur proyek tetap bersih dan modular, seluruh dokumentasi teknis, panduan, dan rancangan sistem telah dipisahkan ke dalam direktori `docs/`. Silakan klik tautan di bawah ini untuk membaca detail spesifik dari setiap bagian:

1. **[🏛️ Arsitektur Sistem & Logika AI](docs/architecture.md)** _(Penjelasan topologi microservices, komunikasi antar-layer, dan siklus 4R pada sistem pakar)_
2. **[🎨 Panduan UI/UX & Design System](docs/ui-ux.md)** _(Aturan palet warna pastel, tipografi Plus Jakarta Sans & Calming, serta referensi Aurora UI)_
3. **[🗄️ Skema Database (Supabase)](docs/database.md)** _(ERD, rancangan tabel profil user, produk, dan riwayat alergi / knowledge base AI)_
4. **[🗺️ Rancangan Sistem, Fitur, & Roadmap](docs/features-roadmap.md)** _(Alur kerja pengguna dari awal hingga akhir, daftar fitur per-service, dan To-Do List pengembangan)_
5. **[💻 Panduan Setup Lokal (Local Development)](docs/setup-local.md)** _(Cara instalasi environment, dependencies, dan menjalankan 3 server sekaligus dengan satu command)_
6. **[🚀 Panduan Deployment (Serverless Cloud)](docs/deployment.md)** _(Cara deploy Next.js ke Vercel, FastAPI ke Render, dan Laravel ke Railway)_

---

## 🚀 Quick Start (Menjalankan Proyek)

Jika Anda ingin langsung mencoba menjalankan proyek ini di komputer lokal, pastikan Anda telah membaca **[Panduan Setup Lokal](docs/setup-local.md)** untuk mengatur file `.env` dan _virtual environment_ Python.

Jika semua _setup_ sudah selesai, jalankan perintah sakti ini di _root_ direktori:

```bash
bun run dev
```
