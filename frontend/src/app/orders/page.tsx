"use client";

import { AppNavbar } from "@/components/ui/AppNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OrderItem {
  id: number;
  quantity: number;
  price_at_purchase: number;
  product: { id: number; name: string; category: string };
}

interface Order {
  id: number;
  total_price: number;
  status: string;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-600",
  paid: "bg-blue-50 text-blue-600",
  shipped: "bg-purple-50 text-purple-600",
  completed: "bg-[#C1D7D0]/40 text-[#3a7a6e]",
  cancelled: "bg-red-50 text-red-400",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "⏳ Menunggu Pembayaran",
  paid: "✅ Lunas",
  shipped: "🚚 Dikirim",
  completed: "🎉 Selesai",
  cancelled: "✕ Dibatalkan",
};

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    api
      .get<Order[]>("/orders")
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen">
      <AppNavbar />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#111] tracking-tight">Pesananku</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Riwayat semua transaksi</p>
          </div>
          <Link
            href="/catalog"
            className="bg-[#111] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-black transition-all shadow-md"
          >
            + Belanja Lagi
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white/40 rounded-[24px] h-28 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">📦</p>
            <p className="font-extrabold text-[#111] text-xl mb-2">Belum ada pesanan</p>
            <p className="text-gray-500 font-medium text-sm mb-6">
              Yuk mulai belanja produk skincare terbaikmu!
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-[#111] text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-black transition-all shadow-xl"
            >
              Jelajahi Katalog →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/60 backdrop-blur-xl rounded-[24px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden"
              >
                {/* Order Header */}
                <button
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/30 transition-colors"
                >
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-1">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="font-extrabold text-[#111]">
                      Rp {Number(order.total_price).toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {order.items?.length ?? 0} produk
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_STYLE[order.status] ?? "bg-gray-50 text-gray-600"}`}
                    >
                      {STATUS_LABEL[order.status] ?? order.status}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {expanded === order.id ? "▲" : "▼"}
                    </span>
                  </div>
                </button>

                {/* Order Items (expandable) */}
                {expanded === order.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    <div className="space-y-3 mb-4">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700 font-medium">
                            {item.product?.name} ×{item.quantity}
                          </span>
                          <span className="font-bold text-[#111]">
                            Rp {(item.price_at_purchase * item.quantity).toLocaleString("id-ID")}
                          </span>
                          <Link
                            href={`/report-allergy/${item.product?.id ?? 0}`}
                            className="text-[11px] font-bold text-red-400 hover:text-red-500 transition-colors"
                          >
                            Laporkan Reaksi 🔴
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 font-medium">
                      📍 {order.shipping_address}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
