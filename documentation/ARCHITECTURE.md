# 🌸 Master Plan & Arsitektur Proyek Kyra

**Kyra** adalah platform e-commerce _skincare_ cerdas yang mengimplementasikan _Hyper-Personalization_ menggunakan Kecerdasan Buatan (AI). Sistem ini dirancang untuk memberikan rekomendasi produk yang aman dan sesuai dengan profil kulit pengguna, serta mampu belajar dari riwayat ketidakcocokan (alergi).

---

## 1. Arsitektur Utama (Monorepo)

Proyek ini dibangun menggunakan arsitektur **Microservices** di dalam satu wadah **Monorepo** yang diorkestrasi menggunakan **Bun**.

- **Frontend (UI/UX):** Next.js (App Router) dengan TypeScript.
- **Backend Web (API Gateway & Logic):** Laravel 11 (PHP).
- **Backend AI (Machine Learning Service):** FastAPI (Python) dengan Scikit-learn.
- **Database:** Supabase (PostgreSQL), dipilih karena dukungannya yang sangat baik untuk relasi data dan tipe data JSONB yang dinamis.

---

## 2. Metodologi Artificial Intelligence (AI)

[cite_start]Sistem pakar pada Kyra menggunakan metode **Case-Based Reasoning (CBR)**[cite: 2].

- [cite_start]**Algoritma Inti:** Menggunakan _K-Nearest Neighbors_ (KNN) [cite: 8] untuk mencari kemiripan kasus lama dengan kasus baru.
- [cite_start]**Perhitungan Jarak:** Menggunakan **Euclidean Distance** [cite: 25] [cite_start]karena tingkat akurasinya yang tinggi dalam menghitung kedekatan parameter pengguna (seperti umur, jenis kulit, dan riwayat alergi)[cite: 26].
- [cite_start]**Siklus AI (4R):** 1. **Retrieve:** Mengambil data pengguna dengan profil kulit terdekat[cite: 13]. 2. [cite_start]**Reuse:** Memberikan rekomendasi produk _skincare_ yang berhasil pada profil tersebut[cite: 13]. 3. [cite_start]**Revise:** Memperbaiki saran jika pengguna memberikan _feedback_ alergi[cite: 13]. 4. [cite_start]**Retain:** Menyimpan kasus baru tersebut ke dalam _knowledge base_ (basis kasus)[cite: 13].

---

## 3. Panduan Desain UI/UX (Design System)

Tampilan web Kyra mengusung tema **"Dewy Botanical / Soft Bloom"** yang mengedepankan kesan menenangkan, bersih, dan profesional.

- **Style:** Minimalis dengan _Glassmorphism_ ringan dan ruang kosong (_whitespace_) yang lega.
- **Animasi:** Transisi super _smooth_ menggunakan **Framer Motion** dan _smooth scrolling_ menggunakan **Lenis**.
- **Tipografi:**
  - **Plus Jakarta Sans:** Sebagai font utama untuk teks panjang dan UI yang mudah dibaca.
  - **Calming (Handwriting):** Sebagai font aksen estetis untuk sapaan atau elemen dekoratif AI.
- **Palet Warna (Tailwind CSS v4):**
  - `--background`: `#FDFBF7` (Soft Cream)
  - `--foreground`: `#2D3748` (Charcoal)
  - `--color-dusty-pink`: `#F2D8D5`
  - `--color-sage-green`: `#C1D7D0`

---

## 4. Strategi Deployment (Serverless Cloud)

Untuk menekan biaya (gratis) namun tetap mendapatkan skalabilitas setara _enterprise_, _microservices_ Kyra dipecah dan di-_deploy_ ke berbagai layanan _Platform as a Service_ (PaaS):

1.  **Frontend (Next.js):** Di-_deploy_ ke **Vercel** (Set Root Directory: `frontend`).
2.  **Backend Web (Laravel):** Di-_deploy_ ke **Railway** atau **Koyeb** (Set Root Directory: `backend-web`).
3.  **Backend AI (FastAPI):** Di-_deploy_ ke **Render.com** (Set Root Directory: `backend-ai`).
4.  **Database & Storage:** Dihosting di **Supabase** (PostgreSQL).

_(Catatan konfigurasi: Aktifkan fitur "Ignore Build Step" di Vercel dan layanan lainnya agar sistem hanya melakukan build ulang jika terdapat perubahan kode di folder milik service masing-masing)._

---

## 5. Alur Pengembangan Lokal (Local Development)

Cara menjalankan ketiga layanan secara bersamaan di komputer lokal (pastikan PostgreSQL/Supabase _connection string_ sudah diatur di file `.env`):

1.  Buka terminal di direktori _root_ (`kyra`).
2.  Jalankan perintah:
    ```bash
    bun run dev
    ```
3.  Perintah ini akan mengeksekusi _script_ `concurrently` yang secara otomatis menyalakan server Next.js, Laravel, dan FastAPI secara paralel dalam satu jendela terminal yang rapi.
