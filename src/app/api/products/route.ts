import { productService } from "@/modules/product";
import { requireSessionUser } from "@/shared/infrastructure/session-provider";

export async function POST(request: Request) {
  try {
    const user = await requireSessionUser();
    const data = await request.json();
    const result = await productService.create({ ...data, userId: user.id });
    return result.toResponse();
  } catch (e) {
    const message = (e as Error).message;
    if (message === "No autorizado") {
      return Response.json({ error: message }, { status: 401 });
    }
    return Response.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
