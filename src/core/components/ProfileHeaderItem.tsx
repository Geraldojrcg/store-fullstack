"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function ProfileHeaderItem() {
  const { data: session } = useSession();

  const user = session?.user;

  if (!user) return;

  return (
    <Link href="/profile">
      <p className="text-sm text-bold text-blue-600">{user.email}</p>
    </Link>
  );
}
