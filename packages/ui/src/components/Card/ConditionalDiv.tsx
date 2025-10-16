"use client";

import { Children, useEffect, useState } from "react";

import { ConditionalDivProps } from "./types";

/**
 * A utility component that conditionally renders a div wrapper only when it has valid children.
 * Automatically hides itself if all children are null, undefined, or empty arrays.
 * Perfect for layout components that should only appear when they contain actual content.
 *
 * @param {ConditionalDivProps} props - The component props
 * @param {string} [props.className] - CSS classes to apply to the div when rendered
 * @param {React.ReactNode} [props.children] - Child elements - div only renders if children exist
 * @param {...any} props - Additional HTML div attributes
 * @returns {React.ReactElement|null} The rendered div element or null if no valid children
 *
 * @example
 * // Will render the div because there are valid children
 * <ConditionalDiv className="border p-4">
 *   <p>This content is visible</p>
 * </ConditionalDiv>
 *
 * @example
 * // Will not render anything because children is null
 * <ConditionalDiv className="border p-4">
 *   {null}
 * </ConditionalDiv>
 *
 * @example
 * // Use case: conditional form sections
 * <ConditionalDiv className="form-section">
 *   {showAdvancedOptions && (
 *     <div>
 *       <input placeholder="Advanced setting 1" />
 *       <input placeholder="Advanced setting 2" />
 *     </div>
 *   )}
 * </ConditionalDiv>
 */
export const ConditionalDiv = ({
  className,
  children,
  ...props
}: ConditionalDivProps) => {
  const [hasChildren, setHasChildren] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const childElements = Children.toArray(children);
      // Check if any child elements are actually rendered (not null/undefined)
      const hasRenderedChildren = childElements.some(
        (child) => child !== null && child !== undefined
      );
      setHasChildren(hasRenderedChildren);
    }
  }, [children, mounted]);

  if (!hasChildren) return null;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};