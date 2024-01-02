import { createTRPCRouter } from "@/server/api/trpc";

import { authRouter } from "./routers/auth";
import { orderRouter } from "./routers/order";
import { productRouter } from "./routers/product";
import { productCategoryRouter } from "./routers/productCategory";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  productCategory: productCategoryRouter,
  auth: authRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
