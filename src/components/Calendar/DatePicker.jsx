import { useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Calendar } from "@muatmuat/ui/Calendar";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { Popover, PopoverContent, PopoverTrigger } from "@muatmuat/ui/Popover";

/**
 * A custom date picker input component built from scratch that uses a Popover
 * to display the Calendar component for date selection.
 *
 * @param {object} props - The props for the component.
 * @param {Date | undefined} props.value - The currently selected date (for controlled component).
 * @param {(date: Date | undefined) => void} props.onChange - Callback function when the date changes.
 * @param {string} [props.placeholder="Pilih Tanggal"] - The placeholder text to display.
 * @param {boolean} [props.disabled=false] - Disables the date picker.
 * @param {string} [props.className] - Additional classes for styling the main trigger element.
 * @param {string} [props.error] - Error message to display below the input.
 * @returns {JSX.Element} The rendered date picker component.
 */
export const DatePicker = ({
  value: controlledValue,
  onChange: setControlledValue,
  placeholder = "Pilih Tanggal",
  disabled = false,
  className,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalDate, setInternalDate] = useState(undefined);

  // Determine if the component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const date = isControlled ? controlledValue : internalDate;
  const setDate = isControlled ? setControlledValue : setInternalDate;

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setIsOpen(false); // Close the popover on date selection
  };

  const formatDate = (dateToFormat) => {
    return dateToFormat.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-8 w-full items-center justify-between rounded-md border bg-white px-2 py-2 text-xs font-medium",
              "focus:outline-none focus:ring-2 focus:ring-primary-500",
              "disabled:cursor-not-allowed disabled:bg-neutral-100",
              errorMessage
                ? "border-error-500 focus:ring-error-500"
                : "border-neutral-400",
              className
            )}
          >
            <span className={cn(!date && "text-neutral-500")}>
              {date ? formatDate(date) : placeholder}
            </span>
            <IconComponent
              src="/icons/calendar.svg" // Assuming this is the correct path
              className="size-4 text-neutral-600"
              alt="Calendar Icon"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="max-w-[300px]"
          />
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <span className="mt-1 text-xs text-error-500">{errorMessage}</span>
      )}
    </div>
  );
};
