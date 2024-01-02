"use client";

import { type Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { useCart } from "../context/CartContext";
import { formatToCurrency } from "../utils/currency";
import { getImageUrl } from "../utils/imageUrl";

type CartDrawerItemProps = {
  item: {
    product: Product;
    quantity: number;
  };
};

export default function CartDrawerItem({ item }: CartDrawerItemProps) {
  const {
    quantity,
    product: { name, price, imageUrl },
  } = item;

  const { addItem, removeItem } = useCart();

  return (
    <div className="bg-white rounded shadow-lg flex gap-2 items-center p-1">
      <Image
        src={getImageUrl(imageUrl)}
        alt={name}
        width={90}
        height={120}
        className="h-[120px] object-contain"
      />
      <div className="flex flex-col  py-2 gap-4 grow">
        <div className="flex flex-col gap-1">
          <p className="text-bold">{name}</p>
          <p className="text-sm text-gray-400">{formatToCurrency(price)}</p>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <p className="text-base md:text-lg">{formatToCurrency(quantity * price)}</p>
          <div className="flex gap-2 md:gap-6 px-2 md:px-4 items-center border-2 border-gray-600 rounded">
            <button
              className="text-base md:text-lg p-1 md:p-2"
              onClick={() => removeItem(item.product)}>
              -
            </button>
            <p>{quantity}</p>
            <button
              className="text-base md:text-lg p-1 md:p-2"
              onClick={() => addItem(item.product)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
