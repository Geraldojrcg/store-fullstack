import ProductList from "@/core/components/ProductList";
import { api } from "@/trpc/server";

export default async function Home() {
  const products = await api.product.getAll.query();

  return (
    <div className="flex flex-col">
      <h2 className="text-xl py-8">Most recently sold!</h2>
      <ProductList products={products.map((p) => ({ ...p, categoryName: p.category.name }))} />
    </div>
  );
}
