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

  // Fetch AI Recommendations
  useEffect(() => {
    if (!isAuthenticated || !hasProfile) return;
    api
      .get<{ products: Product[] }>("/recommend")
      .then((res) => setRecommendations(res.products ?? []))
      .catch(() => setRecommendations([]));
  }, [isAuthenticated, hasProfile]);

  return (
    <div className="min-h-screen">
      <AppNavbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* AI Recommendation Strip */}
        {isAuthenticated && hasProfile && recommendations.length > 0 && (
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
