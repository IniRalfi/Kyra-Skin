"use client";

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 w-full z-50 px-4 md:px-8 py-4"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-xl rounded-full px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-white">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Kyra<span className="text-[#e8779b]">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500">
          <Link href="/catalog" className="hover:text-gray-800 transition-colors">
            Katalog
          </Link>
          {isAuthenticated && (
            <Link href="/orders" className="hover:text-gray-800 transition-colors">
              Pesananku
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden md:block text-sm font-bold text-gray-600">
                Hei, {user?.name.split(" ")[0]}! 👋
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#111] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-black transition-all active:scale-95 shadow-md"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-[#111] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all active:scale-95 shadow-md"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
