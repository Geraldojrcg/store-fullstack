import * as z from "zod";

export const newOrderValidationSchema = z.object({
  total: z.number().positive(),
  items: z
    .object({
      quantity: z.number().positive(),
      productId: z.number(),
    })
    .array(),
});

export type NewOrderSchema = z.infer<typeof newOrderValidationSchema>;
