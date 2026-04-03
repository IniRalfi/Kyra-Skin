"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { AppNavbar } from "@/components/ui/AppNavbar";
import GlobalBackground from "@/components/ui/GlobalBackground";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<any[]>("/orders")
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen relative z-10">
      <AppNavbar />
      <GlobalBackground />

      <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        <h1 className="text-3xl font-black text-[#111] mb-8">Riwayat Pesanan 📦</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-white/40 rounded-[28px] animate-pulse border border-white"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-xl rounded-[32px] p-12 text-center border border-white">
            <p className="text-5xl mb-4">🛒</p>
            <p className="font-bold text-gray-500">
              Kamu belum pernah belanja barang ajaib di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-2xl rounded-[32px] border border-white p-6 md:p-8 shadow-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black text-[#e8779b] uppercase tracking-widest mb-1">
                      Pesanan #{order.id}
                    </p>
                    <p className="text-xs text-gray-400 font-bold">
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-green-200">
                    Selesai
                  </span>
                </div>

                <div className="space-y-4 border-t border-gray-100/50 pt-6">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-xl bg-[#fdf2f5] flex items-center justify-center text-xl shrink-0">
                        🧴
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#111] text-sm">{item.product.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold">
                          {item.quantity} × Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="font-black text-[#111] text-sm">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#f5d0dd]/30 flex justify-between items-center">
                  <p className="text-xs font-bold text-gray-400">Total Pembayaran</p>
                  <p className="text-[18px] font-black text-[#e8779b]">
                    Rp {order.totalAmount.toLocaleString("id-ID")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
