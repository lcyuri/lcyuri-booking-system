"use client";

import { useState } from "react";
import { Combobox, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import {
  formatDateToDisplay,
  getCurrentMonthLabel,
  getDateFromDay,
  getGridDays,
  getISODate,
  getNextMonth,
  getPrevMonth,
  isPastDate
} from "@/lib/utils";

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
  onChange: (date: string) => void;
}

export default function DatePicker({
  label,
  placeholder = "",
  value,
  variant = "primary",
  onChange,
  fullWidth = false
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const variantStyles = {
    primary: "border-[#14B8A6] focus:border-[#0D9488] focus:ring-2 focus:ring-[#14B8A6]",
    outline: "border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300",
  };

  const nextMonth = () => {
    const next = getNextMonth(currentMonth);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = getPrevMonth(currentMonth);
    setCurrentMonth(prev);
  };

  const handleDayClick = (selectedDate: Date) => {
    const formattedDate = getISODate(selectedDate);
    onChange(formattedDate);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Date picker label */}
      {label && (
        <label className="font-medium text-gray-700">
          {label}
        </label>
      )}

      <Combobox value={value}>
        <div className="relative w-full">
          {/* Input field */}
          <div
            tabIndex={0}
            onClick={() => setOpen(!open)}
            className={clsx(
              "flex items-center justify-between rounded-lg px-3 py-2 border focus:outline-none transition-colors shadow-sm cursor-pointer",
              variantStyles[variant],
              fullWidth && "w-full"
            )}
          >
            {/* Placeholder */}
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {value ? formatDateToDisplay(value) : placeholder}
            </span>

            {/* Icon */}
            <Calendar className="w-4 h-4 opacity-60" />
          </div>

          {/* Datepicker dropdown */}
          <Transition
            show={open}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ComboboxOptions
              static
              className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4"
            >
              {/* Month header */}
              <div className="flex justify-between items-center mb-3">
                {/* Previous button */}
                <button
                  type="button"
                  onClick={prevMonth}
                  className="px-2 py-1 rounded-md hover:bg-gray-200 cursor-pointer"
                >
                  {<ChevronLeft className="w-5" />}
                </button>

                {/* Month label */}
                <div className="font-medium capitalize">
                  {getCurrentMonthLabel(currentMonth)}
                </div>

                {/* Next button */}
                <button
                  type="button"
                  onClick={nextMonth}
                  className="px-2 py-1 rounded-md hover:bg-gray-200 cursor-pointer"
                >
                  {<ChevronRight className="w-5" />}
                </button>
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {getGridDays(currentMonth).map((day) => {
                  // Disabled past days
                  if (isPastDate(currentMonth, day)) {
                    return (
                      <div
                        key={day}
                        className="p-1 rounded-md text-center text-sm text-gray-400 cursor-not-allowed opacity-40"
                      >
                        {day}
                      </div>
                    );
                  };

                  const date = getDateFromDay(currentMonth, day);
                  const isSelected = value && value?.toDateString() === date.toDateString();

                  // Valid days
                  return (
                    <ComboboxOption
                      key={day}
                      value={date}
                      onClick={() => handleDayClick(date)}
                      className={clsx(
                        "p-1 rounded-md text-center text-sm cursor-pointer hover:bg-gray-200",
                        isSelected && "bg-[#14B8A6] text-white"
                      )}
                    >
                      {day}
                    </ComboboxOption>
                  );
                }
                )}
              </div>
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
