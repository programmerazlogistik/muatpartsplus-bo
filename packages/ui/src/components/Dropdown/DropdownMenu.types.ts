import * as React from "react";

export interface DropdownMenuContentProps {
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  className?: string;
  children?: React.ReactNode;
}

export interface DropdownMenuItemProps {
  className?: string;
  children?: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  [key: string]: any;
}