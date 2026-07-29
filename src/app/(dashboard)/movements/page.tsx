import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function MovementsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const movements = await prisma.movement.findMany({
    where: { userId: session.user.id },
    include: { product: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Movimientos</h1>

      {movements.length === 0 ? (
        <p className="text-muted-foreground">No hay movimientos registrados.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Referencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={m.type === "in" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {m.type === "in" ? "Entrada" : "Salida"}
                  </span>
                </TableCell>
                <TableCell>{m.product.name}</TableCell>
                <TableCell>{m.quantity}</TableCell>
                <TableCell>{m.reference || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
