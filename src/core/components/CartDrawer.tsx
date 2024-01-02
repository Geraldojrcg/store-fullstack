"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { MdClose } from "react-icons/md";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useMediaQuery } from "usehooks-ts";

import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import { formatToCurrency } from "../utils/currency";
import CartDrawerItem from "./CartDrawerItem";
import CheckoutButton from "./CheckoutButton";

export default function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const { items, itemsQuantity, total } = useCart();
  const router = useRouter();

  const hasItems = itemsQuantity > 0;

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Drawer open={isOpen} onClose={close} direction="right" size={isMobile ? "80%" : "30%"}>
      <div className="h-full flex flex-col p-4 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-2xl text-bold">Cart</h1>
            <button className="text-2xl" onClick={() => router.back()}>
              <MdClose />
            </button>
          </div>
          {hasItems && (
            <p className="text-xl">
              {itemsQuantity} {itemsQuantity > 1 ? "items" : "item"}
            </p>
          )}
        </div>
        {hasItems ? (
          <>
            <div className="flex flex-col gap-2">
              {Object.values(items).map((item) => (
                <CartDrawerItem key={item.product.id} item={item} />
              ))}
            </div>
            <div className="flex text-xl justify-between">
              <p>Total</p>
              <p>{formatToCurrency(total)}</p>
            </div>
            <div className="flex">
              <CheckoutButton
                label="Finish order"
                onClick={() => router.push("/checkout", { scroll: false })}
              />
            </div>
          </>
        ) : (
          <div className="flex grow items-center justify-center">
            <p className="text-2xl">Empty Cart</p>
          </div>
        )}
      </div>
    </Drawer>
  );
}
