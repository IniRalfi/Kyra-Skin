"use client";

import { motion, Variants } from "framer-motion";

// Variants untuk animasi per-elemen
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } },
};

export default function ComingSoonResponsive() {
  return (
    <div className="min-h-screen w-full bg-[#fcfbfc] relative overflow-hidden font-jakarta text-[#111111] selection:bg-[#FAD9E6]">
      {/* ================= BACKGROUND LAYER (Aurora + Grid) ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* === Aurora Blobs === */}
        <motion.div
          className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-[#ff8cb8] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[150px] opacity-40"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-[#d2dcff] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[150px] opacity-50"
          animate={{ scale: [1, 1.2, 1], translateY: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[20%] md:left-[30%] w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-[#ff8cb8] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[160px] opacity-30"
          animate={{ scale: [1, 1.05, 1], translateX: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* === Fading Dot Pattern AI-Style === */}
        <div
          className="absolute inset-0 z-10 opacity-70"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(232, 119, 155, 0.4) 1.5px, transparent 1.5px)`,
            backgroundSize: `24px 24px`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 10%, transparent 75%)`,
            maskImage: `radial-gradient(ellipse at center, black 10%, transparent 75%)`,
          }}
        />
      </div>

      {/* ================= FLOATING DECORASI (Khusus Desktop Biar Nggak Kosong) ================= */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:flex justify-between items-center px-10 xl:px-20 overflow-hidden">
        {/* Kiri: Pink Dummy Card */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: -6, y: [0, -15, 0] }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1 },
            x: { duration: 1 },
          }}
          className="w-[280px] h-[380px] rounded-[40px] bg-white/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 p-4 flex flex-col mt-32"
        >
          <div className="w-full h-[220px] bg-gradient-to-br from-[#ffb6d3] to-[#fad9e6] rounded-[30px] flex items-center justify-center">
            <span className="text-[6rem] drop-shadow-xl select-none">✨</span>
          </div>
          <div className="mt-5 px-3">
            <div className="w-2/3 h-5 bg-gray-200/60 rounded-full mb-3"></div>
            <div className="w-1/3 h-4 bg-gray-200/60 rounded-full"></div>
          </div>
        </motion.div>

        {/* Kanan: Violet Dummy Card */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 8, y: [0, 15, 0] }}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
            opacity: { duration: 1 },
            x: { duration: 1 },
          }}
          className="w-[260px] h-[350px] rounded-[40px] bg-white/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 p-4 flex flex-col mb-40"
        >
          <div className="w-full h-[200px] bg-gradient-to-br from-[#e3e0f3] to-[#d2ceea] rounded-[30px] flex items-center justify-center">
            <span className="text-[6rem] drop-shadow-xl select-none">💧</span>
          </div>
          <div className="mt-5 px-3">
            <div className="w-3/4 h-5 bg-gray-200/60 rounded-full mb-3"></div>
            <div className="w-1/2 h-4 bg-gray-200/60 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* ================= REAL WEB NAVBAR ================= */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 px-4 md:px-8 py-4 md:py-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-xl rounded-full px-6 md:px-8 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white">
          <div className="text-2xl font-extrabold tracking-tighter cursor-pointer">
            Kyra<span className="text-[#e8779b]">.</span>
          </div>
          <button className="bg-[#111] hover:bg-black text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[13px] md:text-sm font-bold transition-all active:scale-95 shadow-md">
            Hubungi Kami
          </button>
        </div>
      </motion.nav>

      {/* ================= MAIN COMING SOON CONTENT ================= */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full text-[11px] md:text-[13px] font-bold tracking-widest uppercase border border-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.03)] mb-8 text-gray-500"
          >
            ✨ The Wait Is Almost Over
          </motion.div>

          {/* Big Title */}
          <motion.h1
            variants={itemVariants}
            className="text-[3rem] md:text-[5.5rem] lg:text-[6.5rem] font-extrabold leading-[1.05] tracking-tight text-[#111]"
          >
            Your Future Of
            <br />
            <span
              className="text-[3.5rem] md:text-[6.5rem] lg:text-[7.5rem] font-normal leading-[1] mt-0 md:mt-2 block tracking-normal text-[#e8779b]"
              style={{ fontFamily: "var(--font-calming), cursive" }}
            >
              Skincare Style
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 md:mt-8 text-gray-500 max-w-md md:max-w-xl text-[15px] md:text-[18px] font-medium leading-relaxed"
          >
            Revolusi Skincare & AI segera hadir. Gabung ke daftar antrean khusus sekarang juga dan
            bersiap temukan personalisasi kulit paling canggih di dunia.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            variants={itemVariants}
            className="mt-10 md:mt-12 w-full max-w-[90%] md:max-w-lg"
          >
            <div className="bg-white/80 backdrop-blur-xl flex items-center rounded-full p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white">
              <input
                type="email"
                placeholder="Masukkan email untuk undangan..."
                className="bg-transparent w-full px-5 outline-none text-[15px] md:text-[16px] text-[#111] placeholder-gray-400 font-semibold"
              />
              <button className="bg-[#111111] hover:bg-black transition-transform active:scale-95 text-white px-7 md:px-10 py-3.5 md:py-4 rounded-full font-bold whitespace-nowrap shadow-xl">
                Kabari Aku
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
