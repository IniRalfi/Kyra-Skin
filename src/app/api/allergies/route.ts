import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);

  if (!user) {
    return NextResponse.json({ message: "Anda harus login dulu" }, { status: 401 });
  }

  // Minta Prisma mencarikan histori alergi user ini, sekalian comot info tabel Produknya (karena Navbar butuh)
  const rawAllergies = await prisma.allergyCase.findMany({
    where: { userId: user.id },
    include: {
      product: {
        select: {
          name: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Rombak format datanya agar pas dengan properti "interface AllergyCase" yang diminta Frontend
  const allergies = rawAllergies.map((a) => ({
    id: a.id,
    reaction_details: a.reaction, // Nama database Prisma: reaction, tapi UI mintanya reaction_details
    status: a.severity > 1 ? "verified_by_ai" : "pending", // Logika dummy status verifikasi
    created_at: a.createdAt.toISOString(), // Tanggal stringifikasi
    product: a.product,
  }));

  // Kembalikan murni array demi memuaskan janji axios/fetch UI-nya
  return NextResponse.json(allergies, { status: 200 });
}
