import React from "react";
import { cn } from "@muatmuat/lib/utils";

import IconComponent from "../IconComponent/IconComponent";
import {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  ListContentProps,
} from "./types";

/**
 * A versatile card component that serves as a container for related content and actions.
 * Cards organize information in a clean, scannable format with clear visual hierarchy.
 * Can be used standalone or combined with CardHeader, CardContent, and CardFooter components.
 *
 * @param {CardProps} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the card
 * @param {string|number} [props.keys] - React key prop for list rendering optimization
 * @param {React.ReactNode} [props.children] - Content to be rendered inside the card
 * @returns {React.ReactElement} The rendered card component
 *
 * @example
 * // Basic card with content
 * <Card>
 *   <p>Simple card content</p>
 * </Card>
 *
 * @example
 * // Card with custom styling
 * <Card className="max-w-md shadow-lg">
 *   <CardHeader>
 *     <h2>Card Title</h2>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card body content</p>
 *   </CardContent>
 *   <CardFooter>
 *     <button>Action</button>
 *   </CardFooter>
 * </Card>
 */
const Card = ({ className, keys, children }: CardProps) => {
  return (
    <div
      key={keys}
      className={cn(
        "shadow-muat h-full w-full rounded-md border border-neutral-600 bg-white text-neutral-900",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card };
export default Card;

/**
 * A header section component for cards that provides consistent styling and spacing.
 * Typically used to display titles, subtitles, and status information at the top of a card.
 *
 * @param {CardHeaderProps} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the header
 * @param {React.ReactNode} [props.children] - Content to be rendered inside the header
 * @returns {React.ReactElement} The rendered card header component
 *
 * @example
 * <CardHeader>
 *   <h2 className="text-lg font-semibold">Order #12345</h2>
 *   <p className="text-sm text-neutral-600">Status: In Progress</p>
 * </CardHeader>
 */
export const CardHeader = ({ className, children }: CardHeaderProps) => {
  return (
    <header
      className={cn(`border-b border-neutral-600 px-8 py-5 ${className}`)}
    >
      {children}
    </header>
  );
};

/**
 * A content section component for cards with standardized padding that aligns with the design system.
 * Use this for the main body content of cards to ensure consistent spacing and layout.
 *
 * @param {CardContentProps} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the content area
 * @param {React.ReactNode} [props.children] - Content to be rendered inside the content area
 * @returns {React.ReactElement} The rendered card content component
 *
 * @example
 * <CardContent>
 *   <p className="text-sm mb-4">Your shipment is being processed.</p>
 *   <div className="flex justify-between text-xs">
 *     <span>Origin: Jakarta</span>
 *     <span>Destination: Surabaya</span>
 *   </div>
 * </CardContent>
 */
export const CardContent = ({ className, children }: CardContentProps) => {
  return <div className={cn("px-8 py-5", className)}>{children}</div>;
};

/**
 * A footer section component for cards typically used for actions, metadata, or additional information.
 * Provides consistent styling with a top border to separate it from the main content.
 *
 * @param {CardFooterProps} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the footer
 * @param {React.ReactNode} [props.children] - Content to be rendered inside the footer
 * @returns {React.ReactElement} The rendered card footer component
 *
 * @example
 * <CardFooter>
 *   <button className="bg-primary-500 text-white px-4 py-2 rounded">
 *     Track Order
 *   </button>
 *   <button className="border px-4 py-2 rounded ml-2">
 *     Contact Support
 *   </button>
 * </CardFooter>
 */
export const CardFooter = ({ className, children }: CardFooterProps) => {
  return (
    <footer className={`border-t border-neutral-600 px-8 py-5 ${className}`}>
      {children}
    </footer>
  );
};

/**
 * A specialized content component for displaying icon-title-value combinations commonly used in logistics cards.
 * Renders content that frequently appears in MuatMuat list cards with an icon, title, and value below it.
 *
 * @param {ListContentProps} props - The component props
 * @param {any} props.icon - Icon source URL string or icon component (required)
 * @param {string} props.title - Title text to display next to the icon (required)
 * @param {string} props.value - Value text to display below the title (required)
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 * @returns {React.ReactElement} The rendered list content component
 *
 * @example
 * <ListContent
 *   icon="/icons/map-pin24.svg"
 *   title="Destination"
 *   value="Surabaya"
 * />
 *
 * @example
 * // Multiple list contents in a grid
 * <div className="grid grid-cols-2 gap-4">
 *   <ListContent icon="/icons/box16.svg" title="Weight" value="2.5 tons" />
 *   <ListContent icon="/icons/24-hours.svg" title="Duration" value="8 hours" />
 * </div>
 */
export const ListContent = ({ icon, title, value, className }: ListContentProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="sm flex gap-2">
        {typeof icon === 'string' ? (
          <IconComponent src={icon} />
        ) : (
          React.createElement(icon)
        )}
        <span className="text-xs font-medium text-neutral-600">{title}</span>
      </div>
      <span className="text-1b1b text-xs font-medium">{value}</span>
    </div>
  );
};