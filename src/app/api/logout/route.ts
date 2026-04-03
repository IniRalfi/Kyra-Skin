import { NextResponse } from "next/server";

export async function POST() {
  // Karena kita pakai localStorage di client, logout API sebenarnya cuma return HTTP 200 aja.
  // Token akan dihapus oleh AuthContext.
  return NextResponse.json({ message: "Logout berhasil" });
}
