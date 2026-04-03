"use client";
import { motion } from "framer-motion";

export default function GlobalBackground() {
  return (
    // Gunakan 'fixed z-[-1]' biar dia mengunci di latar belakang paling belakang layar terus
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#fcfbfc] overflow-hidden">
      {/* 🔴 Aurora Blobs Layer */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#ff8cb8] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[140px] opacity-40"
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

      {/* 🔴 Titik-Titik Aesthetic */}
      <div
        className="absolute inset-0 z-10 opacity-70"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(17, 17, 17, 0.1) 1.5px, transparent 1.5px)`,
          backgroundSize: `20px 20px`,
          WebkitMaskImage: `radial-gradient(ellipse at center, black 10%, transparent 75%)`,
          maskImage: `radial-gradient(ellipse at center, black 10%, transparent 75%)`,
        }}
      />
    </div>
  );
}
