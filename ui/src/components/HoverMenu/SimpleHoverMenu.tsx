/**
 * @typedef {import('./simple-hover-menu.d.ts').SimpleHoverProps} SimpleHoverProps
 * @typedef {import('./simple-hover-menu.d.ts').SimpleHoverContentProps} SimpleHoverContentProps
 * @typedef {import('./simple-hover-menu.d.ts').SimpleHoverItemProps} SimpleHoverItemProps
 * @typedef {import('./simple-hover-menu.d.ts').SimpleHoverTriggerProps} SimpleHoverTriggerProps
 */
import { cn } from "@muatmuat/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

/**
 * Main hover menu container component built on Radix UI primitives.
 *
 * @param {SimpleHoverProps} props - Component props
 * @returns {React.ReactElement}
 */
export const SimpleHover = ({ children, ...props }) => (
  <HoverCardPrimitive.Root openDelay={200} closeDelay={100} {...props}>
    {children}
  </HoverCardPrimitive.Root>
);

/**
 * Trigger element for the hover menu.
 *
 * @param {SimpleHoverTriggerProps} props - Component props
 * @returns {React.ReactElement}
 */
export const SimpleHoverTrigger = HoverCardPrimitive.Trigger;

/**
 * Content container for the hover menu with customizable positioning.
 *
 * @param {SimpleHoverContentProps} props - Component props
 * @returns {React.ReactElement}
 */
export const SimpleHoverContent = ({
  side = "bottom" as const,
  align = "start" as const,
  className,
  children,
}) => {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className={cn(
          "shadow-muat z-50 mt-1 flex w-[194px] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50",
          className
        )}
        side={side}
        align={align}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};

/**
 * Individual menu item component with hover effects and click handling.
 *
 * @param {SimpleHoverItemProps} props - Component props
 * @returns {React.ReactElement}
 */
export const SimpleHoverItem = ({ className, onClick, children }) => (
  <div
    className={cn(
      "cursor-pointer px-2.5 py-3 text-xs font-medium leading-[1.2] outline-none hover:bg-neutral-100",
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
);
