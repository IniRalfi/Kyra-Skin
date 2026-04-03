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
    <div className="min-h-screen flex bg-[#fdf9fa]/90 relative z-20 font-jakarta">
      <GlobalBackground />

      {/* Kolom Sidebar Kiri */}
      <aside className="w-64 bg-white/70 backdrop-blur-2xl border-r border-white p-8 flex flex-col z-30 shadow-[4px_0_40px_rgba(0,0,0,0.03)]">
        <h1 className="text-2xl font-black text-[#e8779b] mb-12 tracking-widest drop-shadow-sm">
          KYRA.CMS
        </h1>

        <nav className="flex-1 space-y-2.5">
          <Link
            href="/admin/users"
            className="block px-5 py-3.5 rounded-2xl font-extrabold text-sm text-[gray] hover:bg-white hover:text-[#e8779b] hover:shadow-lg hover:shadow-[#FAD9E6]/50 transition-all active:scale-95"
          >
            👥 Kelola Pengguna
          </Link>
          <Link
            href="/admin/products"
            className="block px-5 py-3.5 rounded-2xl font-extrabold text-sm text-[gray] hover:bg-white hover:text-[#e8779b] hover:shadow-lg hover:shadow-[#FAD9E6]/50 transition-all active:scale-95"
          >
            🧴 Katalog Skincare
          </Link>
        </nav>

        <button
          className="mt-auto px-5 py-3.5 text-left font-extrabold text-sm text-[#e8779b] bg-white/50 hover:bg-white rounded-2xl transition-all shadow-sm"
          onClick={() => router.push("/")}
        >
          ← Pergi ke Toko
        </button>
      </aside>

      {/* Kotak Area Konten Kanan Terdalam */}
      <main className="flex-1 p-10 z-30 min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto h-full">{children}</div>
      </main>
    </div>
  );
}
