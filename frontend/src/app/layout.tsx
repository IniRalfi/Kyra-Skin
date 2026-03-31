import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import { AuthProvider } from "@/contexts/AuthContext";
import GlobalBackground from "@/components/ui/GlobalBackground";
import "./globals.css";

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
  description: "AI-Powered Skincare E-Commerce — Temukan skincare yang cocok untuk kulitmu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${calming.variable} text-[75%]`}>
      <body className="font-jakarta antialiased text-[#111111] overflow-x-hidden min-h-screen selection:bg-[#FAD9E6]">
        <GlobalBackground />
        <AuthProvider>
          <div className="relative z-0">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
