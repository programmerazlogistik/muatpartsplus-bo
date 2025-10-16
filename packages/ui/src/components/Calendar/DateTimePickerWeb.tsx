"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import Button from "../Button/Button";
import IconComponent from "../IconComponent/IconComponent";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { Calendar } from "./Calendar";
import { DateTimePickerWebProps } from "./types";

// --- DYNAMIC TIME WHEEL CONFIGURATION ---
const TIME_SLOT_HEIGHT = 32; // h-8 in Tailwind
const GAP = 0; // gap-0
const EFFECTIVE_SLOT_HEIGHT = TIME_SLOT_HEIGHT + GAP;
// --- END CONFIGURATION ---

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

interface TimeColumnProps {
  values: number[];
  selectedValue: number;
  onSelect: (value: number) => void;
  visibleItemCount?: number;
}

/**
 * An infinitely looping, snap-to-center scrollable wheel for time selection.
 */
const TimeColumn = ({
  values,
  selectedValue,
  onSelect,
  visibleItemCount = 9,
}: TimeColumnProps) => {
  const { containerHeight, paddingY } = useMemo(() => {
    if (visibleItemCount % 2 === 0) {
      console.warn(
        "TimeColumn: `visibleItemCount` should be an odd number for perfect centering."
      );
    }
    const height =
      visibleItemCount * TIME_SLOT_HEIGHT + (visibleItemCount - 1) * GAP;
    const padding = height / 2 - TIME_SLOT_HEIGHT / 2;
    return { containerHeight: height, paddingY: padding };
  }, [visibleItemCount]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dummyScrollerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrolling = useRef(false);
  const userScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const loopedValues = useRef([...values, ...values, ...values]).current;

  const maskGradient = useMemo(() => {
    const startPercent = (paddingY / containerHeight) * 100;
    const endPercent = ((paddingY + TIME_SLOT_HEIGHT) / containerHeight) * 100;
    return `linear-gradient(to bottom, transparent, transparent ${startPercent - 5}%, black ${startPercent}%, black ${endPercent}%, transparent ${endPercent + 5}%, transparent)`;
  }, [paddingY, containerHeight]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const initialIndex = values.indexOf(selectedValue);
      if (initialIndex !== -1) {
        const targetIndex = values.length + initialIndex;
        const initialScrollTop = targetIndex * EFFECTIVE_SLOT_HEIGHT;
        container.scrollTop = initialScrollTop;
        if (dummyScrollerRef.current)
          dummyScrollerRef.current.scrollTop = initialScrollTop;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isUserScrolling.current) return;
    const container = scrollContainerRef.current;
    if (container) {
      const currentIndex = Math.round(
        container.scrollTop / EFFECTIVE_SLOT_HEIGHT
      );
      const currentValue = loopedValues[currentIndex];
      if (currentValue !== selectedValue) {
        const targetBaseIndex = values.indexOf(selectedValue);
        if (targetBaseIndex !== -1) {
          const targetLoopedIndex = values.length + targetBaseIndex;
          const targetScrollTop = targetLoopedIndex * EFFECTIVE_SLOT_HEIGHT;
          container.scrollTo({ top: targetScrollTop, behavior: "auto" });
        }
      }
    }
  }, [selectedValue, values, loopedValues]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (dummyScrollerRef.current)
      dummyScrollerRef.current.scrollTop = container.scrollTop;

    isUserScrolling.current = true;
    if (userScrollTimeout.current) {
      clearTimeout(userScrollTimeout.current);
    }
    userScrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 150);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const blockHeight = values.length * EFFECTIVE_SLOT_HEIGHT;
      if (container.scrollTop < blockHeight) container.scrollTop += blockHeight;
      else if (container.scrollTop >= blockHeight * 2)
        container.scrollTop -= blockHeight;
      const newIndex = Math.round(container.scrollTop / EFFECTIVE_SLOT_HEIGHT);
      const newValue = loopedValues[newIndex];
      if (newValue !== undefined && newValue !== selectedValue)
        onSelect(newValue);
    }, 50);
  };

  const handleClick = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const baseIndex = index % values.length;
    const targetLoopedIndex = values.length + baseIndex;
    const targetScrollTop = targetLoopedIndex * EFFECTIVE_SLOT_HEIGHT;
    container.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  const renderTimeSlots = (textColorClass: string) => (
    <div
      className="flex flex-col items-center"
      style={{ paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }}
    >
      {loopedValues.map((value, index) => {
        const isSelected = value === selectedValue;
        return (
          <button
            type="button"
            key={index}
            onClick={() => (isSelected ? undefined : handleClick(index))}
            className={cn(
              "flex h-8 w-full snap-center items-center justify-center text-sm font-medium",
              textColorClass,
              isSelected ? "cursor-default" : "cursor-pointer"
            )}
          >
            {String(value).padStart(2, "0")}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="relative w-12" style={{ height: `${containerHeight}px` }}>
      <div className="bg-primary-700 pointer-events-none absolute left-0 top-1/2 z-0 h-8 w-full -translate-y-1/2 rounded-md"></div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="scrollbar-hide relative z-10 h-full snap-y snap-mandatory overflow-y-auto"
      >
        {renderTimeSlots("text-neutral-700")}
      </div>

      <div
        ref={dummyScrollerRef}
        className="pointer-events-none absolute inset-0 z-20 h-full overflow-y-hidden"
        style={{ WebkitMaskImage: maskGradient, maskImage: maskGradient }}
      >
        {renderTimeSlots("text-white")}
      </div>
    </div>
  );
};

const DateTimePickerWebImplementation = (
  {
    value: initialValue,
    onChange,
    onApply,
    onCancel,
    minDate,
    maxDate,
    disabled = false,
    status,
    dateFormat = "dd MMM yyyy, HH:mm",
    showTime = true,
    showSeconds = false,
    timeStep = 1,
    ...props
  }: DateTimePickerWebProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(
    initialValue || new Date()
  );
  const [tempDateTime, setTempDateTime] = useState(selectedDateTime);

  useEffect(() => {
    setSelectedDateTime(initialValue || new Date());
  }, [initialValue]);

  useEffect(() => {
    if (isOpen) {
      setTempDateTime(selectedDateTime);
    }
  }, [isOpen, selectedDateTime]);

  const handleApply = () => {
    setSelectedDateTime(tempDateTime);
    if (onChange) onChange(tempDateTime);
    if (onApply) onApply(tempDateTime);
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel(tempDateTime);
    setIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const newDate = new Date(tempDateTime);
    newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    setTempDateTime(newDate);
  };

  const handleHourSelect = (hour: number) => {
    const newDate = new Date(tempDateTime);
    newDate.setHours(hour);
    setTempDateTime(newDate);
  };

  const handleMinuteSelect = (minute: number) => {
    const newDate = new Date(tempDateTime);
    newDate.setMinutes(minute);
    setTempDateTime(newDate);
  };

  const statusClasses = {
    error: "border-error-500 focus:ring-error-500",
    success: "border-success-500 focus:ring-success-500",
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "focus:ring-primary-700 flex h-10 w-full items-center justify-between rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400",
            status && statusClasses[status]
          )}
        >
          <span className="text-neutral-900">
            {format(selectedDateTime, dateFormat, { locale: id })}
          </span>
          <IconComponent
            src="/icons/calendar24.svg"
            className="h-5 w-5 text-neutral-500"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          <Calendar
            mode="single"
            selected={tempDateTime}
            onSelect={handleDateSelect}
            initialFocus={true}
            fromDate={minDate}
            toDate={maxDate}
            disabled={disabled}
          />
          <div className="flex items-center justify-center gap-1 border-l border-neutral-200 bg-neutral-50/50 p-3">
            <TimeColumn
              values={hours}
              selectedValue={tempDateTime.getHours()}
              onSelect={handleHourSelect}
              visibleItemCount={9}
            />
            <span className="relative z-30 mb-2 text-2xl font-bold text-neutral-400">
              :
            </span>
            <TimeColumn
              values={minutes}
              selectedValue={tempDateTime.getMinutes()}
              onSelect={handleMinuteSelect}
              visibleItemCount={9}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-neutral-200 p-4">
          <Button
            variant="muatparts-primary-secondary"
            className="rounded-full"
            onClick={handleCancel}
          >
            Batal
          </Button>
          <Button
            variant="muatparts-primary"
            className="rounded-full"
            onClick={handleApply}
          >
            Terapkan
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DateTimePickerWeb = React.memo(
  React.forwardRef(DateTimePickerWebImplementation)
);
DateTimePickerWeb.displayName = "DateTimePickerWeb";

export default DateTimePickerWeb;