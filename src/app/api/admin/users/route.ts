import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

// Penarikan Daftar Absen
export async function GET(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ message: "Zonk! Akses Khusus Dewa." }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users, { status: 200 });
}

// Pelatuk Penghapus User (Ban)
export async function DELETE(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ message: "Zonk! Akses Khusus Dewa." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const targetId = searchParams.get("id");

  // Cegah komedi admin menekan tombol hapus ke akunnya sendiri
  if (!targetId || admin.id === Number(targetId)) {
    return NextResponse.json({ message: "Aksi ilegal (Mencoba harakiri?)" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: Number(targetId) } });

  return NextResponse.json({ message: "User berhasil ditendang mutlak." }, { status: 200 });
}
