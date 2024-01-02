import * as z from "zod";

export const signInValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signUpValidationSchema = signInValidationSchema.extend({
  name: z.string(),
});

export type SignInSchema = z.infer<typeof signInValidationSchema>;
export type SignUpSchema = z.infer<typeof signUpValidationSchema>;
