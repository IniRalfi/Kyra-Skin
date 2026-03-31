"use client";

import { AppNavbar } from "@/components/ui/AppNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import type { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartItem extends Product {
  quantity: number;
}

const EMOJI: Record<string, string> = {
  Toner: "💧",
  Serum: "✨",
  Moisturizer: "🌿",
  Sunscreen: "☀️",
  Cleanser: "🫧",
  Mask: "🌸",
};

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("kyra_cart") || "[]"));
  }, []);

  const save = (updated: CartItem[]) => {
    setItems(updated);
    localStorage.setItem("kyra_cart", JSON.stringify(updated));
  };

  const changeQty = (id: number, delta: number) =>
    save(items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)));

  const remove = (id: number) => save(items.filter((i) => i.id !== id));

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const checkout = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (!address.trim()) {
      setError("Alamat pengiriman wajib diisi.");
      return;
    }
    if (items.length === 0) return;

    setError("");
    setLoading(true);
    try {
      await api.post("/orders", {
        items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        shipping_address: address,
      });
      localStorage.removeItem("kyra_cart");
      setSuccess(true);
      setTimeout(() => router.push("/orders"), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Checkout gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-[#111] mb-2">Pesanan Berhasil!</h2>
          <p className="text-gray-500 font-medium text-sm">Mengalihkan ke halaman pesanan...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl font-extrabold text-[#111] tracking-tight mb-8">
          Keranjang Belanja 🛒
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🛍️</p>
            <p className="font-extrabold text-[#111] text-xl mb-2">Keranjangmu masih kosong</p>
            <p className="text-gray-500 font-medium text-sm mb-6">
              Yuk, temukan produk skincare yang cocok untukmu!
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-[#111] text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-black transition-all shadow-xl"
            >
              Jelajahi Katalog →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Item List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="bg-white/60 backdrop-blur-xl rounded-[24px] p-5 border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center gap-4"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5D0DD] to-[#E6DDF8] flex items-center justify-center text-2xl shrink-0">
                      {EMOJI[item.category] ?? "🧴"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-[#111] text-sm leading-snug line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">{item.category}</p>
                      <p className="font-bold text-[#111] text-sm mt-1.5">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 font-bold text-sm hover:bg-gray-50 transition-all"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 font-bold text-sm hover:bg-gray-50 transition-all"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => remove(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-lg ml-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/60 backdrop-blur-xl rounded-[28px] p-7 border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.05)] sticky top-28">
                <h2 className="font-extrabold text-[#111] text-lg mb-6">Ringkasan Pesanan</h2>

                <div className="space-y-2 mb-6">
                  {items.map((i) => (
                    <div
                      key={i.id}
                      className="flex justify-between text-sm text-gray-600 font-medium"
                    >
                      <span className="truncate mr-2">
                        {i.name} ×{i.quantity}
                      </span>
                      <span className="shrink-0">
                        Rp {(i.price * i.quantity).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between font-extrabold text-[#111]">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                {/* Shipping Address */}
                <textarea
                  rows={3}
                  placeholder="Alamat pengiriman lengkap..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/60 border border-white rounded-2xl px-4 py-3 text-sm font-medium text-[#111] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#F5D0DD] transition-all resize-none mb-4"
                />

                {error && <p className="text-red-500 text-xs font-bold mb-3">{error}</p>}

                {!isAuthenticated && (
                  <p className="text-xs text-gray-500 font-medium mb-3 text-center">
                    <Link href="/login" className="text-[#e8779b] font-bold">
                      Login
                    </Link>{" "}
                    untuk checkout
                  </p>
                )}

                <button
                  onClick={checkout}
                  disabled={loading || items.length === 0}
                  className="w-full bg-[#111] text-white font-bold py-4 rounded-full text-sm hover:bg-black transition-all active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Memproses..." : "Checkout Sekarang →"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
