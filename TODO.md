# 🌸 Kyra-Skin Task & Feature Tracker

## ✅ Fase 1: Pembenahan Fondasi & Bug Fixing (Telah Selesai & Deployed)

- [x] Migrasi Skema Prisma 7: Pemisahan `URL` dan setup _Driver_ `adapter-pg` spesifik _Serverless Vercel_.
- [x] Redesign [db.ts](cci:7://file:///home/rafli/Programming/Kyra-Skin/src/lib/db.ts:0:0-0:0) pakai mode Singleton Export Ganda agar bebas _crash/spam connections_.
- [x] Membasmi error Next.js _Hydration_ di [layout.tsx](cci:7://file:///home/rafli/Programming/Kyra-Skin/src/app/layout.tsx:0:0-0:0) akibat sabotase _extension browser_.
- [x] Membuat Filter [safeParse()](cci:1://file:///home/rafli/Programming/Kyra-Skin/src/app/api/recommend/route.ts:4:0-17:1) K-NN untuk menetralisir JSON teks ngawur di `/api/recommend`.
- [x] Membuat Rute `/api/allergies` buat menahan tembakan _Error 404_ pada area _Profile_.
- [x] Sinkronisasi [AuthContext](cci:2://file:///home/rafli/Programming/Kyra-Skin/src/contexts/AuthContext.tsx:22:0-32:1): Sinkron DB properti `skinType`, indikator `isReady`, URL `/api` konstan, & awetkan JWT sesions hingga 7 hari.
- [x] Merakit 3 Halaman Custom Kosmetik Premium (_Glassmorphism_): [loading.tsx](cci:7://file:///home/rafli/Programming/Kyra-Skin/src/app/loading.tsx:0:0-0:0), [not-found.tsx](cci:7://file:///home/rafli/Programming/Kyra-Skin/src/app/not-found.tsx:0:0-0:0), dan [error.tsx](cci:7://file:///home/rafli/Programming/Kyra-Skin/src/app/error.tsx:0:0-0:0).

## 🚀 Fase 2: Fitur Ambisius Rencana Utama (Sedang Ditunda untuk Fitur Rahasia)

- [ ] **AI-Assisted Onboarding**: Menyulap laman daftar dengan form interaktif berbalut _Chat AI_ yang manis (Vercel AI SDK/Gemini).
- [ ] **Data Extraction Pipeline**: Sistem membedah obrolan bahasa biasa (_natural_) langsung menembak ke format form JSON khusus `{"umur", "tipeKulit", dll}`.
- [ ] **Single-Page Form**: Merombak tampilan input _step-by-step_ kuesioner kulit jadi memanjang 1 layar transparan yang enak diedit.
- [ ] **Tahap Persetujuan Khusus**: Kotak konfirmasi pamungkas bagi _User_ untuk meninjau validitas tarikan data AI tersebut sebelum dikirimkan ke DB.

## 🎯 Fase Spesial: Fitur Prioritas Khusus

- [ ] 👉 _(Tuliskan nama fitur khusus tersebut di sini...)_
- [ ] _(Detail arsitektur fitur...)_
