"use client";
import { motion } from "framer-motion";

export default function MaintenanceDesktop() {
  return (
    <div className="hidden md:flex min-h-screen w-full relative items-center justify-center">
      {/* Konten Utama Desktop (Dikecilin 15%) */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-3xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase border border-white/60 shadow-sm mb-6 text-[#5c8072] flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#8ab5a5] animate-pulse"></span>
          System Maintenance
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[3.5rem] lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight text-[#111]"
        >
          Penyempurnaan
          <br />
          <span
            className="text-[4rem] lg:text-[6.5rem] font-normal leading-none mt-2 block text-[#8ab5a5]"
            style={{ fontFamily: "var(--font-calming), cursive" }}
          >
            Sistem AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-gray-500 max-w-xl text-[16px] font-medium leading-relaxed"
        >
          Kami menonaktifkan situs sementara untuk melakukan *tuning* algoritma rekomendasi Skincare
          dan memutakhirkan inti server Kyra. Website akan *online* kembali dalam beberapa saat! 🌸
        </motion.p>
      </div>

      {/* Floating UI Dekorasi (Dikecilin) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, y: [-10, 10, -10] }}
        transition={{ x: { duration: 1 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute left-[8%] top-[30%] w-[240px] bg-white/60 backdrop-blur-xl rounded-[24px] p-5 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
      >
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-3/4 bg-gray-200/80 rounded-full"></div>
          <div className="h-3 w-1/2 bg-gray-200/80 rounded-full"></div>
          <div className="h-3 w-full bg-[#c1d7d0] rounded-full animate-pulse mt-2"></div>
          <p className="text-[10px] font-extrabold text-[#8ab5a5] mt-3 tracking-widest uppercase">
            Upgrading CORE_AI...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
