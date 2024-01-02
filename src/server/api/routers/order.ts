import { newOrderValidationSchema } from "@/core/validations/order";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const orderRouter = createTRPCRouter({
  newOrder: protectedProcedure.input(newOrderValidationSchema).mutation(async ({ ctx, input }) => {
    const { total, items } = input;
    const {
      session: { user },
    } = ctx;

    const order = await ctx.db.order.create({
      data: {
        customerId: user.id,
        total,
        items: {
          createMany: {
            data: items,
          },
        },
      },
    });

    return order;
  }),
  getCustomerOrders: protectedProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany({
      where: {
        customerId: ctx.session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }),
});
