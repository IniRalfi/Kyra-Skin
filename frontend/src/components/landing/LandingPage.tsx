"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease } },
});

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="fixed top-0 w-full z-50 px-4 md:px-8 py-4"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-white">
        <span className="text-2xl font-extrabold tracking-tight">
          Kyra<span className="text-[#e8779b]">.</span>
        </span>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
          <a href="#features" className="hover:text-gray-800 transition-colors">
            Fitur
          </a>
          <a href="#how-it-works" className="hover:text-gray-800 transition-colors">
            Cara Kerja
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="bg-[#111] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-black transition-all active:scale-95 shadow-md"
          >
            Coba Gratis
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

// ── Floating Product Card ─────────────────────────────────────────────────────
function FloatingCard({
  emoji,
  name,
  category,
  rotate,
  yAnim,
  delay,
  className,
}: {
  emoji: string;
  name: string;
  category: string;
  rotate: number;
  yAnim: number[];
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, rotate, y: yAnim }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute bg-white/65 backdrop-blur-xl rounded-[28px] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/80 ${className}`}
    >
      <div
        className="w-full aspect-square rounded-[20px] flex items-center justify-center text-5xl mb-3"
        style={{ background: "linear-gradient(135deg, #F5D0DD 0%, #E6DDF8 100%)" }}
      >
        {emoji}
      </div>
      <p className="font-bold text-[#111] text-sm leading-tight">{name}</p>
      <p className="text-[11px] text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">
        {category}
      </p>
    </motion.div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-28 pb-20 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto relative">
        {/* Floating Cards — Desktop Only */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <FloatingCard
            emoji="🌸"
            name="Niacinamide Toner"
            category="Toner"
            rotate={-10}
            yAnim={[0, -22, 0]}
            delay={0.4}
            className="w-44 top-8 left-4"
          />
          <FloatingCard
            emoji="💧"
            name="Ceramide Serum"
            category="Serum"
            rotate={7}
            yAnim={[0, 18, 0]}
            delay={0.6}
            className="w-40 bottom-8 right-4"
          />
          <FloatingCard
            emoji="☀️"
            name="SPF 50+ Sunscreen"
            category="Sunscreen"
            rotate={-5}
            yAnim={[0, -15, 0]}
            delay={0.8}
            className="w-36 top-1/2 -translate-y-1/2 right-20"
          />
        </div>

        {/* Content */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-white/50 rounded-full px-5 py-2 text-[11px] font-bold tracking-widest uppercase text-gray-500 shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#e8779b] animate-pulse" />
            Didukung AI Case-Based Reasoning
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp(0.3)}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-[5.5rem] font-extrabold tracking-tight text-[#111] leading-[1.05]"
          >
            Kulit Sehat,
            <br />
            <span
              className="font-normal text-[#e8779b]"
              style={{ fontFamily: "var(--font-calming), cursive", fontSize: "1.1em" }}
            >
              Bukan Kebetulan.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp(0.4)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium"
          >
            Kyra menganalisis profil kulitmu—usia, jenis kulit, riwayat alergi—lalu merekomendasikan{" "}
            <em>skincare</em> yang benar-benar cocok, bukan sekadar iklan.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp(0.5)}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="bg-[#111] text-white font-bold px-9 py-4 rounded-full text-sm hover:bg-black transition-all active:scale-95 shadow-xl hover:shadow-2xl"
            >
              Mulai Gratis →
            </Link>
            <Link
              href="/catalog"
              className="bg-white/70 backdrop-blur-md text-[#111] font-bold px-9 py-4 rounded-full text-sm border border-white hover:bg-white/90 transition-all active:scale-95 shadow-sm"
            >
              Lihat Katalog
            </Link>
          </motion.div>

          {/* Micro proof */}
          <motion.p
            variants={fadeUp(0.6)}
            initial="hidden"
            animate="visible"
            className="mt-8 text-xs text-gray-400 font-semibold"
          >
            ✨ 10 produk premium tersedia &nbsp;·&nbsp; Filter alergi otomatis &nbsp;·&nbsp; 100%
            Gratis
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "🧠",
    gradient: "from-[#E6DDF8] to-[#d4c8f5]",
    title: "AI yang Sungguh Mengenalmu",
    desc: "KNN & Euclidean Distance menganalisis ribuan profil kulit serupa untuk menemukan rekomendasi yang terbukti cocok—bukan tebak-tebakan.",
  },
  {
    icon: "🛡️",
    gradient: "from-[#F5D0DD] to-[#f0b8ce]",
    title: "Perlindungan Alergi Otomatis",
    desc: "Sistem menghindari otomatis produk dengan bahan pemicu alergimu. Tidak ada lagi kejutan tidak menyenangkan di kulitmu.",
  },
  {
    icon: "🌿",
    gradient: "from-[#C1D7D0] to-[#a8c8be]",
    title: "Produk Transparan & Terpercaya",
    desc: "Setiap produk dilengkapi data ingredients yang lengkap. Kamu tahu persis apa yang akan kamu pakai di kulitmu.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111] tracking-tight">
            Mengapa{" "}
            <span className="text-[#e8779b]" style={{ fontFamily: "var(--font-calming)" }}>
              Kyra?
            </span>
          </h2>
          <p className="mt-4 text-gray-500 font-medium text-base max-w-md mx-auto">
            Bukan sekadar toko. Konsultan kulit cerdasmu.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/60 backdrop-blur-xl rounded-[28px] p-8 border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.05)] cursor-default"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl mb-6`}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-extrabold text-[#111] mb-3 leading-snug">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Isi Profil Kulitmu",
    desc: "Jawab kuesioner singkat: usia, jenis kulit, dan masalah kulit yang ingin kamu atasi. Butuh kurang dari 2 menit.",
  },
  {
    num: "02",
    title: "Biarkan AI Bekerja",
    desc: "Kyra mencari pengguna dengan profil serupa menggunakan KNN, lalu menemukan produk yang terbukti berhasil untuk mereka.",
  },
  {
    num: "03",
    title: "Belanja dengan Yakin",
    desc: "Katalog sudah dipersonalisasi. Filter alergi aktif otomatis. Produk diurutkan berdasarkan tingkat kecocokan kulitmu.",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111] tracking-tight">
            Cara Kerja Kyra
          </h2>
          <p className="mt-4 text-gray-500 font-medium">
            Tiga langkah. Satu tujuan: kulit yang lebih sehat.
          </p>
        </motion.div>

        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex items-center gap-7 bg-white/60 backdrop-blur-xl rounded-[24px] p-7 border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <div
                className="text-5xl font-extrabold leading-none shrink-0 w-16 text-center"
                style={{ color: "#F5D0DD" }}
              >
                {s.num}
              </div>
              <div>
                <h3 className="font-extrabold text-[#111] text-lg mb-1.5">{s.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center rounded-[40px] p-14 shadow-[0_24px_80px_rgba(245,208,221,0.45)]"
        style={{ background: "linear-gradient(135deg, #F5D0DD 0%, #E6DDF8 60%, #C1D7D0 100%)" }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111] leading-tight tracking-tight">
          Siap menemukan
          <br />
          <span style={{ fontFamily: "var(--font-calming), cursive" }} className="text-[#b05a7a]">
            skincare terbaikmu?
          </span>
        </h2>
        <p className="mt-5 text-gray-600 font-medium max-w-sm mx-auto text-base leading-relaxed">
          Daftar gratis, isi profil kulitmu, dan biarkan AI Kyra bekerja untukmu.
        </p>
        <Link
          href="/register"
          className="inline-block mt-9 bg-[#111] text-white font-bold px-10 py-4 rounded-full text-sm hover:bg-black transition-all active:scale-95 shadow-xl"
        >
          Buat Akun Gratis →
        </Link>
      </motion.div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-6 text-center border-t border-black/5">
      <p className="text-base font-extrabold text-[#111]">
        Kyra<span className="text-[#e8779b]">.</span>
      </p>
      <p className="text-xs text-gray-400 mt-1.5 font-medium">
        © 2026 Kyra — Smart Skincare E-Commerce
      </p>
    </footer>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
