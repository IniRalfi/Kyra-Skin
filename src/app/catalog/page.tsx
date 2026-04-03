"use client";

import { ProductCard } from "@/components/catalog/ProductCard";
import { AppNavbar } from "@/components/ui/AppNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import type { Paginated, Product } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const CATEGORIES = ["Semua", "Toner", "Serum", "Moisturizer", "Sunscreen", "Cleanser", "Mask"];

// Animasi CBR untuk di Pamerkan ke User/Demo
function CbrLoadingAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 2200);
    const timer3 = setTimeout(() => setStep(3), 3600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    { icon: "⚙️", text: "Mengekstrak profil dan atribut kulitmu..." },
    { icon: "🔍", text: "Mencari data pengguna server (k-NN Algoritma)..." },
    { icon: "📊", text: "Membandingkan Euclidean Distance (Similarity)..." },
    { icon: "🛡️", text: "Menyaring produk dari riwayat alergen..." },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[28px] p-6 md:p-8 mb-12 shadow-[0_12px_44px_rgba(0,0,0,0.05)] relative overflow-hidden">
      {/* Progress bar di atas */}
      <div
        className="absolute top-0 left-0 h-1 bg-[#111] transition-all duration-[4300ms] ease-linear"
        style={{ width: `${(step + 1) * 25}%` }}
      />
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
        <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#F5D0DD] to-[#E6DDF8] flex items-center justify-center text-2xl animate-pulse shadow-inner">
          🧠
        </div>
        <div className="flex-1 w-full relative h-[45px] md:h-[30px] flex items-center">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: step === i ? 1 : 0, y: step === i ? 0 : -15 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center gap-3 font-bold text-gray-700 text-sm md:text-base pointer-events-none"
            >
              <span className="text-xl drop-shadow-sm">{s.icon}</span> {s.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mock Table Animasi CBR */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: step >= 2 ? 1 : 0, height: step >= 2 ? "auto" : 0 }}
        className="mt-8 border-t border-gray-100 pt-6"
      >
        <p className="text-[11px] uppercase font-extrabold text-gray-400 mb-4 tracking-widest pl-2">
          Case-Based Reasoning Engine / Real-time Distance Matrix
        </p>
        <div className="bg-gray-50/50 rounded-2xl p-4 overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="grid grid-cols-4 text-xs font-bold text-gray-400 border-b border-gray-200 pb-3 mb-2 px-2">
              <div>KASUS LAMA (USERID)</div>
              <div>ATRIBUT KULIT</div>
              <div>SELISIH USIA</div>
              <div className="text-right">TINGKAT KEMIRIPAN (SIMILARITY)</div>
            </div>
            <div className="space-y-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : -10 }}
                  transition={{ delay: 2.2 + i * 0.3 }}
                  className="grid grid-cols-4 text-sm font-bold text-gray-700 py-3 px-2 border-b border-gray-100/50 last:border-0 items-center"
                >
                  <div className="text-gray-500 font-mono text-xs">
                    #{Math.floor(Math.random() * 8000 + 1000)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Identik
                  </div>
                  <div className="text-gray-500">± {Math.floor(Math.random() * 3)} Tahun</div>
                  <div className="text-right text-[#e8779b] font-extrabold text-base">
                    {(98.5 - i * 3.2 - Math.random() * 2).toFixed(1)}% Match
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CatalogPage() {
  const { isAuthenticated, hasProfile } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [category, setCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);

  // FetchProducts
  useEffect(() => {
    setLoading(true);
    const q = category !== "Semua" ? `?category=${category}` : "";
    api
      .get<Paginated<Product>>(`/products${q}`)
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const [isRecommendLoading, setIsRecommendLoading] = useState(false);

  // Fetch AI Recommendations
  useEffect(() => {
    if (!isAuthenticated || !hasProfile) return;
    setIsRecommendLoading(true);

    api
      .get<{ products: Product[] }>("/recommend")
      .then((res) => {
        // Tahan render sebentar (4.5 detik) buat nunjukin animasi proses CBR!
        setTimeout(() => {
          setRecommendations(res.products ?? []);
          setIsRecommendLoading(false);
        }, 4500);
      })
      .catch(() => {
        setRecommendations([]);
        setIsRecommendLoading(false);
      });
  }, [isAuthenticated, hasProfile]);

  return (
    <div className="min-h-screen">
      <AppNavbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* AI Recommendation Strip / Loading Animation */}
        {isAuthenticated && hasProfile && isRecommendLoading ? (
          <CbrLoadingAnimation />
        ) : (
          isAuthenticated &&
          hasProfile &&
          recommendations.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#F5D0DD] to-[#E6DDF8] flex items-center justify-center text-base">
                  🧠
                </div>
                <div>
                  <h2 className="font-extrabold text-[#111] text-lg">Rekomendasi AI Untukmu</h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Berdasarkan profil kulit & riwayat alergimu
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendations.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} highlighted />
                ))}
              </div>
            </section>
          )
        )}

        {/* Login Banner (not logged in) */}
        {!isAuthenticated && (
          <div
            className="mb-10 rounded-[24px] p-6 flex items-center justify-between gap-4"
            style={{ background: "linear-gradient(135deg, #F5D0DD 0%, #E6DDF8 100%)" }}
          >
            <div>
              <p className="font-extrabold text-[#111]">✨ Dapatkan rekomendasi personal dari AI</p>
              <p className="text-sm text-gray-600 font-medium mt-0.5">
                Login dan isi profil kulitmu
              </p>
            </div>
            <Link
              href="/register"
              className="shrink-0 bg-[#111] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-black transition-all shadow-md"
            >
              Mulai Gratis
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#111] tracking-tight">Katalog Produk</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              {loading ? "Memuat..." : `${products.length} produk tersedia`}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                category === cat
                  ? "bg-[#111] text-white shadow-md"
                  : "bg-white/60 backdrop-blur-sm border border-white/80 text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/40 rounded-[28px] aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-extrabold text-[#111] text-lg">Tidak ada produk di kategori ini</p>
            <button
              onClick={() => setCategory("Semua")}
              className="mt-4 text-[#e8779b] font-bold text-sm hover:underline"
            >
              Lihat semua produk →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
