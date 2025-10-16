import * as React from "react";
import { DayPickerProps } from "react-day-picker";

export type CalendarProps = {
  className?: string;
  classNames?: Partial<Record<string, string>>;
  showOutsideDays?: boolean;
  captionLayout?: "label" | "dropdown";
  _buttonVariant?: "ghost";
  formatters?: DayPickerProps["formatters"];
  components?: DayPickerProps["components"];
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from: Date; to: Date } | undefined;
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
  initialFocus?: boolean;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
  required?: boolean;
} & Omit<DayPickerProps, 'className' | 'classNames' | 'showOutsideDays' | 'captionLayout' | 'formatters' | 'components' | 'mode' | 'selected' | 'onSelect' | 'initialFocus' | 'fromDate' | 'toDate' | 'disabled' | 'required'>

export interface CalendarDayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  day: {
    date: Date;
    [key: string]: any;
  };
  modifiers: Record<string, boolean>;
}

export interface DateTimePickerWebProps {
  value?: Date;
  onChange?: (date: Date) => void;
  onApply?: (date: Date) => void;
  onCancel?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  status?: "error" | "success";
  dateFormat?: string;
  showTime?: boolean;
  showSeconds?: boolean;
  timeStep?: number;
}

export interface DateTimePickerResponsiveProps {
  value?: Date;
  onChange?: (date: Date) => void;
  onApply?: (date: Date) => void;
  children: React.ReactNode;
  useModal?: boolean;
  title?: string;
  showClear?: boolean;
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[] | undefined) => void;
  initialFocus?: boolean;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
}