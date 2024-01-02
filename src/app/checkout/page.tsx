"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import Button from "@/core/components/Button";
import CartDrawerItem from "@/core/components/CartDrawerItem";
import CheckoutButton from "@/core/components/CheckoutButton";
import SignInForm from "@/core/components/SignInForm";
import SignUpForm from "@/core/components/SignUpForm";
import { useCart } from "@/core/context/CartContext";
import { formatToCurrency } from "@/core/utils/currency";
import { api } from "@/trpc/react";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const { mutateAsync, isLoading } = api.order.newOrder.useMutation();

  const { items, itemsQuantity, total } = useCart();

  const [state, setState] = useState<string | null>(null);

  const user = session?.user;

  const isLogged = !!user;

  const hasItems = itemsQuantity > 0;

  useEffect(() => {
    setState(params.get("state"));
  }, [pathname, params]);

  const changeState = (newState: "signin" | "signup") => {
    return router.push(`?state=${newState}&callbackUrl=/checkout`);
  };

  const createOrder = async () => {
    await mutateAsync({
      total,
      items: Object.values(items).map((item) => ({
        quantity: item.quantity,
        productId: item.product.id,
      })),
    });
    router.push("/profile");
  };

  const ComponentByState = useMemo(() => {
    switch (state) {
      case "signup":
        return (
          <div className="flex flex-col gap-2">
            <p>Sign Up</p>
            <SignUpForm />
          </div>
        );
      case "signin":
        return (
          <div className="flex flex-col gap-2">
            <p>Sign In</p>
            <SignInForm />
          </div>
        );
      default:
        return (
          <>
            <p>First, enter with your existent account or create one</p>
            <div className="flex gap-4">
              <Button label="Sign In" onClick={() => changeState("signin")} />
              <Button label="Create Account" onClick={() => changeState("signup")} />
            </div>
          </>
        );
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-bold text-2xl">Checkout</h1>
      <div className="flex gap-4">
        <div className="flex flex-[0.6] flex-col rounded-lg p-4 shadow-md">
          <p className="text-lg text-bold pb-4">Customer</p>
          {!isLogged && <div className="flex flex-1 flex-col gap-4">{ComponentByState}</div>}
          {isLogged && (
            <div className="flex flex-col gap-4">
              <div>
                <p>Name</p>
                <p className="text-gray-500">{user.name}</p>
              </div>
              <div>
                <p>Email</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 flex-col rounded-lg p-4 shadow-md">
            <p className="text-lg text-bold">Products</p>
            {hasItems && (
              <p className="text-base mt-2">
                {itemsQuantity} {itemsQuantity > 1 ? "items" : "item"}
              </p>
            )}
            {Object.values(items).map((item) => (
              <CartDrawerItem key={item.product.id} item={item} />
            ))}
          </div>
          <div className="flex flex-1 flex-col rounded-lg p-4 shadow-md gap-4">
            <p className="text-lg text-bold">Order</p>
            <div className="flex text-xl justify-between">
              <p>Total</p>
              <p>{formatToCurrency(total)}</p>
            </div>
            <div className="self-center">
              <CheckoutButton
                label="Finish order"
                disabled={!isLogged || isLoading}
                onClick={() => createOrder()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
