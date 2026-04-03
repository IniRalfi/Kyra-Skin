import ComingSoonPage from "./coming-soon/page";
import MaintenanceDesktop from "@/components/maintenance/MaintenanceDesktop";
import MaintenanceMobile from "@/components/maintenance/MaintenanceMobile";
import LandingPage from "@/components/landing/LandingPage";

// 🔴 GLOBAL SWITCH
const IS_MAINTENANCE = false; // Menyalakan mode Perbaikan (Prioritas Utama)
const IS_COMING_SOON = false; // Menyalakan mode Pra-Rilis Waitlist

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
  return <LandingPage />;
}
