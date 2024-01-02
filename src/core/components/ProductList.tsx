import { type Product } from "@prisma/client";
import React from "react";

import ProductCard from "./ProductCard";

type ProductListProps = {
  products: (Product & { categoryName: string })[];
};

export default function ProductList({ products }: Readonly<ProductListProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
