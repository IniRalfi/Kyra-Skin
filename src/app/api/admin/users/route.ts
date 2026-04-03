import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// Ambil daftar absensi Galaksi Kyra-Skin (Beserta Profilnya)
export async function GET(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ message: "Zonk! Akses Khusus Dewa." }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    include: { profile: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users, { status: 200 });
}

// Melahirkan User Baru + Profil Dasar
export async function POST(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ message: "Zonk! Akses Khusus Dewa." }, { status: 403 });
  }

  try {
    const { name, email, password, role, age, gender, skinType } = await req.json();

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ message: "Email sudah terdaftar!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        profile: {
          create: {
            age: Number(age) || 20,
            gender: Number(gender) || 1,
            skinType: Number(skinType) || 5,
            concerns: [],
            allergies: [],
          },
        },
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Gagal membuat identitas baru." }, { status: 500 });
  }
}

// Rekonstruksi Identitas & Profil (Edit User)
export async function PUT(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ message: "Zonk! Akses Khusus Dewa." }, { status: 403 });
  }

  try {
    const { id, name, email, role, password, age, gender, skinType } = await req.json();

    const updateData: any = { name, email, role };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...updateData,
        profile: {
          upsert: {
            create: {
              age: Number(age) || 20,
              gender: Number(gender) || 1,
              skinType: Number(skinType) || 5,
              concerns: [],
              allergies: [],
            },
            update: {
              age: Number(age) || 20,
              gender: Number(gender) || 1,
              skinType: Number(skinType) || 5,
            },
          },
        },
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Gagal merombak data user." }, { status: 500 });
  }
}

// Hapus User (Ban Permanen)
export async function DELETE(req: Request) {
  const admin = await getUserFromRequest(req);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ message: "Zonk! Akses Khusus Dewa." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const targetId = searchParams.get("id");

  if (!targetId || admin.id === Number(targetId)) {
    return NextResponse.json({ message: "Ilegal!" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: Number(targetId) } });

  return NextResponse.json({ message: "Berhasil dimusnahkan." }, { status: 200 });
}
