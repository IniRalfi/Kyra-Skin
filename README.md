# 🌸 Kyra - AI-Powered Skincare E-Commerce

![Kyra Banner](https://via.placeholder.com/1200x400?text=Kyra+-+Smart+Skincare+Rcommendation+System) Kyra adalah platform e-commerce _skincare_ cerdas yang mengimplementasikan _Hyper-Personalization_ menggunakan Kecerdasan Buatan (AI). Aplikasi ini tidak hanya berfungsi sebagai toko _online_ biasa, tetapi juga bertindak sebagai konsultan kulit pribadi yang merekomendasikan produk paling aman dan sesuai dengan profil kulit pengguna, serta mampu belajar dari _feedback_ alergi pengguna.

Proyek ini dibangun menggunakan arsitektur **Microservices** yang di-containerize menggunakan Docker, memisahkan logika web e-commerce dan komputasi _Machine Learning_.

## ✨ Fitur Utama

### 🛍️ Core E-Commerce

- **Katalog Produk Dinamis:** Pencarian dan filter produk _skincare_ berdasarkan kategori dan _ingredients_.
- **Manajemen Keranjang & Transaksi:** Sistem _checkout_ yang mulus dan aman.
- **Sistem Manajemen Konten (Admin):** _Dashboard_ untuk mengelola data pengguna, produk, dan laporan transaksi.

### 🧠 Artificial Intelligence (AI) Features

- **Smart Skincare Recommendation (Sistem Inti):** Menggunakan metode **Case-Based Reasoning (CBR)** dengan algoritma perhitungan _Euclidean Distance_ untuk mencari tingkat kemiripan pelanggan baru dengan riwayat pelanggan terdahulu berdasarkan umur, gender, dan jenis kulit.
- **Allergy Feedback Loop (Revise & Retain):** Sistem secara otomatis memperbarui _database_ pengetahuan (basis kasus) jika pengguna melaporkan ketidakcocokan/alergi terhadap suatu produk, sehingga AI semakin pintar menghindari _ingredients_ tertentu untuk profil serupa.
- **Face Analysis (Sistem Penunjang):** Memanfaatkan arsitektur **Jaringan Saraf Tiruan (JST) / CNN** untuk menganalisis foto wajah pengguna dan mendeteksi kondisi seperti jerawat atau kemerahan.
- **AI Beauty Consultant (Sistem Penunjang):** Terintegrasi dengan **NLP (Google Gemini API)** sebagai _chatbot_ interaktif yang memahami konteks produk toko.

## 🛠️ Arsitektur & Tech Stack

Sistem ini dibagi menjadi tiga _service_ utama yang berjalan secara independen:

1. **Frontend (UI/UX)**
   - Framework: Next.js / React
   - Styling: Tailwind CSS
2. **Backend Web (Logika E-Commerce & API Gateway)**
   - Framework: Laravel (PHP)
   - Auth: Laravel Sanctum / JWT
3. **Backend AI (Machine Learning Service)**
   - Framework: FastAPI (Python)
   - Library: Scikit-learn (untuk CBR/KNN), TensorFlow/PyTorch (untuk JST), LangChain
4. **Database & Infrastruktur**
   - Database Utama: Supabase (PostgreSQL)
   - Object Storage: Supabase Storage (untuk foto wajah & gambar produk)
   - Deployment: Docker & Docker Compose

## ⚙️ Instalasi & Menjalankan di Local

Pastikan Anda sudah menginstal **Docker** dan **Docker Compose** di perangkat Anda.

1. Clone repositori ini:
   ```bash
   git clone [https://github.com/username-kamu/kyra-ecommerce.git](https://github.com/username-kamu/kyra-ecommerce.git)
   cd kyra-ecommerce
   ```
