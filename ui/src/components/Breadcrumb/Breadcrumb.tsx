"use client";

import Link from "next/link";
import React from "react";

import { cn } from "@muatmuat/lib/utils";

import IconComponent from "../IconComponent/IconComponent";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  data?: BreadcrumbItem[];
  className?: string;
  disableActive?: boolean;
  disableClick?: boolean;
  maxWidth?: number;
}

/**
 * Navigation component that shows the current page location within a hierarchical structure.
 *
 * Features smart linking with Next.js, responsive design with text truncation, active state
 * highlighting, and accessibility-friendly semantic structure. Perfect for deep navigation
 * structures, content hierarchies, and multi-step processes.
 *
 * @param {BreadcrumbProps} props - The component props
 * @param {BreadcrumbItem[]} [props.data=[]] - Array of breadcrumb items to display
 * @param {string} [props.className] - Additional CSS classes for the breadcrumb container
 * @param {boolean} [props.disableActive=false] - Disable active state styling for current page
 * @param {boolean} [props.disableClick=false] - Disable click interactions for all items
 * @param {number} [props.maxWidth] - Maximum width in pixels for items (enables truncation)
 * @returns {React.ReactElement} Rendered Breadcrumb component
 *
 * @example
 * // Basic breadcrumb navigation
 * const breadcrumbData = [
 *   { name: "Home", href: "/" },
 *   { name: "Products", href: "/products" },
 *   { name: "Current Page" }
 * ];
 *
 * <Breadcrumb data={breadcrumbData} />
 *
 * @example
 * // With truncation for long text
 * <Breadcrumb
 *   data={longBreadcrumbs}
 *   maxWidth={120}
 *   className="bg-neutral-50 p-2 rounded"
 * />
 *
 * @example
 * // Disabled interactions
 * <Breadcrumb
 *   data={breadcrumbData}
 *   disableClick={true}
 *   disableActive={true}
 * />
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  data = [],
  className,
  disableActive = false,
  disableClick = false,
  maxWidth,
}) => {
  /**
   * Get CSS classes for individual breadcrumb items
   * @param {number} idx - Index of the current item
   * @returns {string} Combined CSS classes
   */
  const getItemClasses = (idx: number) =>
    cn(
      "text-xs font-medium capitalize text-neutral-600",
      "hover:text-primary-700",
      idx === data.length - 1
        ? "!max-w-none"
        : "overflow-hidden text-ellipsis whitespace-nowrap",
      !disableActive && idx === data.length - 1 && "text-primary-700",
      !disableClick && idx !== data.length - 1 && "cursor-pointer"
    );

  return (
    <div className={cn("flex items-center gap-[5px]", className)}>
      {data?.map((val, idx) => (
        <div className="flex items-center gap-[5px]" key={idx}>
          {val.href ? (
            <Link href={val.href} className={getItemClasses(idx)}>
              {val.name}
            </Link>
          ) : (
            <div
              style={{ maxWidth: maxWidth ? `${maxWidth}px` : "" }}
              className={getItemClasses(idx)}
            >
              {val.name}
            </div>
          )}
          {idx !== data.length - 1 && (
            <IconComponent
              src="/icons/chevron-right.svg"
              className="[&>path]:stroke-[2px]"
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Keep default export for backward compatibility
export default Breadcrumb;
