import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GlobalBackground from "@/components/ui/GlobalBackground";

// 1. Inisialisasi Font
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const calming = localFont({
  src: "./fonts/Calmingly.otf",
  variable: "--font-calming",
});

export const metadata: Metadata = {
  title: "Kyra | Smart Skincare Recommendation",
  description: "AI-Powered Skincare E-Commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 💡 INI MAGIC-NYA: 'text-[85%]' otomatis mengecilkan (scale down) SEMUA komponen tailwind se-website!
    <html lang="id" className={`${plusJakarta.variable} ${calming.variable} text-[85%]`}>
      {/* Semua *styling* redundan kayak custom seleksi pink, text 111 disetel satu pintu di Body */}
      <body className="font-jakarta antialiased text-[#111111] overflow-x-hidden min-h-screen selection:bg-[#FAD9E6]">
        {/* Layer Background Global Beranimasi */}
        <GlobalBackground />

        {/* Tempat Konten Page Utama (Z-index sengaja diset 0 biar background ada di belakangnya) */}
        <div className="relative z-0">{children}</div>
      </body>
    </html>
  );
}
