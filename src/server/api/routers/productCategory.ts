import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productCategoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.productCategory.findMany({
      take: 12,
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
