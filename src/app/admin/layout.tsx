"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import GlobalBackground from "@/components/ui/GlobalBackground";

// Layout pelindung. Apapun file page.tsx kamu nanti di /admin/..., semua dirangkul lewat sini!
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isReady, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady) {
      // Usir halus ke beranda apabila tamunya bukan tipe Admin!
      if (!isAuthenticated || user?.role !== "admin") {
        router.replace("/");
      }
    }
  }, [isReady, isAuthenticated, user, router]);

  // Tameng visual (Layar tunggu kosong sementara isReady dan verifikasi status role dieksekusi)
  if (!isReady || !isAuthenticated || user?.role !== "admin") {
    return <GlobalBackground />;
  }

  return (
    <div className="h-screen flex bg-[#fdf9fa]/90 relative z-20 font-jakarta overflow-hidden">
      <GlobalBackground />

      {/* Kolom Sidebar Kiri (Dibuat h-full tanpa scroll) */}
      <aside className="w-64 h-full bg-white/70 backdrop-blur-3xl border-r border-white/50 p-8 flex flex-col z-30 shadow-[10px_0_40px_rgba(0,0,0,0.02)]">
        <div className="mb-14">
          <h1 className="text-2xl font-black text-[#e8779b] tracking-widest drop-shadow-sm">
            KYRA<span className="text-gray-200">.</span>CMS
          </h1>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">
            Pusat Kendali Admin
          </p>
        </div>

        <nav className="flex-1 space-y-3">
          <Link
            href="/admin/users"
            className="group flex items-center gap-3 px-5 py-4 rounded-3xl font-extrabold text-sm text-gray-400 hover:bg-white hover:text-[#e8779b] hover:shadow-[0_10px_30px_rgba(232,119,155,0.15)] transition-all active:scale-95"
          >
            <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">
              👥
            </span>
            Manajemen Pengguna
          </Link>
          <Link
            href="/admin/products"
            className="group flex items-center gap-3 px-5 py-4 rounded-3xl font-extrabold text-sm text-gray-400 hover:bg-white hover:text-[#e8779b] hover:shadow-[0_10px_30px_rgba(232,119,155,0.15)] transition-all active:scale-95"
          >
            <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">
              🧴
            </span>
            Inventaris Produk
          </Link>
        </nav>

        <button
          className="mt-auto flex items-center justify-center gap-2 group px-6 py-4 font-black text-[10px] uppercase tracking-widest text-[#e8779b] bg-white border border-pink-50 hover:bg-pink-50 rounded-3xl transition-all shadow-sm active:scale-95"
          onClick={() => router.push("/")}
        >
          <span>←</span> Kembali ke Toko
        </button>
      </aside>

      {/* Kotak Area Konten Kanan (Satu-satunya yang boleh Scroll) */}
      <main className="flex-1 h-full z-30 overflow-y-auto scroll-smooth">
        <div className="max-w-6xl mx-auto p-12">{children}</div>
      </main>
    </div>
  );
}
