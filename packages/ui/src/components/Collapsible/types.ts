import * as React from "react";
import { CollapsibleTriggerProps as RadixCollapsibleTriggerProps, CollapsibleProps as RadixCollapsibleProps } from "@radix-ui/react-collapsible";

export interface CollapsibleProps extends RadixCollapsibleProps {
  className?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface CollapsibleTriggerProps {
  className?: string;
  children: React.ReactNode | (({ open }: { open: boolean }) => React.ReactNode);
}

export interface CollapsibleContentProps {
  className?: string;
  children: React.ReactNode;
}

export interface CollapsibleContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}