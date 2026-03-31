"use client";

import { AppNavbar } from "@/components/ui/AppNavbar";
import { api } from "@/lib/api";
import type { Product } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SKIN_LABELS: Record<number, string> = {
  1: "Kering",
  2: "Berminyak",
  3: "Sensitif",
  4: "Kombinasi",
  5: "Normal",
};
const EMOJI: Record<string, string> = {
  Toner: "💧",
  Serum: "✨",
  Moisturizer: "🌿",
  Sunscreen: "☀️",
  Cleanser: "🫧",
  Mask: "🌸",
};
const GRADIENT: Record<string, string> = {
  Toner: "from-[#E6DDF8] to-[#d4c8f5]",
  Serum: "from-[#F5D0DD] to-[#f0b8ce]",
  Moisturizer: "from-[#C1D7D0] to-[#a8c8be]",
  Sunscreen: "from-[#FDE68A] to-[#fcd34d]",
  Cleanser: "from-[#BFDBFE] to-[#93c5fd]",
  Mask: "from-[#FCA5A5] to-[#f87171]",
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api
      .get<Product>(`/products/${id}`)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    // Cart via localStorage (implementasi penuh nanti)
    const cart = JSON.parse(localStorage.getItem("kyra_cart") || "[]");
    const existing = cart.find((i: { id: number }) => i.id === product!.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("kyra_cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#F5D0DD] border-t-[#e8779b] animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-gray-500">Memuat produk...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-6xl mb-4">🌸</p>
          <p className="font-extrabold text-[#111] text-xl mb-3">Produk tidak ditemukan</p>
          <Link href="/catalog" className="text-[#e8779b] font-bold text-sm hover:underline">
            ← Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const emoji = EMOJI[product.category] ?? "🧴";
  const gradient = GRADIENT[product.category] ?? "from-[#F5D0DD] to-[#E6DDF8]";

  return (
    <div className="min-h-screen">
      <AppNavbar />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors mb-10"
        >
          ← Kembali ke Katalog
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`rounded-[40px] aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center text-9xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]`}
          >
            {emoji}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#111] mt-2 mb-4 leading-snug">
              {product.name}
            </h1>
            <p className="text-3xl font-extrabold text-[#111] mb-5">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            <p className="text-sm text-gray-600 font-medium leading-relaxed mb-7">
              {product.description}
            </p>

            {/* Suitable For */}
            {product.suitable_for.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2.5">
                  Cocok untuk tipe kulit
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.suitable_for.map((t) => (
                    <span
                      key={t}
                      className="bg-[#C1D7D0]/40 text-[#3a7a6e] text-xs font-bold px-3.5 py-1.5 rounded-full"
                    >
                      {SKIN_LABELS[t]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <p
              className={`text-sm font-bold mb-6 ${product.stock > 0 ? "text-[#3a7a6e]" : "text-red-400"}`}
            >
              {product.stock > 0 ? `✓ Tersedia (${product.stock} stok)` : "✗ Stok Habis"}
            </p>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full font-bold py-4 rounded-full text-sm transition-all active:scale-95 shadow-xl ${
                added
                  ? "bg-[#3a7a6e] text-white"
                  : "bg-[#111] text-white hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {added ? "✓ Ditambahkan ke Keranjang!" : "Tambah ke Keranjang 🛒"}
            </button>
          </motion.div>
        </div>

        {/* Ingredients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white/60 backdrop-blur-xl rounded-[28px] p-8 border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.04)]"
        >
          <h2 className="font-extrabold text-[#111] text-lg mb-5">
            🧪 Kandungan Bahan (Ingredients)
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ing) => (
              <span
                key={ing}
                className="bg-white/80 border border-white/80 text-xs font-semibold text-gray-600 px-3.5 py-1.5 rounded-full"
              >
                {ing}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
