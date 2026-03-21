import ComingSoonPage from "./coming-soon/page";
import MaintenanceDesktop from "@/components/maintenance/MaintenanceDesktop";
import MaintenanceMobile from "@/components/maintenance/MaintenanceMobile";

// 🔴 GLOBAL SWITCH
const IS_MAINTENANCE = false; // Menyalakan mode Perbaikan (Prioritas Utama)
const IS_COMING_SOON = true; // Menyalakan mode Pra-Rilis Waitlist

export default function RootHomePage() {
  // 1. KONDISI MAINTENANCE (Sedang Perbaikan Sistem)
  if (IS_MAINTENANCE) {
    return (
      <>
        {/* Render spesifik. Mereka akan otomatis nampil/hilang berkat CSS 'hidden / flex' */}
        <MaintenanceDesktop />
        <MaintenanceMobile />
      </>
    );
  }

  // 2. KONDISI COMING SOON
  if (IS_COMING_SOON) {
    return <ComingSoonPage />;
  }

  // 3. KONDISI NORMAL (WEB UTAMA JALAN)
  return (
    <main className="w-full min-h-screen bg-[#fcfbfc] font-jakarta text-[#111]">
      <div className="block md:hidden">
        <h1 className="text-xl font-bold mt-20 text-center">Nanti versi Landing Page HP disini</h1>
      </div>
      <div className="hidden md:block">
        <h1 className="text-4xl font-bold mt-32 text-center">
          Nanti versi Landing Page Desktop disini
        </h1>
      </div>
    </main>
  );
}
