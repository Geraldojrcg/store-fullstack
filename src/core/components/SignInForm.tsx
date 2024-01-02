import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { type SignInSchema, signInValidationSchema } from "../validations/auth";
import Button from "./Button";
import Input from "./Input";

export default function SignInForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInValidationSchema),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/profile";

  const onSubmit = useCallback(async (data: SignInSchema) => {
    await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
      callbackUrl,
    });
  }, []);

  return (
    <form className="flex flex-col flex-1 gap-4 grow" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />
      </div>
      <div className="flex gap-6 self-center">
        <Button
          label="Cancel"
          className="bg-white text-blue-600 hover:bg-white"
          onClick={() => router.back()}
        />
        <Button type="submit" label="Sign In" />
      </div>
    </form>
  );
}
