import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 overflow-hidden">
      <div className="text-center bg-white/60 backdrop-blur-xl p-10 rounded-[32px] border border-white/80 max-w-lg w-full shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
        <h1 className="text-8xl font-black text-[#e8779b] mb-4 drop-shadow-sm">404</h1>
        <h2 className="text-2xl font-extrabold text-[#111] mb-2">Waduh, Kesasar Ya?</h2>
        <p className="text-gray-500 font-medium mb-8 text-sm leading-relaxed">
          Sepertinya halaman yang kamu cari tertiup angin atau memang belum kita buatkan
          antarmukanya. Lanjut ngaca dulu!
        </p>
        <Link
          href="/"
          className="inline-block bg-[#111] text-white font-bold py-3.5 px-8 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all text-sm"
        >
          ← Pulang ke Beranda
        </Link>
      </div>
    </div>
  );
}
