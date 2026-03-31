"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const inputClass =
  "w-full bg-white/60 border border-white rounded-2xl px-4 py-3.5 text-sm font-medium text-[#111] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#F5D0DD] focus:border-[#F5D0DD] transition-all backdrop-blur-sm";

export default function LoginPage() {
  const { login, hasProfile } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      // Redirect: kalau belum isi profil → onboarding, kalau sudah → catalog
      router.push(hasProfile ? "/catalog" : "/onboarding");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white/60 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 border border-white/80 shadow-[0_20px_80px_rgba(0,0,0,0.07)]"
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Kyra<span className="text-[#e8779b]">.</span>
        </Link>
        <h1 className="mt-3 text-2xl font-extrabold text-[#111]">Selamat Datang Kembali</h1>
        <p className="mt-1.5 text-sm text-gray-500 font-medium">
          Masuk untuk melihat rekomendasimu
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-2xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#111] text-white font-bold py-4 rounded-full text-sm mt-2 hover:bg-black transition-all active:scale-95 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Masuk..." : "Masuk →"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 font-medium">
        Belum punya akun?{" "}
        <Link href="/register" className="text-[#e8779b] font-bold hover:underline">
          Daftar gratis
        </Link>
      </p>
    </motion.div>
  );
}
