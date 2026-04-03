const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("♻️  Resetting Data...");
  // Hapus data lama biar gak duplikat (Opsional, tapi aman buat seeder)
  await prisma.user.deleteMany({ where: { role: "user" } });
  await prisma.product.deleteMany({});

  console.log("📦 Seeding Produk...");
  const products = [
    {
      name: "Toner Niacinamide Glowing",
      category: "Toner",
      price: 120000,
      description: "Toner menyegarkan dengan Niacinamide 5%.",
      ingredients: ["Aqua", "Niacinamide", "Glycerin"],
      suitableFor: [2, 4, 5],
      stock: 50,
    },
    {
      name: "Serum Ceramide Skin",
      category: "Serum",
      price: 155000,
      description: "Memperbaiki skin barrier.",
      ingredients: ["Aqua", "Ceramide NP", "Hyaluronic Acid"],
      suitableFor: [1, 3, 5],
      stock: 30,
    },
    {
      name: "Gentle Low pH Cleanser",
      category: "Cleanser",
      price: 85000,
      description: "Pembersih wajah pH seimbang.",
      ingredients: ["Aqua", "Cocamidopropyl Betaine"],
      suitableFor: [1, 2, 3, 4, 5],
      stock: 100,
    },
    {
      name: "SPF 50+ Sunscreen",
      category: "Sunscreen",
      price: 130000,
      description: "Tabir surya tanpa whitecast.",
      ingredients: ["Aqua", "Zinc Oxide"],
      suitableFor: [1, 2, 3, 4, 5],
      stock: 75,
    },
    {
      name: "Retinol 1% Anti-Aging",
      category: "Serum",
      price: 180000,
      description: "Serum anti-penuaan dini.",
      ingredients: ["Aqua", "Retinol", "Squalane"],
      suitableFor: [1, 5],
      stock: 20,
    },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log("👥 Seeding 30 User dengan Profil Beragam...");
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

  for (let i = 0; i < names.length; i++) {
    const skinType = (i % 5) + 1; // 1-5
    const gender = (i % 2) + 1; // 1: Pria, 2: Wanita
    const age = 18 + (i % 40);

    await prisma.user.create({
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
  }

  console.log("✅ Berhasil nge-seed 30 User & 5 Produk!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
