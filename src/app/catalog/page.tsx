"use client";

import { useEffect, useState } from "react";
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
}

// Komponen Animasi Proses CBR (Intelligence Loading)
function AIProcessingLoader() {
  const [step, setStep] = useState(0);
  const steps = [
    "Mengekstrak profil biologis kulitmumu...",
    "Mencari kemiripan kasus di server (k-NN)...",
    "Menghitung Euclidean Distance...",
    "Menyaring bahan aktif yang aman...",
  ];

  useEffect(() => {
    const int = setInterval(() => setStep((s) => (s + 1) % steps.length), 1200);
    return () => clearInterval(int);
  }, [steps.length]);

  return (
    <div className="bg-white/40 backdrop-blur-2xl border border-white rounded-[32px] p-8 mb-12 shadow-sm animate-in fade-in duration-700">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-full bg-[#111] flex items-center justify-center text-2xl animate-spin-slow">
          🧠
        </div>
        <div>
          <p className="text-[10px] font-black text-[#e8779b] uppercase tracking-widest mb-1">
            Kyra AI Engine
          </p>
          <p className="text-sm font-bold text-[#111] animate-pulse">{steps[step]}</p>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const { isAuthenticated, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    // 1. Ambil Katalog Umum
    api
      .get<Product[]>("/products")
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));

    // 2. Ambil Rekomendasi AI (Jika Login)
    if (isAuthenticated) {
      setIsAiLoading(true);
      api
        .get<{ products: Product[] }>("/recommend")
        .then((res) => {
          // Kasih delay biar animasinya kelihatan keren/mikir
          setTimeout(() => {
            setRecommendations(res.products || []);
            setIsAiLoading(false);
          }, 3500);
        })
        .catch(() => setIsAiLoading(false));
    }
  }, [isAuthenticated]);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("kyra_cart") || "[]");
    const existing = cart.find((i: any) => i.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("kyra_cart", JSON.stringify(cart));
    // Trigger custom event supaya Navbar sadar ada perubahan (Instan & Ringan)
    window.dispatchEvent(new Event("cart-update"));
  };

  return (
    <div className="min-h-screen relative z-10">
      <AppNavbar />
      <GlobalBackground />

      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-[#111] mb-3 leading-tight">Etalase Kyra-Skin</h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            Pilih Senjata Rahasia Kulit Cantikmu
          </p>
        </header>

        {/* SECTION: Rekomendasi AI Personal */}
        <AnimatePresence>
          {isAuthenticated && isAiLoading && <AIProcessingLoader />}

          {isAuthenticated && !isAiLoading && recommendations.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#111] text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">
                  Top AI Match 🧠
                </span>
                <h2 className="font-black text-[#111] text-xl">Spesial Untuk Kamu</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {recommendations.slice(0, 4).map((p) => (
                  <ProductItem key={p.id} product={p} isAi onAdd={() => addToCart(p)} />
                ))}
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#f5d0dd] to-transparent mt-16 opacity-50" />
            </motion.section>
          )}
        </AnimatePresence>

        {/* SECTION: Semua Produk */}
        <div className="mb-8">
          <h2 className="font-black text-[#111] text-xl mb-6">Katalog Lengkap</h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-white/40 rounded-[32px] animate-pulse border border-white"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductItem key={p.id} product={p} onAdd={() => addToCart(p)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-Komponen Kartu Produk
function ProductItem({
  product,
  isAi,
  onAdd,
}: {
  product: Product;
  isAi?: boolean;
  onAdd: () => void;
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={`group bg-white/70 backdrop-blur-md rounded-[32px] border ${isAi ? "border-[#e8779b]/40 shadow-[0_8px_30px_rgba(232,119,155,0.1)]" : "border-white/80"} p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 will-change-transform`}
    >
      <div className="relative aspect-square rounded-[24px] overflow-hidden mb-5 bg-[#fdf2f5]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-4xl grayscale opacity-30">
            🧴
          </div>
        )}
        {isAi && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-pink-100 flex items-center gap-1.5">
            <span className="animate-pulse w-2 h-2 rounded-full bg-[#e8779b]" />
            <span className="text-[10px] font-black text-[#e8779b] uppercase tracking-widest">
              98% Match
            </span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
              Habis Terjual
            </span>
          </div>
        )}
      </div>

      <div className="px-2">
        <p className="text-[10px] font-black text-[#e8779b] uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="font-bold text-[#111] mb-2 truncate text-sm md:text-base leading-tight">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <p className="font-black text-[#111]">Rp {product.price.toLocaleString("id-ID")}</p>
          <p className="text-[9px] font-bold text-gray-400">Sisa: {product.stock}</p>
        </div>

        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className={`w-full mt-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
            product.stock === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : added
                ? "bg-green-500 text-white"
                : "bg-[#111] text-white hover:bg-[#e8779b] shadow-black/5"
          }`}
        >
          {product.stock === 0 ? "Kosong" : added ? "Sip! Masuk Keranjang" : "Beli Sekarang"}
        </button>
      </div>
    </div>
  );
}
