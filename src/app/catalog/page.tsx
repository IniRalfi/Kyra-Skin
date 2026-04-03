"use client";

import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/api";
import Image from "next/image";
import GlobalBackground from "@/components/ui/GlobalBackground";
import { AppNavbar } from "@/components/ui/AppNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  matchRate?: number;
}

interface SimilarCase {
  caseId: number;
  name: string;
  age: number;
  skinType: number;
  concerns: string[];
  similarity: number;
  distance: number;
}

// 🍿 MOCK DATA UNTUK ANIMASI AWAL BIAR GAK 0% MANGKRAB
const MOCK_SCAN_NAMES = [
  "Budi Santoso",
  "Siti Aminah",
  "Asep Sunandar",
  "Dewi Sartika",
  "Raffi Ahmad",
  "Nagita Slavina",
];

// Komponen Animasi Proses CBR (Intelligence Loading)
function AIProcessingLoader({
  similarCases,
  realDataLoaded,
}: {
  similarCases: SimilarCase[];
  realDataLoaded: boolean;
}) {
  const [step, setStep] = useState(0);
  const [randomNameIndex, setRandomNameIndex] = useState(0);
  const [realCaseIndex, setRealCaseIndex] = useState(0);

  const steps = [
    "Memvalidasi Biometrik Kamu...",
    "Mencari Kembaran Kulit di Basis Data...",
    "Ekstraksi Jarak Euclidean...",
    "Memetakan Kasus Sukses Produk...",
    "Rangkaian Selesai!",
  ];

  useEffect(() => {
    const sInt = setInterval(() => setStep((s) => (s < steps.length - 1 ? s + 1 : s)), 900);
    const mInt = setInterval(() => {
      if (realDataLoaded) setRealCaseIndex((i) => (i + 1) % similarCases.length);
      else setRandomNameIndex((i) => (i + 1) % MOCK_SCAN_NAMES.length);
    }, 200);

    return () => {
      clearInterval(sInt);
      clearInterval(mInt);
    };
  }, [steps.length, similarCases.length, realDataLoaded]);

  const currentName = realDataLoaded
    ? similarCases[realCaseIndex]?.name
    : MOCK_SCAN_NAMES[randomNameIndex];
  const currentSim = realDataLoaded
    ? similarCases[realCaseIndex]?.similarity || 88
    : Math.floor(Math.random() * 30) + 60;

  return (
    <div className="bg-white/40 backdrop-blur-3xl border border-white/80 rounded-[48px] p-10 mb-16 shadow-[0_30px_70px_rgba(0,0,0,0.04)] animate-in fade-in zoom-in-95 duration-1000 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/30 blur-[120px] -z-10 group-hover:scale-125 transition-transform duration-1000" />

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] bg-[#111] flex items-center justify-center text-4xl shadow-2xl relative z-10">
            🧠
          </div>
          <div className="absolute inset-0 bg-[#e8779b] rounded-[32px] blur-xl opacity-20 animate-pulse" />
          <div className="absolute -top-2 -right-2 bg-[#e8779b] text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest z-20">
            Live AI
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <span className="text-[10px] font-black text-[#e8779b] uppercase tracking-[0.4em]">
              Kyra CBR Engine v2.5
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full bg-[#e8779b] ${i === step % 3 ? "opacity-100" : "opacity-20"}`}
                />
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-black text-[#111] tracking-tight">{steps[step]}</h3>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start items-center">
            <div className="bg-white/80 px-5 py-2.5 rounded-2xl border border-white text-[11px] font-bold text-gray-400 shadow-sm flex items-center gap-3">
              <span>🔍 Membandingkan:</span>
              <span className="text-[#e8779b] font-black uppercase">{currentName}</span>
              <span className="bg-pink-50 text-[#e8779b] px-2 py-0.5 rounded-lg">
                {currentSim}% Similarity
              </span>
            </div>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
              {realDataLoaded ? "✓ Data Siap" : "• Sedang Memindai Kasus..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [similarCases, setSimilarCases] = useState<SimilarCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const fetchRecommendations = async () => {
    setIsAiLoading(true);
    try {
      const res = await api.get<{ products: Product[]; similarCases: SimilarCase[] }>("/recommend");
      // Simulasi delay sedikit biar berasa Mikirnya
      setTimeout(() => {
        setRecommendations(res.products || []);
        setSimilarCases(res.similarCases || []);
        setIsAiLoading(false);
      }, 4500);
    } catch (err) {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    api
      .get<Product[]>("/products")
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
    if (isAuthenticated) fetchRecommendations();
  }, [isAuthenticated]);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("kyra_cart") || "[]");
    const existing = cart.find((i: any) => i.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("kyra_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-update"));
  };

  return (
    <div className="min-h-screen relative z-10 font-jakarta selection:bg-pink-100">
      <AppNavbar />
      <GlobalBackground />

      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <header className="mb-14 flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <h1 className="text-5xl font-black text-[#111] mb-2 tracking-tighter">
              Etalase Kyra-Skin
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px]">
              Dermatologi Modern di Genggamanmu
            </p>
          </div>
          <div className="hidden md:flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-12 h-1 bg-gray-100 rounded-full" />
            ))}
          </div>
        </header>

        {/* SECTION: Rekomendasi AI (CBR Visualizer) */}
        <AnimatePresence>
          {isAuthenticated && isAiLoading && (
            <AIProcessingLoader
              similarCases={similarCases}
              realDataLoaded={similarCases.length > 0}
            />
          )}

          {isAuthenticated && !isAiLoading && recommendations.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-24"
            >
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-3xl bg-[#111] flex items-center justify-center text-2xl shadow-xl">
                    🧠
                  </div>
                  <div>
                    <h2 className="font-black text-2xl text-[#111] tracking-tight">
                      Rangkuman AI CBR Kamu
                    </h2>
                    <p className="text-[10px] font-black text-[#e8779b] uppercase tracking-[0.3em] mt-1">
                      Berdasarkan Analisis Top 10 Kasus Serupa
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReport(true)}
                  className="px-6 py-4 bg-white/60 hover:bg-white border border-white rounded-3xl text-[10px] font-black uppercase tracking-widest text-[#e8779b] transition-all shadow-sm flex items-center gap-2 active:scale-95"
                >
                  <span>💎 Lihat Laporan CBR</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recommendations.map((p) => (
                  <ProductItem
                    key={p.id}
                    product={p}
                    isAi
                    onAdd={() => addToCart(p)}
                    onShowCbr={() => setShowReport(true)}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Katalog Lengkap */}
        <div className="relative">
          <div className="flex items-center gap-5 mb-10">
            <div className="h-[1px] flex-1 bg-gray-100" />
            <h2 className="font-black text-xl text-[#111] uppercase tracking-widest px-6 py-3 bg-white/40 backdrop-blur-md rounded-2xl border border-white">
              Katalog Lengkap
            </h2>
            <div className="h-[1px] flex-1 bg-gray-100" />
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-white/40 rounded-[40px] animate-pulse border border-white"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((p) => (
                <ProductItem key={p.id} product={p} onAdd={() => addToCart(p)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 📊 MULTI-CASE CBR REPORT MODAL 📊 */}
      <AnimatePresence>
        {showReport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReport(false)}
              className="absolute inset-0 bg-[#1d060d]/90 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative bg-white/95 rounded-[64px] p-8 md:p-14 w-full max-w-6xl shadow-2xl border border-white max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col md:flex-row gap-12"
            >
              {/* Sisi Kiri: Ringkasan Analisis */}
              <div className="w-full md:w-1/3 space-y-10">
                <div className="space-y-4">
                  <span className="bg-[#e8779b] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    Neural Report
                  </span>
                  <h3 className="text-5xl font-black text-[#111] tracking-tighter leading-none">
                    CBR Insight
                  </h3>
                  <p className="text-sm font-bold text-gray-400">
                    Analisis Kemiripan Basis Kasus dalam Jaringan Kyra-Skin.
                  </p>
                </div>

                <div className="bg-[#111] p-10 rounded-[48px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#e8779b] blur-[80px] opacity-20" />
                  <p className="text-[10px] font-black text-[#e8779b] uppercase tracking-[0.3em] mb-6">
                    Metodologi
                  </p>
                  <p className="text-sm font-medium text-gray-300 leading-loose">
                    Kami membandingkan profil biologis Anda dengan **{similarCases.length} Kasus
                    Serupa** di database kami menggunakan nilai **Euclidean Distance**. Jarak
                    terkecil menunjukkan kemiripan tertinggi.
                  </p>
                </div>

                <button
                  onClick={() => setShowReport(false)}
                  className="w-full py-5 rounded-3xl bg-gray-50 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-black hover:text-white transition-all"
                >
                  Tutup Laporan
                </button>
              </div>

              {/* Sisi Kanan: Tabel Top 10 Kasus */}
              <div className="flex-1 bg-white/60 rounded-[48px] border border-white p-8 overflow-hidden flex flex-col shadow-inner">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-[11px] font-black text-[#111] uppercase tracking-[0.3em]">
                    Top 10 Similar Cases
                  </p>
                  <span className="text-[9px] font-black text-[#e8779b] bg-pink-50 px-3 py-1 rounded-full uppercase">
                    Database Scan Terdeteksi
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                  {similarCases.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-6 bg-white/90 rounded-3xl border border-gray-50 hover:border-pink-200 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-[#e8779b] group-hover:bg-[#e8779b] group-hover:text-white transition-colors">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-black text-base text-[#111]">{c.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Usia {c.age} Tahun ·{" "}
                            {c.skinType === 1
                              ? "🏜️ Kering"
                              : c.skinType === 2
                                ? "💦 Minyak"
                                : c.skinType === 3
                                  ? "🌸 Sensitif"
                                  : "✨ Normal"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-[#111] tracking-tighter">
                          {c.similarity}% Match
                        </p>
                        <p className="text-[10px] font-black text-[#e8779b] uppercase tracking-widest">
                          Jarak: {c.distance.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-Komponen Kartu Produk
function ProductItem({
  product,
  isAi,
  onAdd,
  onShowCbr,
}: {
  product: Product;
  isAi?: boolean;
  onAdd: () => void;
  onShowCbr?: () => void;
}) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div
      className={`group bg-white/80 backdrop-blur-xl rounded-[48px] border ${isAi ? "border-[#e8779b]/30 shadow-[0_20px_50px_rgba(232,119,155,0.06)]" : "border-white"} p-6 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform relative`}
    >
      <div className="relative aspect-square rounded-[36px] overflow-hidden mb-8 bg-[#fdf2f5]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-4xl grayscale opacity-20">
            🧴
          </div>
        )}
        {isAi && (
          <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-pink-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111] animate-pulse" />
            <span className="text-[11px] font-black text-[#111] uppercase tracking-widest">
              {product.matchRate}% Match
            </span>
          </div>
        )}
      </div>

      <div className="px-3">
        <p className="text-[11px] font-black text-[#e8779b] uppercase tracking-widest mb-1.5">
          {product.category}
        </p>
        <h3 className="font-black text-lg text-[#111] mb-2 truncate tracking-tight">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mt-6">
          <p className="font-black text-[#111] text-xl tracking-tighter">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          {isAi && (
            <button
              onClick={onShowCbr}
              className="w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-xl hover:bg-[#e8779b] hover:text-white hover:border-[#e8779b] transition-all shadow-sm active:scale-90"
            >
              📊
            </button>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className={`w-full mt-8 py-4.5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl ${
            product.stock === 0
              ? "bg-gray-100 text-gray-400"
              : added
                ? "bg-green-500 text-white"
                : "bg-[#111] text-white hover:bg-[#e8779b] shadow-black/5"
          }`}
        >
          {product.stock === 0 ? "Habis" : added ? "Berhasil" : "Beli Produk"}
        </button>
      </div>
    </div>
  );
}
