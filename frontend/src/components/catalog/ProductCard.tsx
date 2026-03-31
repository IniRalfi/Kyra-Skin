"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/types";

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

export function ProductCard({
  product,
  highlighted = false,
}: {
  product: Product;
  highlighted?: boolean;
}) {
  const emoji = EMOJI[product.category] ?? "🧴";
  const gradient = GRADIENT[product.category] ?? "from-[#F5D0DD] to-[#E6DDF8]";

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`bg-white/60 backdrop-blur-xl rounded-[28px] border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.05)] overflow-hidden ${
        highlighted ? "ring-2 ring-[#e8779b]/40" : ""
      }`}
    >
      {highlighted && (
        <div className="bg-gradient-to-r from-[#F5D0DD] to-[#E6DDF8] text-[10px] font-bold uppercase tracking-widest text-[#b05a7a] text-center py-1.5">
          ✨ Rekomendasi AI
        </div>
      )}

      {/* Product Illustration */}
      <div
        className={`w-full aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center text-6xl`}
      >
        {emoji}
      </div>

      <div className="p-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
          {product.category}
        </span>
        <h3 className="font-extrabold text-[#111] text-sm leading-snug mb-3 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <span className="font-extrabold text-base text-[#111]">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              product.stock > 0 ? "bg-[#C1D7D0]/40 text-[#3a7a6e]" : "bg-red-50 text-red-400"
            }`}
          >
            {product.stock > 0 ? `${product.stock} stok` : "Habis"}
          </span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="block w-full text-center bg-[#111] text-white font-bold py-3 rounded-full text-xs hover:bg-black transition-all active:scale-95 shadow-md"
        >
          Lihat Detail →
        </Link>
      </div>
    </motion.div>
  );
}
