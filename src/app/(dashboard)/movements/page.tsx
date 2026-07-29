import { redirect } from "next/navigation";
import { getSessionUser } from "@/shared/infrastructure/session-provider";
import { movementService } from "@/modules/movement";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function MovementsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const result = await movementService.getAll(user.id);
  const movements = result.success ? result.value! : [];

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
                <TableCell>{new Date(m.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={
                    m.type === "in" ? "text-green-600 font-medium" : "text-red-600 font-medium"
                  }>
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
