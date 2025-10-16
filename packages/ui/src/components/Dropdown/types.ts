import * as React from "react";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export interface FilterTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "asChild"> {
  isActive?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface ContentProps
  extends Omit<
    React.ComponentProps<typeof PopoverPrimitive.Content>,
    "asChild" | "children"
  > {
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  children?: React.ReactNode;
  appearance?: {
    contentClassName?: string;
  };
}

export interface HoverRootProps
  extends Omit<
    React.ComponentProps<typeof HoverCardPrimitive.Root>,
    "children"
  > {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  className?: string;
}

export interface HoverContentProps
  extends Omit<
    React.ComponentProps<typeof HoverCardPrimitive.Content>,
    "asChild" | "children"
  > {
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  children?: React.ReactNode;
  appearance?: {
    wrapperClassName?: string;
  };
}

export interface HoverItemProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  asChild?: boolean;
}

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isDestructive?: boolean;
  className?: string;
}
