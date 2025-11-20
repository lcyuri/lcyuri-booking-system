"use client";

import { ButtonProps } from "@/types/Component";
import clsx from "clsx";

export default function Button({
  variant = "primary",
  disabled = false,
  fullWidth = false,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-[#14B8A6] text-white hover:bg-[#0D9488] focus-visible:ring-[#14B8A6]",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-300"
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer ",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 px-4 py-2 text-base",
        variantStyles[variant],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed hover:none !hover:bg-none !bg-opacity-50"
      )}
    >
      {loading ? (
        // Loading button
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        // Button label
        children
      )}
    </button>
  );
}
