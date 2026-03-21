# 📦 Kyra Monorepo Documentation

Dokumentasi lengkap untuk setup lokal dan deployment Kyra Monorepo. Semua dijadikan satu supaya tidak perlu lompat-lompat file seperti hidup yang penuh keputusan buruk.

---

# 💻 Panduan Setup Lokal (Local Development)

## 1. Persyaratan Sistem (Prerequisites)

Pastikan ini sudah terpasang:

- Bun (JavaScript Runtime & Package Manager)
- PHP 8.2+ & Composer (Laravel)
- Python 3.10+ (FastAPI & ML)
- Git

---

## 2. Langkah Instalasi

### A. Setup Root Monorepo

Jalankan:
bun install

---

### B. Setup Frontend (Next.js)

Masuk ke folder:
cd frontend

Install:
bun install

- Salin `.env.example` → `.env.local`
- Sesuaikan URL API

---

### C. Setup Backend Web (Laravel)

Masuk:
cd ../backend-web

Install:
composer install

- Salin `.env.example` → `.env`
- Konfigurasi database Supabase

Jalankan:
php artisan key:generate
php artisan migrate

---

### D. Setup Backend AI (FastAPI)

Masuk:
cd ../backend-ai

Buat virtual environment:
python -m venv venv

Aktivasi:
source venv/bin/activate

(Fish shell pakai `activate.fish`, karena kamu memang beda sendiri.)

Install dependency:
pip install -r requirements.txt

---

## 3. Menjalankan Semua Server

Balik ke root lalu jalankan:
bun run dev

Server yang jalan:

- Frontend → http://localhost:3000
- Laravel → http://localhost:8000
- FastAPI → http://localhost:8001

---
