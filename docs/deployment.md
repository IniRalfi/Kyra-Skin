# 🚀 Panduan Deployment (Serverless Cloud)

Kyra dirancang untuk dapat di- _deploy_ secara terpisah (Microservices) meskipun berada dalam satu repositori (Monorepo). Pendekatan ini menekan biaya operasional (_Free Tier_) namun memberikan performa _Enterprise_.

## 1. Database & Storage (Supabase)

- **Platform:** Supabase (PostgreSQL).
- **Langkah:**
  1. Buat _project_ baru di dashboard Supabase.
  2. Ambil _Connection String_ (URI) PostgreSQL dan masukkan ke file `.env` di Laravel dan FastAPI untuk _production_.

## 2. Frontend (Next.js) -> Vercel

- **Platform:** Vercel (PaaS optimal untuk Next.js).
- **Konfigurasi:**
  - **Framework Preset:** Next.js
  - **Root Directory:** `frontend`
  - **Build Command:** `bun run build`
  - **Install Command:** `bun install`
- **Optimasi Kuota:** Di bagian _Git -> Ignored Build Step_, atur agar Vercel hanya melakukan _build_ ulang jika ada perubahan pada folder `frontend/`.

## 3. Backend Web (Laravel) -> Railway / Koyeb

- **Platform:** Railway.app atau Koyeb (Mendukung _container_ PHP/Laravel).
- **Konfigurasi:**
  - **Root Directory:** `backend-web`
  - Masukkan _Environment Variables_ (seperti `DB_URL` dari Supabase, `APP_KEY`, dll).
  - Platform biasanya akan otomatis mendeteksi `composer.json` atau menggunakan Dockerfile bawaan untuk menjalankan _service_.

## 4. Backend AI (FastAPI) -> Render.com

- **Platform:** Render (Pilih _New Web Service_).
- **Konfigurasi:**
  - **Root Directory:** `backend-ai`
  - **Build Command:** `pip install -r requirements.txt`
  - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Optimasi:** Render akan membaca file `requirements.txt` dan menjalankan server Python secara otomatis.
