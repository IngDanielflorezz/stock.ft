import { auth } from "@/lib/auth";

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  return { id: session.user.id, name: session.user.name, email: session.user.email };
}

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error("No autorizado");
  return user;
}
