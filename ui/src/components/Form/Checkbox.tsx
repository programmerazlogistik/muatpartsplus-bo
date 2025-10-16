"use client";

import * as React from "react";
import { forwardRef, memo, useId } from "react";

import { cn } from "@muatmuat/lib";
// Assuming this utility exists
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export type CheckboxLabelPosition = "left" | "right";

export interface CheckboxAppearance {
  /**
   * Custom class name for the container div that wraps the checkbox and label.
   */
  containerClassName?: string;
  /**
   * Custom class name for the label element.
   */
  labelClassName?: string;
}

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "id" // Omit to handle it internally
  > {
  /**
   * The content to be displayed as the checkbox's label.
   */
  label?: string;
  /**
   * Optional class name to be applied to the checkbox root element.
   */
  className?: string;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: CheckboxAppearance;
  /**
   * The position of the label relative to the checkbox.
   * @default "right"
   */
  labelPosition?: CheckboxLabelPosition;
  /**
   * The visual variant of the checkbox.
   * @default "default"
   */
  variant?: CheckboxVariant;
  /**
   * A unique identifier for the checkbox. If not provided, a unique ID will be
   * generated automatically to ensure accessibility.
   */
  id?: string;
}

export type CheckboxVariant = "blue" | "yellow";

const checkboxStyles = {
  blue: "border-neutral-600 hover:border-primary-700 disabled:border-neutral-500 data-[state=checked]:border-primary-700 data-[state=checked]:bg-primary-700 data-[state=checked]:text-neutral-50",
  yellow:
    "data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-600 data-[state=checked]:text-yellow-900",
};

/**
 * A memoized Checkbox component that is properly typed and supports server-side rendering.
 * It is built on top of Radix UI's Checkbox primitive for accessibility and functionality.
 */
const Checkbox = memo(
  forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    (props, ref) => {
      const {
        className,
        label,
        appearance = {}, // Default to an empty object for cleaner usage.
        labelPosition = "right",
        variant = "blue",
        id: providedId, // Rename to avoid conflict with the generated ID.
        ...checkboxProps
      } = props;

      // ✨ Use React.useId() for stable, SSR-friendly unique ID generation.
      const generatedId = useId();
      const checkboxId = providedId || generatedId;

      const checkboxElement = (
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          data-slot="checkbox"
          className={cn(
            // Base styles
            "border-input dark:bg-input/30 data-[state=checked]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer size-4 shrink-0 rounded-[4px] border outline-none transition-shadow hover:cursor-pointer focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            checkboxStyles[variant],
            className
          )}
          {...checkboxProps}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current transition-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-full"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      );

      // If there's no label, return only the checkbox element.
      if (!label) {
        return checkboxElement;
      }

      // If a label exists, wrap the checkbox and label in a container.
      return (
        <div
          className={cn(
            "flex items-center gap-2",
            labelPosition === "left" && "flex-row-reverse",
            // Safely apply custom container class. `cn` handles undefined values.
            appearance.containerClassName
          )}
        >
          {checkboxElement}
          <label
            htmlFor={checkboxId}
            className={cn(
              "cursor-pointer select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              // Safely apply custom label class.
              appearance.labelClassName
            )}
          >
            {label}
          </label>
        </div>
      );
    }
  )
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
