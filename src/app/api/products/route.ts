import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  // Support basic pagination/filtering similar to Laravel /api/products
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  // Karena Next.js tidak punya pagination Laravel otomatis, kita return array array products
  // dibungkus object dengan format standar (berhubung frontend butuhnya res.data)
  return NextResponse.json({ data: products }, { status: 200 });
}
