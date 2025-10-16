import * as React from "react";

export interface SimpleDropdownMenuContentProps {
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  className?: string;
  children?: React.ReactNode;
}

export interface SimpleDropdownItemProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}