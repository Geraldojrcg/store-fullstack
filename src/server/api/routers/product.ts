import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      take: 12,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });
  }),
  getAllByCategoryId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.db.product.findMany({
        where: {
          categoryId: id,
        },
        take: 12,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      });
    }),
});
