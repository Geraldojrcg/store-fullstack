import { TRPCError } from "@trpc/server";
import { hash, verify } from "argon2";

import { signInValidationSchema, signUpValidationSchema } from "@/core/validations/auth";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure.input(signInValidationSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;

    const user = await ctx.db.customer.findFirst({
      where: { email },
    });

    if (!user) return null;

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      return null;
    }

    return {
      id: String(user.id),
      email: user.email,
      name: user.name,
    };
  }),
  signUp: publicProcedure.input(signUpValidationSchema).mutation(async ({ ctx, input }) => {
    const { name, email, password } = input;

    const exists = await ctx.db.customer.findFirst({
      where: { email },
    });

    if (exists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password);

    const result = await ctx.db.customer.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
  }),
});
