"use client";

import { InputProps } from "@/types/Component";
import clsx from "clsx";

export default function Input({
  label,
  variant = "outline",
  fullWidth = false,
  error,
  ...props
}: InputProps) {
  const variantStyles = {
    primary: "border-[#14B8A6] focus:border-[#0D9488] focus:ring-2 focus:ring-[#14B8A6]",
    outline: "border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300",
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-1",
        fullWidth && "w-full"
      )}
    >
      {/* Input label */}
      {label && (
        <label className="font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Input field */}
      <input
        {...props}
        className={clsx(
          "rounded-lg px-3 py-2 border focus:outline-none transition-colors shadow-sm",
          variantStyles[variant],
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          fullWidth && "w-full"
        )}
      />

      {/* Error description */}
      {error && (
        <span className="text-sm text-red-600">{error}</span>
      )}
    </div>
  );
}
