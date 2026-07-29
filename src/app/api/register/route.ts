import { registerUseCase } from "@/modules/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const result = await registerUseCase.execute({ name, email, password });
    return result.toResponse();
  } catch {
    return Response.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
