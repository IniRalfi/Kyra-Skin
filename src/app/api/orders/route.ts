import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

// POST - Melakukan Checkout (Beli Skincare)
export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: "Login dulu bosku!" }, { status: 401 });

  try {
    const body = await req.json();
    const { items, shipping_address } = body; // items: [{ product_id, quantity }]

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Keranjang masih melompong." }, { status: 400 });
    }

    // PAKAI TRANSACTION: Biar kalau ada satu barang gagal, semuanya batal (Data Aman)
    const result = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of items) {
        // 1. Cek keberadaan dan stok barang di gudang
        const product = await tx.product.findUnique({
          where: { id: Number(item.product_id) },
        });

        if (!product) throw new Error(`Produk ID ${item.product_id} tidak ditemukan.`);
        if (product.stock < item.quantity) {
          throw new Error(`Maaf, stok "${product.name}" tidak cukup. Sisa: ${product.stock}`);
        }

        // 2. Kurangi stok barang di database
        await tx.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity },
        });

        // 3. Masukkan ke daftar belanjaan pesanan ini
        totalAmount += product.price * item.quantity;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // 4. Bikin induk Pesanan (Order)
      const order = await tx.order.create({
        data: {
          userId: user.id,
          totalAmount,
          status: "completed", // Langsung sukses (demo mode)
          items: {
            create: orderItemsData,
          },
        },
        include: { items: { include: { product: true } } },
      });

      return order;
    });

    return NextResponse.json(
      { message: "Pesanan sukses dikunci!", order: result },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Gagal memproses pesanan." },
      { status: 400 },
    );
  }
}

// GET - Tarik Semua Riwayat Belanja User
export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: "Login dulu bosku!" }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
