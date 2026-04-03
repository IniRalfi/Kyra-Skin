const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database dengan Produk Kyra...");

  const products = [
    {
      name: "Toner Niacinamide Glowing",
      category: "Toner",
      price: 120000,
      description: "Toner menyegarkan dengan Niacinamide 5%.",
      ingredients: ["Aqua", "Niacinamide", "Glycerin", "Panthenol"],
      suitableFor: [2, 4, 5],
    },
    {
      name: "Serum Ceramide Skin Barrier",
      category: "Serum",
      price: 155000,
      description: "Serum untuk memperbaiki skin barrier yang rusak.",
      ingredients: ["Aqua", "Ceramide NP", "Hyaluronic Acid", "Centella Asiatica"],
      suitableFor: [1, 3, 5],
    },
    {
      name: "Gentle Low pH Cleanser",
      category: "Cleanser",
      price: 85000,
      description: "Pembersih wajah super lembut dengan pH seimbang.",
      ingredients: ["Aqua", "Cocamidopropyl Betaine", "Glycerin", "Sodium Hyaluronate"],
      suitableFor: [1, 2, 3, 4, 5],
    },
    {
      name: "Salicylic Acid Acne Spot",
      category: "Serum",
      price: 95000,
      description: "Obat totol jerawat ampuh dengan BHA.",
      ingredients: ["Aqua", "Salicylic Acid", "Alcohol", "Tea Tree Extract"],
      suitableFor: [2, 4],
    },
    {
      name: "SPF 50+ PA++++ Sunscreen",
      category: "Sunscreen",
      price: 130000,
      description: "Tabir surya ringan tanpa whitecast.",
      ingredients: ["Aqua", "Zinc Oxide", "Titanium Dioxide", "Aloe Vera"],
      suitableFor: [1, 2, 3, 4, 5],
    },
    {
      name: "Retinol 1% Anti-Aging",
      category: "Serum",
      price: 180000,
      description: "Serum anti-penuaan dengan Retinol murni.",
      ingredients: ["Aqua", "Retinol", "Squalane", "Vitamin E"],
      suitableFor: [1, 5],
    },
    {
      name: "Peptide Moisturizer Cream",
      category: "Moisturizer",
      price: 145000,
      description: "Krim pelembap kaya peptide untuk kulit kenyal.",
      ingredients: ["Aqua", "Peptides", "Ceramide EOP", "Dimethicone"],
      suitableFor: [1, 3, 4, 5],
    },
    {
      name: "Vitamin C Brightening Drops",
      category: "Serum",
      price: 165000,
      description: "Menghilangkan flek hitam dan mencerahkan.",
      ingredients: ["Aqua", "Ascorbic Acid", "Ferulic Acid", "Tocopherol"],
      suitableFor: [2, 4, 5],
    },
    {
      name: "Mugwort Calming Clay Mask",
      category: "Mask",
      price: 110000,
      description: "Masker mugwort untuk meredakan kemerahan.",
      ingredients: ["Kaolin", "Aqua", "Mugwort Extract", "Glycerin"],
      suitableFor: [2, 3, 4],
    },
    {
      name: "Galactomyces Essence",
      category: "Toner",
      price: 190000,
      description: "Essence fermentasi tingkat tinggi untuk mencerahkan.",
      ingredients: ["Galactomyces Ferment Filtrate", "Niacinamide", "Allantoin"],
      suitableFor: [1, 2, 4, 5],
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }

  console.log("✅ Berhasil nge-seed 10 produk!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
