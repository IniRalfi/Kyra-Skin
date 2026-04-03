import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

// Helper untuk mengekstrak JSON dari database
function safeParse(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (!data) return [];
  if (typeof data !== "string") return [data];
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    return [data];
  }
}

/**
 * 📐 RUMUS EUCLIDEAN DISTANCE (Sesuai Request User)
 * d = sqrt((X1_n - X1_c)^2 + (X2_n - X2_c)^2 + (X3_n - X3_c)^2)
 */
function calculateEuclideanDistance(u1: any, u2: any) {
  const x1_diff = Math.pow(u1.gender - u2.gender, 2);
  const x2_diff = Math.pow(u1.skinType - u2.skinType, 2);
  const x3_diff = Math.pow(u1.age - u2.age, 2);
  return Math.sqrt(x1_diff + x2_diff + x3_diff);
}

export async function GET(req: Request) {
  const currentUser = await getUserFromRequest(req);
  if (!currentUser || !currentUser.profile) {
    return NextResponse.json({ message: "Sesi tidak valid." }, { status: 400 });
  }

  const profile = currentUser.profile;
  const userAllergies = safeParse(profile.allergies).map((a) => String(a).toLowerCase());

  // 1. CARI USER LAIN (BASIS KASUS)
  const otherProfiles = await prisma.userProfile.findMany({
    where: { NOT: { userId: currentUser.id } },
    include: { user: { select: { name: true } } },
    take: 100, // Sampel lebih banyak biar lebih akurat
  });

  // 2. HITUNG JARAK TIAP KASUS (CBR)
  const casesWithDistance = otherProfiles
    .map((p) => {
      const dist = calculateEuclideanDistance(profile, p);
      // Skala Persentase Linear (Makin jauh, makin kecil, limit 100)
      // Jika jarak < 1 (identik), sim = 99%
      const sim = Math.max(0, Math.floor(100 / (1 + dist * 0.05)));

      return {
        caseId: p.userId,
        name: p.user.name,
        age: p.age,
        skinType: p.skinType,
        concerns: safeParse(p.concerns),
        distance: Number(dist.toFixed(2)),
        similarity: sim,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  // Ambil TOP 10 KASUS untuk Detail Modal
  const topCases = casesWithDistance.slice(0, 10);
  const winnerCase = topCases[0];

  // 3. AMBIL PRODUK BERDASARKAN KRITERIA PEMENANG (REUSE)
  const allProducts = await prisma.product.findMany({ where: { isActive: true } });

  // Filter Alergi
  const safeProducts = allProducts.filter((p) => {
    const ingredients = safeParse(p.ingredients).map((i) => String(i).toLowerCase());
    return !ingredients.some((ing) => userAllergies.includes(ing));
  });

  // 4. SYNC PRODUCT MATCH RATE (Sesuai Similarity Case)
  const recommendedProducts = safeProducts
    .map((p) => {
      const pSuitable = safeParse(p.suitableFor);
      // Base Match Rate mengikuti Similarity Kasus Terdekat jika produk cocok
      let matchRate = winnerCase?.similarity || 85;

      // Penyesuaian margin agar tidak semua produk angkanya sama persis
      if (pSuitable.includes(profile.skinType)) matchRate += 2;
      else matchRate -= 15; // Penalti jika tidak cocok skin type

      return { ...p, matchRate: Math.min(99, Math.max(60, matchRate)) };
    })
    .sort((a, b) => b.matchRate - a.matchRate)
    .slice(0, 4);

  return NextResponse.json(
    {
      products: recommendedProducts,
      similarCases: topCases,
    },
    { status: 200 },
  );
}
