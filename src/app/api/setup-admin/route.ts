import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  const email = "admin@kyraskin.com";
  const password = "adminrahasia"; // Nanti login ke web kamu pakai sandi ini

  // Pengecekan agar rute rahasia berulang nggak menggandakan admin yang sama
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ message: "Sabar bos, Admin-nya udah di-inject sebelumnya kok!" });
  }

  // Jahit password dengan enripsi tinggi standar Kyra Skin
  const hashedPassword = await bcrypt.hash(password, 10);

  // Sisipkan peran 'admin' yang murni cuma lewat sini bisa masuknya (jalur ordal)
  const admin = await prisma.user.create({
    data: {
      name: "Kyra Grandmaster",
      email,
      password: hashedPassword,
      role: "admin",
    },
  });

  return NextResponse.json({
    message: "Operasi Penyuntikan Sukses! Silakan tutup halaman ini dan gaskun ke form Login.",
    credentials: { email, password: "adminrahasia" },
  });
}
