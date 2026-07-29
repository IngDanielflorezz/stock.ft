import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: { ...data, userId: session.user.id },
    });
    return Response.json(product, { status: 201 });
  } catch {
    return Response.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
