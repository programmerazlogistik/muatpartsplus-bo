"use client";

import { forwardRef } from "react";

import { cn } from "@muatmuat/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";

import { tMockFn } from "../../lib/mock-t";
import IconComponent from "../IconComponent/IconComponent";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  notFoundText?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string | null;
  hideErrorMessage?: boolean;
  contentClassName?: string;
  searchable?: boolean;
  t?: (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

/**
 * @param {React.ComponentProps<typeof SelectPrimitive.Item> & { className?: string, children: React.ReactNode }} props
 */
const SelectItem: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Item> & {
    className?: string;
    children: React.ReactNode;
  }
> = ({ className, children, ...props }) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-2.5 px-2.5 py-3 text-left text-xs leading-[14.4px] transition-colors duration-150",
        "font-medium text-black outline-none hover:border-none hover:bg-neutral-200 hover:outline-none",
        "data-[state=checked]:bg-neutral-50 data-[state=checked]:font-semibold data-[state=checked]:text-black",
        className
      )}
      {...props}
    >
      <span className="absolute right-2.5 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <IconComponent
            src={"/icons/check-circle16.svg"}
            className="text-[#176CF7]"
            width={16}
            height={16}
          />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

/**
 * Select component implementation for dropdown selection
 * @param {SelectProps} props - Component props
 * @param {React.ForwardedRef<HTMLDivElement>} ref - The forwarded ref to the select content
 * @returns {React.ReactElement} Rendered Select component
 */
const SelectComponent = (
  props: SelectProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    t = tMockFn,
    options = [],
    value,
    onChange,
    placeholder = "Select item...",
    notFoundText = "No options available",
    disabled = false,
    className = "w-full",
    errorMessage = null,
    contentClassName,
    hideErrorMessage = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchable = false,
    ...restProps
  } = props;

  return (
    <div className="relative flex flex-col gap-2">
      <SelectPrimitive.Root
        data-slot="select"
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        {...restProps}
      >
        <SelectPrimitive.Trigger
          data-slot="select-trigger"
          data-size={"sm"}
          className={cn(
            "group",
            "flex h-8 items-center justify-between gap-2 rounded-md border px-3 text-sm font-semibold leading-[14.4px] transition-colors duration-200 md:text-xs md:font-medium",
            "focus:ring-primary-700/20 bg-white text-black focus:outline-none focus:ring-1",
            "hover:border-primary-700 data-[state=open]:border-primary-700 border-neutral-600",
            errorMessage && "border-red-500 focus:border-red-500",
            disabled && "cursor-not-allowed bg-gray-50 opacity-50",
            !value && "text-neutral-600",
            className
          )}
        >
          <SelectPrimitive.Value
            data-slot="select-value"
            placeholder={placeholder}
            className="flex-1 truncate text-left placeholder:text-neutral-600"
          />
          <SelectPrimitive.Icon asChild>
            <span
              data-slot="select-chevron"
              className="inline-flex transition-transform duration-200 group-data-[state=open]:rotate-180"
            >
              <IconComponent src="/icons/chevron-down.svg" />
            </span>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            ref={ref}
            data-slot="select-content"
            className={cn(
              "z-[52] overflow-hidden rounded-md border border-neutral-300 bg-white text-xs font-medium shadow-lg",
              "max-h-64",
              contentClassName
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport
              className={cn(
                "w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1 p-0",
                "scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-100 overflow-y-auto",
                "[&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar]:w-3",
                "[&::-webkit-scrollbar-thumb:rounded-sm] [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500"
              )}
            >
              {options.length === 0 ? (
                <div className="px-2.5 py-2 text-xs text-gray-500">
                  {notFoundText}
                </div>
              ) : (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {errorMessage && !hideErrorMessage && (
        <span className="text-error-400 text-xs font-medium">
          {t(errorMessage)}
        </span>
      )}
    </div>
  );
};

// Wrap with forwardRef for ref forwarding
const Select = forwardRef(SelectComponent);
Select.displayName = "Select";

export { Select, SelectItem };
