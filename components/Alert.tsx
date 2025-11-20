"use client";

import { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { AlertProps } from "@/types/Component";

export default function Alert({
  variant = "success",
  mode = "box",
  title,
  children,
  onClose,
  autoClose,
}: AlertProps) {

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);
  const variantStyles = {
    success: "bg-[#14B8A6]/10 border-[#14B8A6] text-[#0F766E]",
    error: "bg-red-100 border-red-400 text-red-700",
    loading: "bg-blue-50 border-blue-400",
  };

  const modeStyles = {
    box: "w-full",
    toast: "fixed top-4 left-1/2 -translate-x-1/2 shadow-lg pointer-events-auto animate-slide-in"
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 mt-0.5" />,
    error: <XCircle className="w-5 h-5 mt-0.5" />,
    loading: <Loader2 className="w-5 h-5 mt-0.5 animate-spin" />
  };

  return (
    <Transition
      as={Fragment}
      show
      enter="transition-all duration-200"
      enterFrom="opacity-0 -translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-2"
    >
      <div
        className={clsx(
          "rounded-lg border p-4 flex items-start gap-3 text-gray-600 bg-white",
          variantStyles[variant],
          modeStyles[mode]
        )}
      >
        {/* Alert icon */}
        <span>{icons[variant]}</span>

        {/* Alert message */}
        <div className="flex-1">
          {/* Title */}
          {title && (
            <div className="font-semibold">{title}</div>
          )}

          {/* Description */}
          {children && (
            <div className="text-sm">{children}</div>
          )}
        </div>
      </div>
    </Transition>
  );
}
