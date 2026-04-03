"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sembunyikan ini untuk analitik monitoring
    console.error("Terjadi crash ringan:", error);
  }, [error]);

  // Logika deteksi pesan error dinamis
  let errorMessage = "Ada racikan program yang nggak sengaja meledak. Teknisi kita sedang OTW!";
  let icon = "🚑";

  if (error.message.includes("fetch")) {
    errorMessage =
      "Gagal mengambil data dari awan. Sepertinya koneksi internetmu sedang ngambek atau server sedang tidur.";
    icon = "📶";
  } else if (error.message.includes("JSON")) {
    errorMessage =
      "Gagal menerjemahkan data mentah dari database. Ada format terselip yang kurang pas!";
    icon = "🧩";
  } else if (error.message.includes("PrismaClient")) {
    errorMessage = "Koneksi keran ke database Supabase terputus. Sabar ya, jangan panik!";
    icon = "🔌";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 w-full">
      <div className="text-center bg-white/80 backdrop-blur-xl p-10 rounded-[32px] border-2 border-red-100 max-w-lg w-full shadow-[0_8px_40px_rgba(255,0,0,0.05)]">
        <div className="text-6xl mb-6 animate-bounce">{icon}</div>
        <h2 className="text-2xl font-extrabold text-[#111] mb-2">Ops, Gagal Meracik!</h2>

        {error.digest && (
          <div className="bg-red-50 text-red-600 font-bold px-4 py-2 rounded-xl text-xs mb-4 inline-block">
            Kode Diagnostik: {error.digest}
          </div>
        )}

        <p className="text-gray-600 font-medium mb-8 leading-relaxed text-sm px-4">
          {errorMessage}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-[#111] text-white font-bold py-3.5 px-8 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all text-sm"
          >
            🔄 Coba Memuat Ulang Singkat
          </button>
        </div>
      </div>
    </div>
  );
}
