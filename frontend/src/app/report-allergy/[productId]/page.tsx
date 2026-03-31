"use client";

import { AppNavbar } from "@/components/ui/AppNavbar";
import { api } from "@/lib/api";
import type { Product } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EMOJI: Record<string, string> = {
  Toner: "💧",
  Serum: "✨",
  Moisturizer: "🌿",
  Sunscreen: "☀️",
  Cleanser: "🫧",
  Mask: "🌸",
};

export default function ReportAllergyPage() {
  const { productId } = useParams<{ productId: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [reaction, setReaction] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get<Product>(`/products/${productId}`).then(setProduct).catch(console.error);
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reaction.trim()) {
      setError("Deskripsikan reaksi alergimu terlebih dahulu.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await api.post("/allergies", {
        product_id: productId,
        reaction_details: reaction,
      });
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal mengirim laporan.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-sm"
        >
          <div className="text-6xl mb-5">🛡️</div>
          <h2 className="text-2xl font-extrabold text-[#111] mb-3">Laporan Diterima!</h2>
          <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
            AI Kyra akan mempelajari reaksi ini dan memastikan produk dengan bahan serupa tidak lagi
            muncul di rekomendasimu.
          </p>
          <Link
            href="/orders"
            className="inline-block bg-[#111] text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-black transition-all shadow-xl"
          >
            Kembali ke Pesanan
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="max-w-lg mx-auto px-6 pt-28 pb-20">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors mb-8"
        >
          ← Kembali ke Pesanan
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-2xl rounded-[32px] p-8 border border-white/80 shadow-[0_20px_80px_rgba(0,0,0,0.07)]"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#F5D0DD] to-[#E6DDF8] flex items-center justify-center text-3xl mx-auto mb-4">
              {product ? (EMOJI[product.category] ?? "🧴") : "🧴"}
            </div>
            <h1 className="text-2xl font-extrabold text-[#111]">Laporkan Reaksi Alergi</h1>
            {product && (
              <p className="mt-1.5 text-sm text-gray-500 font-medium line-clamp-1 px-4">
                {product.name}
              </p>
            )}
          </div>

          {/* Warning Banner */}
          <div className="bg-[#FDE68A]/30 border border-[#fcd34d]/40 rounded-2xl p-4 mb-6">
            <p className="text-xs font-bold text-yellow-700 mb-1">⚠️ Mengapa ini penting?</p>
            <p className="text-xs text-yellow-600 font-medium leading-relaxed">
              Laporan ini digunakan AI Kyra untuk belajar dan melindungi pengguna lain dengan profil
              kulit serupa dari bahan yang sama di masa depan.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-2xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#111] mb-2">
                Deskripsikan reaksimu
              </label>
              <textarea
                rows={5}
                placeholder="Contoh: Kulit saya kemerahan dan terasa gatal sekitar 2 jam setelah pemakaian. Reaksi terjadi di area pipi kiri dan kanan..."
                value={reaction}
                onChange={(e) => setReaction(e.target.value)}
                className="w-full bg-white/60 border border-white rounded-2xl px-4 py-3.5 text-sm font-medium text-[#111] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#F5D0DD] transition-all resize-none"
              />
            </div>

            {product && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Bahan yang akan dianalisis AI
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-[11px] font-semibold text-gray-500 bg-white/80 border border-white px-2.5 py-1 rounded-full"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111] text-white font-bold py-4 rounded-full text-sm hover:bg-black transition-all active:scale-95 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Mengirim laporan..." : "Kirim Laporan →"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
