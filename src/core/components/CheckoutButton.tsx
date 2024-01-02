import React from "react";

type CheckoutButtonProps = {
  label: string;
} & React.ComponentProps<"button">;

export default function CheckoutButton({ label, ...props }: CheckoutButtonProps) {
  return (
    <button
      className="flex grow p-4 justify-center border-2 border-blue-600 hover:bg-blue-200 disabled:bg-gray-200 rounded"
      {...props}>
      <p className="text-lg text-blue-600">{label}</p>
    </button>
  );
}
