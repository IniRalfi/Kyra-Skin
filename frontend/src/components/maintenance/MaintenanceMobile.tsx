"use client";
import { motion } from "framer-motion";

export default function MaintenanceMobile() {
  return (
    // Kelas 'flex md:hidden' artinya komponen ini aktif khusus di HP!
    <div className="flex md:hidden min-h-screen w-full bg-[#FCFBFC] relative overflow-hidden font-jakarta text-[#111111] flex-col items-center justify-center p-6 text-center">
      {/* Background Aurora Minimalis ala Mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-[-5%] right-[-10%] w-[300px] h-[300px] bg-[#c1d7d0] rounded-full mix-blend-multiply filter blur-[80px] opacity-60"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-5%] left-[-10%] w-[350px] h-[350px] bg-[#f5d0dd] rounded-full mix-blend-multiply filter blur-[90px] opacity-40"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 z-10 opacity-70"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(17, 17, 17, 0.1) 1.5px, transparent 1.5px)`,
            backgroundSize: `20px 20px`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 10%, transparent 80%)`,
          }}
        />
      </div>

      <div className="relative z-20 flex flex-col items-center w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-24 h-24 bg-white/80 backdrop-blur-md rounded-[32px] border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center text-4xl mb-8 relative"
        >
          {/* Titik kuning yang menandakan "Server sibuk" */}
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 border-4 border-white animate-pulse"></span>
          🛠️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[2.8rem] font-extrabold text-[#111] leading-[1.05] tracking-tight"
        >
          Sedang
          <br />
          Perbaikan
          <br />
          <span
            className="text-[3.5rem] font-normal text-[#8ab5a5] block leading-none mt-2"
            style={{ fontFamily: "var(--font-calming), cursive" }}
          >
            Sistem AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-[15px] font-semibold text-gray-500 leading-relaxed max-w-xs"
        >
          Kyra sedang dirawat dan AI kami sedang disempurnakan. Segera kembali! 🌸
        </motion.p>
      </div>
    </div>
  );
}
