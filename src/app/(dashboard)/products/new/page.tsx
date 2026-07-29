"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", sku: "", barcode: "", description: "",
    costPrice: "0", salePrice: "0", stock: "0", minStock: "0",
    category: "", supplier: "", location: "",
  });
  const [saving, setSaving] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        costPrice: parseFloat(form.costPrice),
        salePrice: parseFloat(form.salePrice),
        stock: parseInt(form.stock),
        minStock: parseInt(form.minStock),
      }),
    });

    if (res.ok) {
      router.push("/products");
      router.refresh();
    }
    setSaving(false);
  }

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre *</label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">SKU</label>
                <Input name="sku" value={form.sku} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Código de barras</label>
                <Input name="barcode" value={form.barcode} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock *</label>
                <Input name="stock" type="number" value={form.stock} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock mínimo</label>
                <Input name="minStock" type="number" value={form.minStock} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Precio costo</label>
                <Input name="costPrice" type="number" step="0.01" value={form.costPrice} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Precio venta *</label>
                <Input name="salePrice" type="number" step="0.01" value={form.salePrice} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <Input name="category" value={form.category} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Proveedor</label>
                <Input name="supplier" value={form.supplier} onChange={handleChange} />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
