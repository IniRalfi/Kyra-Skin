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

  const allergies = rawAllergies.map((a: any) => ({
    id: a.id,
    reaction_details: a.reaction,
    status: a.severity > 1 ? "verified_by_ai" : "pending",
    created_at: a.createdAt.toISOString(),
    product: a.product,
  }));

  // Kembalikan murni array demi memuaskan janji axios/fetch UI-nya
  return NextResponse.json(allergies, { status: 200 });
}
