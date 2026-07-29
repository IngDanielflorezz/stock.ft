import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProductsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const products = await prisma.product.findMany({
    where: { userId: session.user.id, active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/products/new" className={cn(buttonVariants(), "inline-flex items-center gap-2")}>
          <Plus className="h-4 w-4" />Nuevo producto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-muted-foreground">No hay productos. Crea tu primer producto.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Stock Mínimo</TableHead>
              <TableHead>Precio Venta</TableHead>
              <TableHead>Categoría</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {p.name}
                    {p.stock <= p.minStock && <TriangleAlert className="h-4 w-4 text-amber-500" />}
                  </div>
                </TableCell>
                <TableCell>{p.sku || "—"}</TableCell>
                <TableCell className={p.stock <= p.minStock ? "text-amber-600 font-semibold" : ""}>{p.stock}</TableCell>
                <TableCell>{p.minStock}</TableCell>
                <TableCell>${p.salePrice.toFixed(2)}</TableCell>
                <TableCell>{p.category || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
