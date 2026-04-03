"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

// ── Data ──────────────────────────────────────────────────────────────────────
const SKIN_TYPES = [
  { id: 1, emoji: "🏜️", label: "Kering", desc: "Terasa kencang & bersisik" },
  { id: 2, emoji: "💦", label: "Berminyak", desc: "Mudah mengkilap sepanjang hari" },
  { id: 3, emoji: "🌸", label: "Sensitif", desc: "Mudah iritasi & kemerahan" },
  { id: 4, emoji: "⚖️", label: "Kombinasi", desc: "Berminyak di T-zone, kering di pipi" },
  { id: 5, emoji: "✨", label: "Normal", desc: "Seimbang & jarang bermasalah" },
];

const GENDERS = [
  { id: 1, label: "Pria 👨" },
  { id: 2, label: "Wanita 👩" },
];

// ── Step Indicator ────────────────────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current ? "w-6 h-2 bg-[#e8779b]" : "w-2 h-2 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter();
  const { user, isReady, refreshUser } = useAuth();

  useEffect(() => {
    if (isReady && user?.role === "admin") {
      router.push("/admin/products");
    }
  }, [user, isReady, router]);

  const [step, setStep] = useState(0); // 0, 1, 2
  const [form, setForm] = useState({
    age: "" as string | number,
    gender: 0,
    skin_type: 0,
    skin_concerns: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/profile", {
        age: Number(form.age),
        gender: form.gender,
        skin_type: form.skin_type,
        skin_concerns: form.skin_concerns || null,
      });
      await refreshUser(); // Update state user di context
      router.push("/catalog");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan profil.");
    } finally {
      setLoading(false);
    }
  };

  const canNext = [
    Number(form.age) >= 10 && form.gender > 0, // step 0
    form.skin_type > 0, // step 1
    true, // step 2
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/60 backdrop-blur-2xl rounded-[36px] p-8 md:p-10 border border-white/80 shadow-[0_20px_80px_rgba(0,0,0,0.07)]"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-2xl font-extrabold tracking-tight">
            Kyra<span className="text-[#e8779b]">.</span>
          </span>
          <h1 className="mt-3 text-2xl font-extrabold text-[#111]">Kenali Kulitmu</h1>
          <p className="mt-1.5 text-sm text-gray-500 font-medium">
            Isi profil agar AI Kyra bisa merekomendasikan yang terbaik untukmu
          </p>
        </div>

        <StepDots current={step} total={3} />

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-2xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── Step 0: Usia & Gender ── */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                Langkah 1 — Informasi Dasar
              </p>

              {/* Age */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-[#111] mb-2">Usiamu</label>
                <input
                  type="number"
                  min={10}
                  max={100}
                  placeholder="Contoh: 22"
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                  className="w-full bg-white/60 border border-white rounded-2xl px-4 py-3.5 text-sm font-medium text-[#111] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#F5D0DD] transition-all"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-bold text-[#111] mb-3">Jenis Kelamin</label>
                <div className="grid grid-cols-2 gap-3">
                  {GENDERS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => set("gender", g.id)}
                      className={`py-3.5 rounded-2xl text-sm font-bold border-2 transition-all ${
                        form.gender === g.id
                          ? "bg-[#F5D0DD] border-[#e8779b] text-[#111]"
                          : "bg-white/50 border-white/80 text-gray-600 hover:border-[#F5D0DD]"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 1: Skin Type ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                Langkah 2 — Tipe Kulit
              </p>
              <div className="grid grid-cols-1 gap-3">
                {SKIN_TYPES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => set("skin_type", s.id)}
                    className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-left border-2 transition-all ${
                      form.skin_type === s.id
                        ? "bg-[#F5D0DD]/40 border-[#e8779b]"
                        : "bg-white/50 border-white/80 hover:border-[#F5D0DD]"
                    }`}
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <div>
                      <p className="font-bold text-sm text-[#111]">{s.label}</p>
                      <p className="text-xs text-gray-500 font-medium">{s.desc}</p>
                    </div>
                    {form.skin_type === s.id && (
                      <span className="ml-auto text-[#e8779b] text-lg">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Skin Concerns ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                Langkah 3 — Masalah Kulit (Opsional)
              </p>
              <label className="block text-sm font-bold text-[#111] mb-2">
                Ceritakan masalah kulitmu saat ini
              </label>
              <textarea
                rows={4}
                placeholder="Contoh: Kulit sering kering di pipi, komedo di hidung, kemerahan setelah terkena matahari..."
                value={form.skin_concerns}
                onChange={(e) => set("skin_concerns", e.target.value)}
                className="w-full bg-white/60 border border-white rounded-2xl px-4 py-3.5 text-sm font-medium text-[#111] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#F5D0DD] transition-all resize-none"
              />
              <p className="mt-2 text-xs text-gray-400 font-medium">
                Informasi ini membantu AI memberikan rekomendasi yang lebih akurat.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 py-3.5 rounded-full text-sm font-bold border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-all"
            >
              ← Kembali
            </button>
          )}

          {step < 2 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext[step]}
              className="flex-1 bg-[#111] text-white font-bold py-3.5 rounded-full text-sm hover:bg-black transition-all active:scale-95 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Lanjut →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-[#111] text-white font-bold py-3.5 rounded-full text-sm hover:bg-black transition-all active:scale-95 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Lihat Rekomendasi ✨"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
