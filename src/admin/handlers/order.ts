import { type ActionContext, type ActionRequest, type ActionResponse } from "adminjs";

import { db } from "@/server/db";

export type OrderItems = ({
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    categoryId: number;
  };
} & {
  id: number;
  quantity: number;
  productId: number;
  orderId: number;
})[];

export const loadOrderProducts = async (
  originalResponse: ActionResponse,
  request: ActionRequest,
  context: ActionContext
) => {
  const record = context.record?.toJSON();

  const order = await db.order.findFirst({
    where: {
      id: +(record?.params.id ?? 0),
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!record) return undefined;

  record.params = {
    ...record.params,
    items: order?.items,
  };

  return {
    record,
  };
};
