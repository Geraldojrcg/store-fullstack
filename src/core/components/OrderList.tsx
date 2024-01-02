import React from "react";

import { api } from "@/trpc/server";

import { formatToCurrency } from "../utils/currency";

export default async function OrderList() {
  const orders = await api.order.getCustomerOrders.query();

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div className="flex p-4 justify-between shadow-lg">
          <p className="w-12">{order.status}</p>
          <p className="w-12">{formatToCurrency(order.total)}</p>
          <p>{new Date(order.createdAt).toDateString()}</p>
          <p>
            {order.items.length} {order.items.length > 1 ? "items" : "item"}
          </p>
        </div>
      ))}
    </div>
  );
}
