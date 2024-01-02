"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartDrawerContextProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartDrawerContext = createContext<CartDrawerContextProps>({} as CartDrawerContextProps);

const hashRouteName = "#/cart";

export const CartDrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(location.hash.includes(hashRouteName));
  }, [pathname, params]);

  const open = () => {
    router.push(hashRouteName, { scroll: false });
  };

  const close = () => {
    router.back();
  };

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        open,
        close,
      }}>
      {children}
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => useContext(CartDrawerContext);
