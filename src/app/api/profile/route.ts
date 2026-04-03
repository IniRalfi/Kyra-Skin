import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { age, gender, skin_type, skin_concerns, allergies } = body;

  const profile = await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {
      age: parseInt(age),
      gender: parseInt(gender),
      skinType: parseInt(skin_type),
      concerns: skin_concerns || [],
      allergies: allergies || [],
    },
    create: {
      userId: user.id,
      age: parseInt(age),
      gender: parseInt(gender),
      skinType: parseInt(skin_type),
      concerns: skin_concerns || [],
      allergies: allergies || [],
    },
  });

  return NextResponse.json({ message: "Profile saved", profile }, { status: 200 });
}

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ profile: user.profile }, { status: 200 });
}
