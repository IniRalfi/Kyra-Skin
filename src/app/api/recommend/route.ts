import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

// Helper K-NN (CBR) murni dalam TypeScript!
function calculateEuclideanDistance(userProfile: any, product: any) {
  let distance = 0;

  // 1. Sensitivitas Skin Type (Bobot: 40%)
  // Jika produk ini COCOK dengan skin_type si user, jarak = 0 (sangat dekat). Jika tidak cocok, jarak = 1
  const productSuitableFor = Array.isArray(product.suitableFor)
    ? product.suitableFor
    : JSON.parse((product.suitableFor as any) || "[]");
  if (!productSuitableFor.includes(userProfile.skinType)) {
    distance += 1.0 * 0.4; // Penalti karena beda tipe kulit
  }

  // 2. Kecocokan Skin Concern (Mencari ingredients aktif, Bobot: 60%)
  const userConcerns = Array.isArray(userProfile.concerns)
    ? userProfile.concerns
    : JSON.parse((userProfile.concerns as any) || "[]");
  const productIngredients = Array.isArray(product.ingredients)
    ? product.ingredients
    : JSON.parse((product.ingredients as any) || "[]");

  // Logic Cerdas: jerawat -> Salicylic, kusam -> Vitamin C/Niacinamide, penuaan -> Retinol/Peptides
  let matchesConcern = false;
  const ingredientsLower = productIngredients.map((i: string) => i.toLowerCase());

  for (const c of userConcerns) {
    const concern = c.toLowerCase();
    if (
      concern.includes("jerawat") &&
      (ingredientsLower.includes("salicylic acid") || ingredientsLower.includes("tea tree extract"))
    )
      matchesConcern = true;
    if (
      concern.includes("kusam") &&
      (ingredientsLower.includes("niacinamide") ||
        ingredientsLower.includes("ascorbic acid") ||
        ingredientsLower.includes("galactomyces"))
    )
      matchesConcern = true;
    if (
      concern.includes("penuaan") &&
      (ingredientsLower.includes("retinol") || ingredientsLower.includes("peptides"))
    )
      matchesConcern = true;
    if (
      concern.includes("kering") &&
      (ingredientsLower.includes("ceramide np") ||
        ingredientsLower.includes("hyaluronic acid") ||
        ingredientsLower.includes("glycerin"))
    )
      matchesConcern = true;
  }

  // Jika produk ini punya bahan ajaib untuk concern si user, jarak = 0.
  if (!matchesConcern && userConcerns.length > 0) {
    distance += 1.0 * 0.6; // Penalti karena gak ada ingredient yang ngefek
  }

  return Math.sqrt(distance); // Mengembalikan standar rumus Euclidean murni
}

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user || !user.profile) {
    return NextResponse.json(
      { message: "Anda harus login dan mengisi kuesioner kulit!" },
      { status: 400 },
    );
  }

  const profile = user.profile;
  const userAllergies = Array.isArray(profile.allergies)
    ? profile.allergies.map((a) => String(a).toLowerCase())
    : [];

  // Panggil Semua Katalog Produk di Database
  const allProducts = await prisma.product.findMany({ where: { isActive: true } });

  // 1. FILTERING: Hapus produk yang mengandung alergi bagi user ini
  const safeProducts = allProducts.filter((p) => {
    const ingredients = Array.isArray(p.ingredients)
      ? p.ingredients.map((i) => String(i).toLowerCase())
      : [];
    // Apakah ada satu saja bahan yang termasuk alergi user? Jika ada, buang.
    const isAllergic = ingredients.some((ing) => userAllergies.includes(ing));
    return !isAllergic;
  });

  // 2. K-NEAREST NEIGHBOR (CBR) SCORING
  // Hitung kedekatan (Euclidean Distance) si user profile dengan atribut masing-masing produk
  const scoredProducts = safeProducts.map((product) => {
    const distance = calculateEuclideanDistance(profile, product);
    return {
      ...product,
      distance,
    };
  });

  // Urutkan dari Jarak Terdekat (Paling Kecil = Paling Mirip/Cocok)
  scoredProducts.sort((a, b) => a.distance - b.distance);

  // Ambil TOP 4 Produk Terbaik (K=4)
  const recommendations = scoredProducts.slice(0, 4);

  return NextResponse.json({ products: recommendations }, { status: 200 });
}
