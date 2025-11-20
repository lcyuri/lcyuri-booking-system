"use client";

import { Fragment } from "react";
import clsx from "clsx";
import { Transition } from "@headlessui/react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export default function Card({
  header,
  subtitle,
  children,
  ...props
}: CardProps) {
  return (
    // Card effect
    <Transition
      as={Fragment}
      show
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        {...props}
        className={clsx(
          "rounded-xl p-4 transition-all duration-200 bg-white",
          "border border-gray-200 bg-white hover:shadow-md hover:-translate-y-1"
        )}
      >
        {/* Card header */}
        {header && (
          <div className="mb-3 text-xl font-semibold text-gray-900">{header}</div>
        )}

        {/* Card description */}
        {subtitle && (
          <div className="text-gray-600 mb-4">{subtitle}</div>
        )}

        {/* Card content */}
        <div>{children}</div>
      </div>
    </Transition>
  );
}
