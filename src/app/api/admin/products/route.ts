import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

// GET - Menyedot Semua Katalog Etalase
export async function GET(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin")
    return NextResponse.json({ message: "Akses Ditolak." }, { status: 403 });

  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products, { status: 200 });
}

// POST - Menambahkan Skincare Baru
export async function POST(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin")
    return NextResponse.json({ message: "Akses Ditolak." }, { status: 403 });

  const body = await req.json();
  const { name, category, price, stock, description, image, ingredients, suitableFor } = body;
  const product = await prisma.product.create({
    data: {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
      image, // <-- Masukkan stock!
      ingredients: ingredients || [],
      suitableFor: suitableFor || [],
    },
  });

  return NextResponse.json({ message: "Skincare sukses dirilis!", product }, { status: 201 });
}

// PUT - Menimpa / Mengedit Skincare Lama (Revisi Resep)
export async function PUT(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin")
    return NextResponse.json({ message: "Akses Ditolak." }, { status: 403 });

  const body = await req.json();
  const { id, name, category, price, stock, description, image, ingredients, suitableFor } = body;
  if (!id) return NextResponse.json({ message: "ID produk rahasia belum masuk." }, { status: 400 });

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
      image, // <-- Masukkan stock!
      ingredients: ingredients || [],
      suitableFor: suitableFor || [],
    },
  });

  return NextResponse.json(
    { message: "Resep berhasil direvisi dan disepuh!", product },
    { status: 200 },
  );
}

// DELETE - Menghapus Produk dari Pasaran
export async function DELETE(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin")
    return NextResponse.json({ message: "Akses Ditolak." }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const targetId = searchParams.get("id");

  if (!targetId) return NextResponse.json({ message: "ID produk rahasia mana?" }, { status: 400 });

  await prisma.product.delete({ where: { id: Number(targetId) } });
  return NextResponse.json(
    { message: "Skincare ditarik dari peredaran selamanya." },
    { status: 200 },
  );
}
