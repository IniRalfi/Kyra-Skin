import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/db";

export async function getUserFromRequest(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyToken(token);

  if (!payload || !payload.id) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: payload.id as number },
    include: { profile: true },
  });
}
