"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Image from "next/image";
import GlobalBackground from "@/components/ui/GlobalBackground";
import { AppNavbar } from "@/components/ui/AppNavbar"; // <-- BALIK LAGI!

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await api.get<Product[]>("/products");
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  return (
    <div className="min-h-screen relative z-10">
      <AppNavbar /> {/* <-- SUDAH TERPASANG LAGI BOSKU! */}
      <GlobalBackground />
      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-[#111] mb-3">Etalase Kyra-Skin</h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">
            Pilih Senjata Rahasia Kulit Cantikmu
          </p>
        </header>

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
              <div
                key={p.id}
                className="group bg-white/60 backdrop-blur-xl rounded-[32px] border border-white p-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative aspect-square rounded-[24px] overflow-hidden mb-5 bg-[#fdf2f5]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl grayscale opacity-30">
                      🧴
                    </div>
                  )}
                  {p.stock === 0 && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                        Habis Terjual
                      </span>
                    </div>
                  )}
                </div>

                <div className="px-2">
                  <p className="text-[10px] font-black text-[#e8779b] uppercase tracking-widest mb-1">
                    {p.category}
                  </p>
                  <h3 className="font-bold text-[#111] mb-2 truncate text-sm md:text-base leading-tight">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-black text-[#111]">Rp {p.price.toLocaleString("id-ID")}</p>
                    <p className="text-[9px] font-bold text-gray-400">Sisa: {p.stock}</p>
                  </div>

                  <button
                    disabled={p.stock === 0}
                    className={`w-full mt-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                      p.stock > 0
                        ? "bg-[#111] text-white hover:bg-[#e8779b] shadow-black/5"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {p.stock > 0 ? "Beli Sekarang" : "Kosong"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
