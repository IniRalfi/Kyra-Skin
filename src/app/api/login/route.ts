import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email dan password wajib diisi." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Email tidak ditemukan." }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Password salah." }, { status: 401 });
    }

    // Buat token JWT
    const token = await signToken({ id: user.id, email: user.email, role: user.role });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    return NextResponse.json({ token, user: safeUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal login.", error: String(error) }, { status: 500 });
  }
}
