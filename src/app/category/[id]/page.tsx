import React from "react";

import ProductList from "@/core/components/ProductList";
import { api } from "@/trpc/server";

export default async function ProductByCategoryIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const products = await api.product.getAllByCategoryId.query({ id: Number(id) });

  const categoryName = products[0]?.category?.name;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-white text-2xl">{categoryName}</h1>
      <ProductList products={products.map((p) => ({ ...p, categoryName: p.category.name }))} />
    </div>
  );
}
