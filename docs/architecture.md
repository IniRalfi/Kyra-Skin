# 🏛️ Arsitektur Sistem Kyra

**Kyra** adalah platform e-commerce _skincare_ cerdas yang mengimplementasikan _Hyper-Personalization_ menggunakan Kecerdasan Buatan (AI). Dokumen ini menjelaskan struktur fundamental dari sistem.

## 1. Topologi Microservices (Monorepo)

Proyek ini dibangun menggunakan arsitektur **Microservices** di dalam satu wadah **Monorepo** yang diorkestrasi menggunakan **Bun**.

- **Frontend (Client Layer):** Next.js (App Router) dengan TypeScript. Bertugas menangani UI/UX dan interaksi langsung dengan pengguna.
- **Backend Web (API Gateway & Core Logic):** Laravel 11 (PHP). Bertugas mengelola sesi, transaksi e-commerce, dan meneruskan _request_ AI.
- **Backend AI (Intelligence Layer):** FastAPI (Python) dengan Scikit-learn. Mesin komputasi khusus untuk memproses algoritma _Machine Learning_.
- **Database (Data Layer):** Supabase (PostgreSQL). Dipilih karena dukungannya yang sangat baik untuk relasi data, performa tinggi, dan tipe data JSONB yang dinamis untuk menyimpan parameter _skincare_.

## 2. Metodologi Artificial Intelligence (AI)

Sistem pakar pada Kyra menggunakan metode **Case-Based Reasoning (CBR)** untuk meniru kepakaran konsultan kecantikan.

- **Algoritma Inti:** Menggunakan _K-Nearest Neighbors_ (KNN) untuk mencari kemiripan kasus pelanggan lama dengan kasus pelanggan baru.
- **Metode Kalkulasi Jarak:** Menggunakan **Euclidean Distance** karena tingkat akurasinya yang terbukti tinggi dalam menghitung kedekatan parameter pengguna (seperti umur, jenis kelamin, jenis kulit, dan riwayat alergi).
- **Siklus Implementasi CBR (4R):**
  1. **Retrieve:** Mengambil sekumpulan data pelanggan dari _database_ yang profil kulitnya terdekat/mirip dengan pengguna baru.
  2. **Reuse:** Memberikan rekomendasi produk _skincare_ yang terbukti berhasil dan cocok pada profil terdekat tersebut.
  3. **Revise:** Mengadopsi dan merevisi saran jika pengguna memberikan _feedback_ bahwa terjadi ketidakcocokan (misal: alergi terhadap _ingredients_ tertentu).
  4. **Retain:** Menyimpan kasus baru (riwayat alergi/ketidakcocokan) tersebut ke dalam _knowledge base_ (basis kasus) di Supabase agar AI semakin pintar di masa depan.

## 3. Komunikasi Antar Layanan (Data Flow)

1. Pengguna berinteraksi melalui **Next.js**.
2. **Next.js** menembak _endpoint_ REST API ke **Laravel**.
3. Jika _request_ membutuhkan komputasi cerdas (misal: klik tombol "Cari Skincare Cocok"), **Laravel** akan melakukan _internal API call_ secara _asynchronous_ ke **FastAPI**.
4. **FastAPI** menarik data basis pengetahuan dari **Supabase**, memproses perhitungan _Euclidean Distance_, dan mengembalikan ID produk yang direkomendasikan ke Laravel.
5. **Laravel** memformat respon tersebut dan mengirimkannya kembali ke Next.js untuk di-_render_ ke layar pengguna.
