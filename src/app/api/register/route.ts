import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, password_confirmation } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Semua field wajib diisi." }, { status: 400 });
    }

    if (password !== password_confirmation) {
      return NextResponse.json({ message: "Password konfirmasi tidak cocok." }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ message: "Email sudah terdaftar." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // profile kosong karna disetup di pendaftaran onboarding
      },
    });

    const token = await signToken({ id: user.id, email: user.email, role: user.role });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: null,
    };

    return NextResponse.json({ token, user: safeUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal register.", error: String(error) }, { status: 500 });
  }
}
