import React, { forwardRef } from "react";

type InputProps = React.ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium leading-6 text-gray-900">{placeholder}</label>
      <input
        ref={ref}
        {...props}
        className="rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
      />
    </div>
  );
});

export default Input;
