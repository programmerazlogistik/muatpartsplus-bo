"use client";

import React from "react";

import { cn } from "@muatmuat/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";


export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverArrowProps {
  className?: string;
}

export interface PopoverContentProps {
  className?: string;
  children: React.ReactNode;
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | Element[];
  collisionPadding?: number | Partial<Record<"top" | "right" | "bottom" | "left", number>>;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  updatePositionStrategy?: "optimized" | "always";
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: Event) => void;
  onFocusOutside?: (event: Event) => void;
  onInteractOutside?: (event: Event) => void;
}

/**
 * PopoverArrow component - renders an arrow pointing to the trigger
 * @param {PopoverArrowProps} props - Component props
 * @returns {JSX.Element} Rendered PopoverArrow component
 */
export const PopoverArrow: React.FC<PopoverArrowProps> = () => (
  <PopoverPrimitive.Arrow
    className="h-[11px] w-4 fill-white"
    style={{
      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
    }}
  />
);

/**
 * PopoverContent component - the main content container for the popover
 * @param {PopoverContentProps} props - Component props
 * @param {React.ForwardedRef<HTMLDivElement>} ref - The forwarded ref to the content element
 * @returns {React.ReactElement}
 */
const PopoverContentComponent = ({ className, children, ...props }: PopoverContentProps, ref: React.ForwardedRef<HTMLDivElement>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={5}
      className={cn(
        "z-[52] rounded-md border bg-white p-4 shadow-md outline-none",

        // --- FULLY CUSTOM ANIMATIONS ---
        // Removed `animate-in` and `animate-out`. We now only use our custom keyframes.

        // OPENING ANIMATIONS
        "data-[side=bottom]:animate-slide-up-and-fade",
        "data-[side=top]:animate-slide-down-and-fade",

        // CLOSING ANIMATIONS
        "data-[state=closed][data-side=bottom]:animate-slide-up-and-fade-out",
        "data-[state=closed][data-side=top]:animate-slide-down-and-fade-out",

        // Anti-glitch fixes are still useful with transform-based animations
        "data-[state=closed]:scrollbar-hide data-[state=closed]:overflow-hidden",

        className
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
);

export const PopoverContent = React.forwardRef(PopoverContentComponent);
PopoverContent.displayName = "PopoverContent";
