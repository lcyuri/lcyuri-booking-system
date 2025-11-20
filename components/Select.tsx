"use client";

import { Fragment, useMemo } from "react";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { SelectProps } from "@/types/Component";
import { getCurrentLabel } from "@/lib/utils";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

export default function Select({
  label,
  value,
  options,
  placeholder = "",
  variant = "outline",
  fullWidth = false,
  disabled = false,
  onChange
}: SelectProps) {
  const selectedValue = useMemo(() => {
    return value ? getCurrentLabel(options, value) : placeholder;
  }, [value]);

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
      {/* Select label */}
      {label && (
        <label className="font-medium text-gray-700">
          {label}
        </label>
      )}

      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div
          className={clsx(
            "relative",
            fullWidth && "w-full"
          )}
        >
          {/* Select button */}
          <ListboxButton
            disabled={disabled}
            className={clsx(
              "w-full flex justify-between items-center px-3 py-2 rounded-lg border bg-white shadow-sm text-left transition-colors",
              variantStyles[variant],
              disabled && "opacity-50 cursor-not-allowed text-gray-400"
            )}
          >
            {/* Select plaholder/value */}
            <span className={value ? "text-gray-700" : "text-gray-400"}>
              {selectedValue}
            </span>

            {/* Select icon */}
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </ListboxButton>

          {/* Options dropdown animation */}
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-75 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            {/* Options dropdown */}
            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow">

              {options.map((option) => (

                <ListboxOption
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={clsx(
                    "select-none px-3 py-2 flex items-center justify-between",
                    option.disabled
                      ? "cursor-not-allowed text-gray-400 line-through"
                      : "cursor-pointer"
                  )}
                >
                  {({ selected, disabled }) => (
                    <div className="flex items-center justify-between w-full">
                      {/* Option label */}

                      <span className={disabled ? "line-through text-gray-400" : ""}>
                        {option.label}
                      </span>

                      {/* Checked indicator */}
                      {!disabled && selected && (
                        <Check className="w-4 h-4 text-[#14B8A6]" />
                      )}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
