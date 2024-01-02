import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { api } from "@/trpc/react";

import { type SignUpSchema, signUpValidationSchema } from "../validations/auth";
import Button from "./Button";
import Input from "./Input";

export default function SignUpForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpValidationSchema),
  });

  const { mutateAsync } = api.auth.signUp.useMutation();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const onSubmit = useCallback(
    async (data: SignUpSchema) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.replace(callbackUrl);
      }
    },
    [mutateAsync, router, callbackUrl]
  );

  return (
    <form className="flex flex-col flex-1 gap-4 grow" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <Input type="text" placeholder="Name" {...register("name")} />
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />
      </div>
      <div className="flex gap-6 self-center">
        <Button
          label="Cancel"
          className="bg-white text-blue-600 hover:bg-white"
          onClick={() => router.back()}
        />
        <Button type="submit" label="Sign Up" />
      </div>
    </form>
  );
}
