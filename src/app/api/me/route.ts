import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile: user.profile,
  };

  return NextResponse.json(safeUser, { status: 200 });
}
