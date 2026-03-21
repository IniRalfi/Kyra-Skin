import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// 1. Import Plus Jakarta Sans dari Google Fonts
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta", // Nama variabel CSS yang akan dipakai Tailwind
});

// 2. Import font Calming dari folder lokal
const calming = localFont({
  src: "./fonts/Calmingly.otf", // Sesuaikan nama dan ekstensi file font-mu
  variable: "--font-calming",
});

export const metadata: Metadata = {
  title: "Kyra | Smart Skincare Recommendation",
  description: "AI-Powered Skincare E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Masukkan variabel font ke dalam tag html
    <html lang="id" className={`${plusJakarta.variable} ${calming.variable}`}>
      {/* Jadikan Plus Jakarta Sans sebagai font default bawaan body */}
      <body className="font-jakarta antialiased bg-[#FDFBF7] text-[#2D3748]">{children}</body>
    </html>
  );
}
