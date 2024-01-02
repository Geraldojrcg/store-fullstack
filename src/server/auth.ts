import { type AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "@/trpc/server";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "SignIn",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await api.auth.signIn.mutate({
          email: credentials?.username ?? "",
          password: credentials?.password ?? "",
        });
        return user;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
