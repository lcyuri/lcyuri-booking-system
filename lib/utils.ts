import { Booking, BookingForm } from "@/types/Booking"
import { SelectOption } from "@/types/Component";
import { AVAILABLE_TIMES, EMAIL_REGEX, NAME_REGEX } from "@/lib/constants";
import { Service } from "@/types/Service";

export const getEmptyBookingForm = (): BookingForm => {
  return ({
    name: "",
    email: "",
    date: "",
    time: "",
  });
};

export const getTimeOptions = (service: Service, bookings: Booking[], selectedDate: string): SelectOption[] => {
  const bookedTimes = new Set(
    bookings
      .filter((bkg) => bkg.serviceId === service.id && bkg.date === selectedDate)
      .map((bkg) => bkg.time)
  );

  return AVAILABLE_TIMES.map((time) => ({
    label: time,
    value: time,
    disabled: bookedTimes.has(time)
  }));
};

export const getCurrentLabel = (options: SelectOption[], value: string): string | undefined => {
  const currentOption = options.find((option) => option.value === value);
  return currentOption?.label;
};

export const validateName = (name: string): string => {
  const trimmed = name.trim();

  if (!trimmed) return "Name cannot be empty";
  if (trimmed.length < 2) return "Name must have at least 2 characters";
  if (NAME_REGEX.test(trimmed)) return "Name contains invalid characters";

  return "";
};

export const validateEmail = (email: string): string => {
  const trimmed = email.trim();

  if (!trimmed) return "Email cannot be empty";
  if (!EMAIL_REGEX.test(trimmed)) return "Email is invalid";

  return "";
};

export const getNextMonth = (current: Date): Date => {
  return new Date(current.getFullYear(), current.getMonth() + 1, 1);
};

export const getPrevMonth = (current: Date): Date => {
  return new Date(current.getFullYear(), current.getMonth() - 1, 1);
};

export const getCurrentMonthLabel = (current: Date): string => {
  return current.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  })
}

export const getGridDays = (currentMonth: Date): number[] => {
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export const getDateFromDay = (currentMonth: Date, day: number): Date => {
  return new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    day
  );
};

export const isPastDate = (currentMonth: Date, day: number): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateToCheck = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    day
  );

  return dateToCheck < today;
};

export const getISODate = (date: Date): string => {
  return date.toISOString().split("T")[0];
}

export const parseISODate = (value: string): Date => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const formatDateToDisplay = (date: Date): string => {
  console.log(date)

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  console.log(dd)
  console.log(mm)
  console.log(yyyy)

  return `${mm}/${dd}/${yyyy}`;
}