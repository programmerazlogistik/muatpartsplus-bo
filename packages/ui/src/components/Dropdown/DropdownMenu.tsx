import { cn } from "@muatmuat/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContentProps, DropdownMenuItemProps } from "./DropdownMenu.types";

/**
 * DropdownMenu root component built on Radix UI primitives.
 * Provides accessible dropdown menu functionality with keyboard navigation.
 * @type {typeof DropdownMenuPrimitive.Root}
 */
export const DropdownMenu = DropdownMenuPrimitive.Root;
/**
 * DropdownMenu trigger component built on Radix UI primitives.
 * Wraps the element that triggers the dropdown menu.
 * @type {typeof DropdownMenuPrimitive.Trigger}
 */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * DropdownMenu content component with MuatMuat styling.
 * Renders the dropdown menu container with proper positioning and shadows.
 */
export const DropdownMenuContent = ({
  side = "bottom",
  align = "start",
  className,
  children,
}: DropdownMenuContentProps) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          "shadow-muat z-50 mt-1 flex max-w-[194px] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50",
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
 * DropdownMenu item component with hover states and click handling.
 * Individual clickable items within the dropdown menu.
 * @param {DropdownMenuItemProps} props - Component props
 * @returns {JSX.Element} The interactive dropdown menu item
 */
export const DropdownMenuItem = ({ className, onClick, children }) => (
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
