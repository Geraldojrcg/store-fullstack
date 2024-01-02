"use client";

import React from "react";

import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "./CartContext";
import { CartDrawerProvider } from "./CartDrawerContext";

export default function AppContext({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CartDrawerProvider>
        {children}
        <CartDrawer />
      </CartDrawerProvider>
    </CartProvider>
  );
}
