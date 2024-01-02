"use client";

import { type Product } from "@prisma/client";
import React, { createContext, useContext, useMemo, useState } from "react";

type CartItems = Record<number, { product: Product; quantity: number }>;

type CartContextProps = {
  items: CartItems;
  itemsQuantity: number;
  total: number;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
};

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItems>({});

  const total = useMemo(() => {
    return Object.values(items).reduce(
      (acc, item) => (acc += item.quantity * Number(item.product.price)),
      0
    );
  }, [items]);

  const addItem = (item: Product) => {
    const currentItem = items[item.id];
    if (!currentItem) {
      return setItems((prev) => ({ ...prev, [item.id]: { product: item, quantity: 1 } }));
    }

    currentItem.quantity += 1;
    return setItems((prev) => ({ ...prev, [item.id]: currentItem }));
  };

  const removeItem = (item: Product) => {
    const currentItem = items[item.id];
    if (!currentItem) {
      return;
    }

    if (currentItem.quantity > 1) {
      currentItem.quantity -= 1;
      return setItems((prev) => ({ ...prev, [item.id]: currentItem }));
    }

    return setItems((prev) =>
      Object.keys(items)
        .filter((k) => Number(k) !== item.id)
        .reduce((acc, k) => ({ ...acc, [k]: prev[Number(k)] }), {})
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemsQuantity: Object.keys(items).length,
        total,
        addItem,
        removeItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
