import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import OrderList from "@/core/components/OrderList";
import { getServerAuthSession } from "@/server/auth";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    return redirect("/404");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="text-lg bold">Hello, {user.name}</h1>
        <Link href="/api/auth/signout?callbackUrl=/" className="text-blue-600">
          Sign Out
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h2>Orders</h2>
        <OrderList />
      </div>
    </div>
  );
}
