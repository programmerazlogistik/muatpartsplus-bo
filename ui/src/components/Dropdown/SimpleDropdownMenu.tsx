import { cn } from "@muatmuat/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import {
  SimpleDropdownItemProps,
  SimpleDropdownMenuContentProps,
} from "./SimpleDropdownMenu.types";

/**
 * SimpleDropdown root component for basic dropdown functionality.
 * Lightweight wrapper around Radix UI dropdown primitives.
 */
const SimpleDropdown = DropdownMenuPrimitive.Root;
/**
 * SimpleDropdown trigger component for basic dropdown functionality.
 * Wraps the element that triggers the simple dropdown menu.
 * @type {typeof DropdownMenuPrimitive.Trigger}
 */
export const SimpleDropdownTrigger = DropdownMenuPrimitive.Trigger;

/**
 * SimpleDropdown content component with MuatMuat styling.
 * Renders the dropdown menu container with proper positioning and shadows.
 */
export const SimpleDropdownContent = ({
  side = "bottom",
  align = "start",
  className,
  children,
}: SimpleDropdownMenuContentProps) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          "z-50 mt-1 flex max-w-[194px] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow-muat",
          className
        )}
        side={side}
        align={align}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

/**
 * SimpleDropdown item component with hover states and click handling.
 * Individual clickable items within the simple dropdown menu.
 * @param {SimpleDropdownItemProps} props - Component props
 * @returns {JSX.Element} The interactive dropdown menu item
 */
export const SimpleDropdownItem = ({
  className,
  onClick,
  children,
}: SimpleDropdownItemProps) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "capsize cursor-pointer px-2.5 py-3 text-xs font-medium leading-[1.2] outline-none hover:bg-neutral-100",
      className
    )}
    onClick={onClick}
  >
    {children}
  </DropdownMenuPrimitive.Item>
);
