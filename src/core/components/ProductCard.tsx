"use client";

import { type Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import { formatToCurrency } from "../utils/currency";
import { getImageUrl } from "../utils/imageUrl";

type ProductCardProps = {
  product: Product & { categoryName: string };
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { open } = useCartDrawer();

  const { name, price, imageUrl, categoryName } = product;

  return (
    <div className="bg-white rounded shadow-lg w-[300px] items-center p-1">
      <Image
        src={getImageUrl(imageUrl)}
        alt={name}
        width={290}
        height={390}
        className="h-[390px] object-contain"
      />
      <div className="flex flex-col px-6 py-2 gap-4">
        <p className="text-bold">{name}</p>
        <p className="text-sm text-gray-500">{categoryName}</p>
        <p className="text-lg">{formatToCurrency(price)}</p>
        <button
          className="text-blue-600 self-start"
          onClick={() => {
            addItem(product);
            open();
          }}>
          Buy now
        </button>
      </div>
    </div>
  );
}
