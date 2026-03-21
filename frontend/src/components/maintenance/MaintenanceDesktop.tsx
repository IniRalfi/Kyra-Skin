"use client";
import { motion } from "framer-motion";

export default function MaintenanceDesktop() {
  return (
    // Kelas 'hidden md:flex' artinya komponen hancur/hilang saat layar jadi ukuran HP
    <div className="hidden md:flex min-h-screen w-full bg-[#FCFBFC] relative overflow-hidden font-jakarta text-[#111111] items-center justify-center selection:bg-[#c1d7d0]">
      {/* Background Aurora Khusus Maintenance (Warna Sage Green & Dusty Pink) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-[#c1d7d0] rounded-full mix-blend-multiply filter blur-[140px] opacity-50"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#f5d0dd] rounded-full mix-blend-multiply filter blur-[140px] opacity-40"
          animate={{ scale: [1, 1.2, 1], translateY: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Dot Pattern Gelap Khusus Tema Maintenance */}
        <div
          className="absolute inset-0 z-10 opacity-70"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(17, 17, 17, 0.1) 1.5px, transparent 1.5px)`,
            backgroundSize: `24px 24px`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 10%, transparent 75%)`,
            maskImage: `radial-gradient(ellipse at center, black 10%, transparent 75%)`,
          }}
        />
      </div>

      {/* Konten Utama Desktop */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl px-8">
        {/* Tanda Status / Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full text-[13px] font-bold tracking-widest uppercase border border-white/60 shadow-sm mb-8 text-[#5c8072] flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#8ab5a5] animate-pulse"></span>
          System Maintenance
        </motion.div>

        {/* Title Besar */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[4rem] lg:text-[6.5rem] font-extrabold leading-[1.05] tracking-tight text-[#111]"
        >
          Penyempurnaan
          <br />
          <span
            className="text-[5rem] lg:text-[7.5rem] font-normal leading-none mt-2 block text-[#8ab5a5]"
            style={{ fontFamily: "var(--font-calming), cursive" }}
          >
            Sistem AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-gray-500 max-w-2xl text-[18px] font-medium leading-relaxed"
        >
          Kami menonaktifkan situs sementara untuk melakukan *tuning* algoritma rekomendasi Skincare
          dan memutakhirkan inti server Kyra. Website akan *online* kembali dalam beberapa saat! 🌸
        </motion.p>
      </div>

      {/* Floating UI Dekorasi - Visual Server Log */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, y: [-10, 10, -10] }}
        transition={{ x: { duration: 1 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute left-[8%] top-[30%] w-[270px] bg-white/60 backdrop-blur-xl rounded-[28px] p-6 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
      >
        <div className="flex gap-2.5 mb-5">
          <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-400"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
        </div>
        <div className="space-y-4">
          <div className="h-3.5 w-3/4 bg-gray-200/80 rounded-full"></div>
          <div className="h-3.5 w-1/2 bg-gray-200/80 rounded-full"></div>
          <div className="h-3.5 w-full bg-[#c1d7d0] rounded-full animate-pulse mt-2"></div>
          <p className="text-[11px] font-extrabold text-[#8ab5a5] mt-3 tracking-widest uppercase">
            Upgrading CORE_AI...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
