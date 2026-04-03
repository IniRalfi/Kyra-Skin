"use client";
import { motion } from "framer-motion";

export default function MaintenanceMobile() {
  return (
    <div className="flex md:hidden min-h-screen w-full relative flex-col items-center justify-center p-6 text-center">
      <div className="relative z-20 flex flex-col items-center w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-20 h-20 bg-white/80 backdrop-blur-md rounded-[24px] border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center text-3xl mb-6 relative"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 border-4 border-white animate-pulse"></span>
          🛠️
        </motion.div>

        {/* Dikecilin ukurannya */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[2.4rem] font-extrabold text-[#111] leading-[1.05] tracking-tight"
        >
          Sedang
          <br />
          Perbaikan
          <br />
          <span
            className="text-[3rem] font-normal text-[#8ab5a5] block leading-none mt-2"
            style={{ fontFamily: "var(--font-calming), cursive" }}
          >
            Sistem AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 text-[14px] font-semibold text-gray-500 leading-relaxed max-w-xs"
        >
          Kyra sedang dirawat dan AI kami sedang disempurnakan. Segera kembali! 🌸
        </motion.p>
      </div>
    </div>
  );
}
