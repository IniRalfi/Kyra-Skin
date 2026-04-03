"use client";

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import logoImage from "../../../assets/logo.png";

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
    window.addEventListener("cart-update", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cart-update", sync);
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
      className="fixed top-0 w-full z-50 px-4 md:px-8 py-5"
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center bg-white/75 backdrop-blur-2xl rounded-[32px] px-3 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/60">
        <div className="flex items-center pl-2">
          {/* Logo Asli */}
          <Link href="/" className="flex items-center group">
            <Image
              src={logoImage}
              alt="Kyra Logo"
              className="h-8 md:h-10 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider">
          <Link href="/catalog" className="hover:text-[#111] transition-colors">
            Katalog
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/orders" className="hover:text-[#111] transition-colors">
                Pesananku
              </Link>
              <Link href="/profile" className="hover:text-[#111] transition-colors">
                Profil
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin/users"
                  className="text-[#e8779b] hover:text-pink-600 transition-colors font-black"
                >
                  🛡️ Admin CMS
                </Link>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 pr-1">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gray-50/50 hover:bg-gray-100 text-lg transition-all"
          >
            🛍️
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e8779b] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <span className="hidden md:block text-sm font-bold text-gray-400 mr-2">
                Halo, <span className="text-[#111]">{user?.name.split(" ")[0]}</span>!
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-600 text-sm font-bold px-5 py-2.5 rounded-full hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-gray-600 hover:text-[#111] transition-colors px-4 py-2 hidden sm:block"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-[#111] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-black transition-all active:scale-95 shadow-md hover:shadow-xl hover:shadow-black/10"
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
