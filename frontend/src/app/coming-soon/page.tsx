"use client";

import { motion, Variants } from "framer-motion";

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
    <div className="min-h-screen w-full relative">
      {/* ================= FLOATING DECORASI DESKTOP ================= */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:flex justify-between items-center px-16 xl:px-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: -6, y: [0, -15, 0] }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1 },
            x: { duration: 1 },
          }}
          className="w-[240px] h-[330px] rounded-[32px] bg-white/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 p-3.5 flex flex-col mt-24"
        >
          <div className="w-full h-[190px] bg-gradient-to-br from-[#ffb6d3] to-[#fad9e6] rounded-[24px] flex items-center justify-center">
            <span className="text-[5rem] drop-shadow-xl select-none">✨</span>
          </div>
          <div className="mt-4 px-2">
            <div className="w-2/3 h-4 bg-gray-200/60 rounded-full mb-2.5"></div>
            <div className="w-1/3 h-3 bg-gray-200/60 rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 8, y: [0, 15, 0] }}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
            opacity: { duration: 1 },
            x: { duration: 1 },
          }}
          className="w-[220px] h-[300px] rounded-[32px] bg-white/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 p-3.5 flex flex-col mb-32"
        >
          <div className="w-full h-[170px] bg-gradient-to-br from-[#e3e0f3] to-[#d2ceea] rounded-[24px] flex items-center justify-center">
            <span className="text-[5rem] drop-shadow-xl select-none">💧</span>
          </div>
          <div className="mt-4 px-2">
            <div className="w-3/4 h-4 bg-gray-200/60 rounded-full mb-2.5"></div>
            <div className="w-1/2 h-3 bg-gray-200/60 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 px-4 md:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-xl rounded-full px-5 md:px-7 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white">
          <div className="text-xl md:text-2xl font-extrabold tracking-tighter cursor-pointer">
            Kyra<span className="text-[#e8779b]">.</span>
          </div>
          <button className="bg-[#111] hover:bg-black text-white px-4 md:px-5 py-2 rounded-full text-[12px] md:text-[13px] font-bold transition-all active:scale-95 shadow-md">
            Hubungi Kami
          </button>
        </div>
      </motion.nav>

      {/* ================= KONTEN UTAMA ================= */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full text-[11px] md:text-[12px] font-bold tracking-widest uppercase border border-white/50 shadow-sm mb-6 text-gray-500"
          >
            ✨ The Wait Is Almost Over
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[2.6rem] md:text-[4.5rem] lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight text-[#111]"
          >
            Your Future Of
            <br />
            <span
              className="text-[3rem] md:text-[5.5rem] lg:text-[6.5rem] font-normal leading-[1] mt-0 md:mt-2 block tracking-normal text-[#e8779b]"
              style={{ fontFamily: "var(--font-calming), cursive" }}
            >
              Skincare Style
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 md:mt-6 text-gray-500 max-w-sm md:max-w-lg text-[14px] md:text-[16px] font-medium leading-relaxed"
          >
            Revolusi Skincare & AI segera hadir. Gabung ke daftar antrean khusus sekarang juga dan
            bersiap temukan personalisasi kulit paling canggih di dunia.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 w-full max-w-[90%] md:max-w-md"
          >
            <div className="bg-white/80 backdrop-blur-xl flex items-center rounded-full p-2 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white">
              <input
                type="email"
                placeholder="Masukkan email..."
                className="bg-transparent w-full px-4 outline-none text-[14px] md:text-[15px] text-[#111] placeholder-gray-400 font-semibold"
              />
              <button className="bg-[#111111] hover:bg-black transition-transform active:scale-95 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-[14px] font-bold whitespace-nowrap shadow-xl">
                Kabari Aku
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
