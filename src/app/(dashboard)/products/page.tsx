import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/shared/infrastructure/session-provider";
import { productService } from "@/modules/product";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProductsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const result = await productService.getAll(user.id);
  const products = result.success ? result.value! : [];

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
                    {p.isLowStock() && <TriangleAlert className="h-4 w-4 text-amber-500" />}
                  </div>
                </TableCell>
                <TableCell>{p.sku || "—"}</TableCell>
                <TableCell className={p.isLowStock() ? "text-amber-600 font-semibold" : ""}>
                  {p.stock}
                </TableCell>
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
