"use client";

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AppNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      const cart = JSON.parse(localStorage.getItem("kyra_cart") || "[]");
      setCartCount(cart.reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0));
    };
    sync();
    window.addEventListener("storage", sync);
    // Poll setiap 1 detik biar count update real-time
    const interval = setInterval(sync, 1000);
    return () => {
      window.removeEventListener("storage", sync);
      clearInterval(interval);
    };
  }, []);

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
            <>
              <Link href="/orders" className="hover:text-gray-800 transition-colors">
                Pesananku
              </Link>
              <Link href="/profile" className="hover:text-gray-800 transition-colors">
                Profil
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/60 border border-white/80 hover:bg-white/90 transition-all"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e8779b] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

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
