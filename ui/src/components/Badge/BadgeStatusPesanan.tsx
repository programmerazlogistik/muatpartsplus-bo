import React from "react";

import { cn } from "@muatmuat/lib/utils";

import IconComponent from "../IconComponent/IconComponent";

type BadgeStatusPesananVariant =
  | "primary"
  | "warning"
  | "error"
  | "success"
  | "muted";

interface BadgeStatusPesananIcon {
  iconLeft?: string;
}

interface BadgeStatusPesananProps {
  variant?: BadgeStatusPesananVariant;
  className?: string;
  icon?: BadgeStatusPesananIcon;
  children: React.ReactNode;
}

const badgeVariants = {
  primary: "bg-primary-50 text-primary-700",
  warning: "bg-warning-100 text-[#FF7A00]",
  error: "bg-error-50 text-error-400",
  success: "bg-success-50 text-success-400",
  muted: "text-neutral-600 bg-neutral-200",
};

/**
 * BadgeStatusPesanan component displays a status badge with optional icon and custom styles.
 *
 * @param {BadgeStatusPesananProps} props - Component props.
 * @returns {JSX.Element} The rendered badge component.
 */
export const BadgeStatusPesanan: React.FC<BadgeStatusPesananProps> = ({
  variant = "primary",
  className,
  icon = { iconLeft: "" },
  children,
}) => {
  return (
    <div
      className={cn(
        "inline-flex h-6 w-[176px] items-center justify-center gap-1 rounded-[6px] px-2 text-sm font-semibold leading-[1.2] md:text-xs",
        badgeVariants[variant],
        className
      )}
    >
      {typeof icon.iconLeft === "string" && (
        <IconComponent src={icon.iconLeft} width={14} height={14} />
      )}
      <div>{children}</div>
    </div>
  );
};
