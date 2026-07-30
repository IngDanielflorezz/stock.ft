import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ArrowRightLeft, LayoutDashboard } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r bg-muted/30 p-4 flex flex-col">
        <Link href="/" className="text-xl font-bold mb-8 block">Stock.FT</Link>
        <nav className="space-y-1 flex-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/products" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm">
            <Package className="h-4 w-4" /> Productos
          </Link>
          <Link href="/movements" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm">
            <ArrowRightLeft className="h-4 w-4" /> Movimientos
          </Link>
        </nav>
        <div className="text-xs text-muted-foreground">{session.user.email}</div>
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
