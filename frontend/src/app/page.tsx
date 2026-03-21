"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Komponen teks animasi per-huruf (stagger reveal)
function AnimatedWord({ word, delay = 0 }: { word: string; delay?: number }) {
  const letters = Array.from(word);
  return (
    <span className="inline-flex overflow-hidden">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Komponen badge tooltip kecil di samping teks (seperti di gambar)
function FloatingBadge({
  label,
  style,
  delay,
}: {
  label: string;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute z-20 px-4 py-1.5 rounded-full text-sm font-medium"
      style={{
        background: "rgba(242, 216, 213, 0.85)",
        color: "#7a3d3d",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(242, 216, 213, 0.5)",
        fontFamily: "var(--font-jakarta), sans-serif",
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "backOut" }}
    >
      {label}
    </motion.div>
  );
}

export default function ComingSoon() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const lines = [
    { text: "Something", delay: 0.1 },
    { text: "Beautiful", delay: 0.3 },
    { text: "Is Coming", delay: 0.5 },
    { text: "Soon", delay: 0.7 },
  ];

  const badges = [
    { label: "Skincare Rekomendasi", style: { top: "18%", left: "5%" }, delay: 1.1 },
    { label: "AI-Powered", style: { top: "36%", right: "6%" }, delay: 1.3 },
    { label: "Personalized for You", style: { bottom: "30%", left: "4%" }, delay: 1.5 },
    { label: "Kyra Skin ✨", style: { bottom: "18%", right: "8%" }, delay: 1.7 },
  ];

  return (
    <main
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#fdfbf7" }}
    >
      {/* ===================== DOT PATTERN ===================== */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #d4a0a0 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      {/* ===================== PINK VIGNETTE ===================== */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(242, 180, 175, 0.55) 80%, rgba(220, 120, 120, 0.5) 100%)`,
        }}
      />

      {/* ===================== PARALLAX GLOW BLOB (ngikutin mouse) ===================== */}
      <motion.div
        className="absolute z-0 rounded-full blur-[120px] pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(242, 160, 155, 0.3) 0%, transparent 70%)",
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
        }}
        animate={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />

      {/* ===================== FLOATING BADGES ===================== */}
      {badges.map((badge, i) => (
        <FloatingBadge key={i} label={badge.label} style={badge.style} delay={badge.delay} />
      ))}

      {/* ===================== KONTEN UTAMA ===================== */}
      <div className="relative z-10 flex flex-col items-start px-8 md:px-20 w-full max-w-5xl">
        {/* Brand Label */}
        <motion.p
          className="text-sm tracking-widest uppercase mb-6 opacity-60"
          style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#7a3d3d" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.6, delay: 0.0 }}
        >
          Kyra — Smart Skincare
        </motion.p>

        {/* Teks Besar Utama pakai font Calmingly */}
        <div
          className="leading-none mb-8 select-none"
          style={{
            fontFamily: "var(--font-calming), cursive",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            color: "#2d3748",
            lineHeight: 1.05,
          }}
        >
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <AnimatedWord word={line.text} delay={line.delay} />
            </div>
          ))}
        </div>

        {/* Garis pemisah */}
        <motion.div
          className="w-20 h-px mb-6"
          style={{ background: "rgba(122, 61, 61, 0.3)" }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />

        {/* Deskripsi */}
        <motion.p
          className="text-base md:text-lg max-w-sm leading-relaxed mb-10"
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            color: "#7a3d3d",
            opacity: 0.8,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
        >
          Rekomendasi skincare yang cerdas & personal, hadir untukmu sebentar lagi.
        </motion.p>

        {/* Email Notify Form */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <input
            type="email"
            placeholder="Masukkan email kamu..."
            className="flex-1 px-5 py-3 rounded-full outline-none text-sm"
            style={{
              background: "rgba(253, 251, 247, 0.8)",
              border: "1.5px solid rgba(242, 216, 213, 0.9)",
              color: "#2d3748",
              fontFamily: "var(--font-jakarta), sans-serif",
              backdropFilter: "blur(6px)",
            }}
          />
          <motion.button
            className="px-7 py-3 rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #e8a0a0, #d4707a)",
              color: "#fff",
              fontFamily: "var(--font-jakarta), sans-serif",
              border: "none",
              boxShadow: "0 4px 20px rgba(212, 112, 122, 0.35)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 6px 28px rgba(212, 112, 122, 0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            Beritahu Aku 🌸
          </motion.button>
        </motion.div>
      </div>

      {/* ===================== FOOTER BAWAH ===================== */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 flex justify-between items-end px-8 md:px-20 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <p
          className="text-xs opacity-40"
          style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#2d3748" }}
        >
          © 2026 Kyra. All rights reserved.
        </p>
        <p
          className="text-xs opacity-40"
          style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#2d3748" }}
        >
          Made with ♥ in Indonesia
        </p>
      </motion.div>
    </main>
  );
}
