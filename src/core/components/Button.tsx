import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  label: string;
} & React.ComponentProps<"button">;

export default function Button({ label, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        className
      )}>
      {label}
    </button>
  );
}
