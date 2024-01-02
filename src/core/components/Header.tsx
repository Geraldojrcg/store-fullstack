import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

import { api } from "@/trpc/server";

import ProfileHeaderItem from "./ProfileHeaderItem";

export default async function Header() {
  const categories = await api.productCategory.getAll.query();

  return (
    <nav className="flex flex-row justify-between items-center py-4 px-10 bg-white shadow-md">
      <div className="flex flex-row gap-8 items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={150} height={42} />
        </Link>
        {categories?.map(({ id, name }) => (
          <Link key={id} href={`/category/${id}`}>
            <p className="text-blue-700 hover:text-blue-400">{name}</p>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <ProfileHeaderItem />
        <Link href="#/cart" scroll={false} className="text-2xl text-blue-600">
          <FiShoppingCart />
        </Link>
      </div>
    </nav>
  );
}
