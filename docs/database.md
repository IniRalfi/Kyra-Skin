# 🗄️ Skema Database Kyra (PostgreSQL / Supabase)

Dokumen ini menjelaskan struktur basis data relasional yang digunakan oleh Kyra. Database ini dikelola melalui _migration_ Laravel dan diakses secara terpusat oleh Laravel (untuk transaksi e-commerce) dan FastAPI (untuk komputasi algoritma _Case-Based Reasoning_).

## 1. Relasi Entitas Utama (ERD)

Arsitektur data Kyra berpusat pada tiga pilar: **Pengguna (User)**, **Katalog (Product)**, dan **Pengetahuan AI (Cases/Feedback)**.

- `users` memiliki satu `user_profiles` (1-to-1).
- `users` memiliki banyak `orders` (1-to-N).
- `users` memiliki banyak `allergy_cases` (1-to-N).
- `products` memiliki banyak `allergy_cases` (1-to-N).
- `orders` memiliki banyak `order_items` (1-to-N).

## 2. Struktur Tabel & Kolom

### A. Tabel `users`

Menyimpan data autentikasi dasar pelanggan dan admin.

- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String)
- `role` (Enum: 'admin', 'customer') - _Default: 'customer'_
- `created_at` & `updated_at` (Timestamp)

### B. Tabel `user_profiles`

**(Krusial untuk AI)** Menyimpan parameter yang akan dihitung jarak _Euclidean_-nya oleh algoritma K-Nearest Neighbors (KNN).

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key ke `users.id`)
- `age` (Integer) - _Parameter AI_
- `gender` (Integer / Enum: 1=Pria, 2=Wanita) - _Parameter AI_
- `skin_type` (Integer / Enum: 1=Kering, 2=Berminyak, 3=Sensitif, 4=Kombinasi, 5=Normal) - _Parameter AI_
- `created_at` & `updated_at` (Timestamp)

### C. Tabel `products`

Katalog produk _skincare_ yang dijual.

- `id` (UUID, Primary Key)
- `name` (String)
- `description` (Text)
- `category` (String) - _Misal: Toner, Serum, Moisturizer_
- `price` (Decimal/Integer)
- `stock` (Integer)
- `ingredients` (JSONB) - _Menyimpan array kandungan kimia. Sangat penting untuk filter alergi._
- `image_url` (String)
- `created_at` & `updated_at` (Timestamp)

### D. Tabel `allergy_cases` (Knowledge Base AI)

**(Core CBR - Revise & Retain)** Tabel ini bertindak sebagai "Basis Kasus". Jika sistem salah merekomendasikan produk dan pengguna mengalami alergi, datanya masuk ke sini agar AI tidak mengulangi kesalahan pada profil yang mirip.

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key ke `users.id`)
- `product_id` (UUID, Foreign Key ke `products.id`)
- `reaction_details` (Text) - _Keluhan pengguna, misal: "Kulit kemerahan"_
- `suspected_ingredients` (JSONB) - _Kandungan yang dicurigai memicu alergi hasil irisan dari ingredients produk_
- `status` (Enum: 'pending', 'verified_by_ai')
- `created_at` & `updated_at` (Timestamp)

### E. Tabel `orders` & `order_items`

Menyimpan riwayat transaksi standar e-commerce (sebagai _Reuse_ referensi keberhasilan).
**`orders`**

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `total_price` (Decimal)
- `status` (Enum: 'pending', 'paid', 'shipped', 'completed')
- `created_at` & `updated_at`

**`order_items`**

- `id` (UUID, Primary Key)
- `order_id` (UUID, Foreign Key)
- `product_id` (UUID, Foreign Key)
- `quantity` (Integer)
- `price_at_purchase` (Decimal)
