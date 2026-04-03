export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDF9FA]/70 backdrop-blur-md">
      <div className="relative flex items-center justify-center mb-4">
        {/* Lingkaran Luar Berdenyut */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-[#F5D0DD] animate-ping opacity-60"></div>
        {/* Ikon Dalam */}
        <div className="relative text-5xl animate-bounce">🌸</div>
      </div>
      <p className="text-[#e8779b] font-extrabold tracking-widest uppercase text-sm animate-pulse">
        Meracik formula...
      </p>
    </div>
  );
}
