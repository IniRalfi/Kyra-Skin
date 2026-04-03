import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  console.log("♻️  Initiating Browser-Based Seed...");

  try {
    // 1. Bersihkan Data User biar gak numpuk
    await prisma.user.deleteMany({ where: { role: "user" } });

    // 2. Persiapkan data 30 User idaman
    const hashedUserPassword = await bcrypt.hash("user1234", 10);
    const names = [
      "Budi Santoso",
      "Siti Aminah",
      "Asep Sunandar",
      "Dewi Lestari",
      "Rizky Ramadhan",
      "Putri Handayani",
      "Aditya Wijaya",
      "Lina Marlina",
      "Fajar Nugraha",
      "Anisa Fitri",
      "Irfan Bachdim",
      "Maya Prasetyo",
      "Bambang Pamungkas",
      "Eka Kusuma",
      "Yoga Pratama",
      "Rina Nose",
      "Gading Marten",
      "Nagita Slavina",
      "Raffi Ahmad",
      "Deddy Corbuzier",
      "Agnez Mo",
      "Tulus",
      "Raisa Andriana",
      "Isyana Sarasvati",
      "Vidi Aldiano",
      "Bunga Citra Lestari",
      "Gisella Anastasia",
      "Jessica Iskandar",
      "Nia Ramadhani",
      "Luna Maya",
    ];

    const seededUsers = [];

    for (let i = 0; i < names.length; i++) {
      const skinType = (i % 5) + 1; // 1-5
      const gender = (i % 2) + 1; // 1: Pria, 2: Wanita
      const age = 18 + (i % 40);

      const user = await prisma.user.create({
        data: {
          name: names[i],
          email: `user${i + 1}@kyra.com`,
          password: hashedUserPassword,
          role: "user",
          profile: {
            create: {
              age: age,
              gender: gender,
              skinType: skinType,
              concerns: ["kusam", "jerawat"],
              allergies: i % 3 === 0 ? ["alcohol"] : [],
            },
          },
        },
      });
      seededUsers.push(user.name);
    }

    return NextResponse.json(
      {
        message: `✅ Berhasil mendaftarkan ${seededUsers.length} nasabah fiktif!`,
        users: seededUsers,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Seed error:", err);
    return NextResponse.json(
      {
        message: "Gagal nge-seed lewat jalur tol.",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
