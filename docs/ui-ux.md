# 🎨 Panduan UI/UX & Design System Kyra

Dokumen ini memuat standarisasi visual, tipografi, dan interaksi untuk antarmuka pengguna (UI) platform e-commerce Kyra. Tujuannya adalah memastikan konsistensi desain yang memberikan kesan premium, bersih, dan menenangkan (_calming_).

## 1. Konsep Visual (Art Direction)

Desain Kyra mengadopsi gaya **Modern Soft UI / Aurora UI** dengan sentuhan **Light Glassmorphism**.

- **Aurora Backgrounds:** Latar belakang menggunakan gradien warna pastel yang membaur halus, menghindari warna solid yang terlalu kontras.
- **Floating Cards & Soft Shadows:** Elemen UI seperti kartu produk tidak menggunakan _border_ tegas, melainkan sudut yang sangat membulat (`rounded-3xl` atau `rounded-[32px]`) dipadu dengan efek bayangan yang sangat lembut dan menyebar (_diffused shadow_).
- **Glassmorphism:** Penggunaan efek kaca transparan (`backdrop-blur-md` dan `bg-white/40`) pada elemen _overlay_ seperti _header_, navigasi bawah, atau _modal_ AI.

## 2. Tipografi

Pemilihan font bertujuan untuk menyeimbangkan fungsionalitas e-commerce (keterbacaan) dengan estetika _brand skincare_.

- **Font Utama (Body & Heading):** `Plus Jakarta Sans`. Dipilih karena proporsinya yang modern, geometris, dan sangat nyaman dibaca pada layar kecil maupun besar.
- **Font Aksen (Handwriting):** `Calming`. Digunakan secara eksklusif untuk elemen dekoratif, _greeting_ pengguna, atau sapaan dari konsultan AI Kyra untuk memberikan sentuhan personal dan humanis.

## 3. Palet Warna (Tailwind CSS v4)

Sistem warna diatur secara terpusat menggunakan _directive_ `@theme` pada Tailwind v4 (di dalam file `globals.css`).

**Background & Text:**

- `--background` (Soft Cream): `#FDFBF7` - Warna dasar aplikasi.
- `--foreground` (Dark Charcoal): `#1A1A1A` - Warna teks utama untuk memastikan kontras yang baik tanpa menggunakan warna hitam pekat.

**Warna Aksen Pastel (Dewy Botanical / Soft Bloom):**

- `--color-dusty-pink`: `#F5D0DD` - Warna aksen utama (misal: tombol CTA sekunder, gradien latar).
- `--color-lavender-mist`: `#E6DDF8` - Warna aksen sekunder untuk memberikan nuansa "Aurora".
- `--color-sage-green`: `#C1D7D0` - Warna indikator sukses atau elemen organik.

## 4. Animasi & Interaksi

Kyra tidak mengandalkan animasi CSS statis. Untuk mencapai standar UI tingkat tinggi, _frontend_ menggunakan:

- **Framer Motion:** _Library_ utama untuk mengelola _micro-interactions_ (seperti efek _hover_ pada kartu produk yang membesar perlahan, transisi antar halaman, dan munculnya _pop-up_ rekomendasi AI).
- **Lenis:** Diimplementasikan untuk menggantikan _scrolling_ bawaan _browser_ dengan _smooth scrolling_, memberikan efek melayang yang mewah saat pengguna menjelajahi katalog produk.

## 5. Implementasi Tombol (Call to Action)

- **Primary Button:** Menggunakan warna latar gelap (`bg-foreground`) dengan teks terang (`text-background`) dan bentuk kapsul membulat penuh (`rounded-full`).
- **Secondary / Ghost Button:** Menggunakan efek _glassmorphism_ atau _background_ transparan dengan teks warna aksen.
