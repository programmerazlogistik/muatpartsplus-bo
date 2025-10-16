import { cn } from "@muatmuat/lib/utils";
import React from "react";

import { tMockFn } from "../../lib/mock-t";

export interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "big" | "small";
  required?: boolean;
  optional?: boolean;
  tooltip?: React.ReactNode;
  t?: (key: string, options?: Record<string, any>, defaultValue?: string) => string;
}

export type FormLabelVariant = "big" | "small";

export type TranslationFunction = (key: string, options?: Record<string, any>, defaultValue?: string) => string;

/**
 * FormContainer component for consistent form layouts
 * @param {FormContainerProps} props - Component props
 * @returns {JSX.Element} Rendered FormContainer component
 */
export const FormContainer: React.FC<FormContainerProps> = ({ children, className }) => (
  <div
    className={cn(
      "grid grid-cols-1 items-start gap-4 bg-white md:grid-cols-[174px_1fr] md:gap-8",
      className
    )}
  >
    {children}
  </div>
);

/**
 * FormLabel component for consistent form labeling with variants and states
 * @param {FormLabelProps} props - Component props
 * @returns {JSX.Element} Rendered FormLabel component
 */
export const FormLabel: React.FC<FormLabelProps> = ({
  t = tMockFn,
  variant = "big",
  required = false,
  optional = false,
  className,
  children,
  tooltip,
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-1 text-sm font-semibold leading-[1.1] text-neutral-900 md:h-4 md:w-[174px] md:text-xs md:font-medium md:leading-[1.2] md:text-neutral-600",
        variant === "big" && "md:h-8",
        className
      )}
    >
      {typeof children === "string" ? (
        <label>
          {children}
          {required && <span>*</span>}
          {optional && (
            <>
              &nbsp;
              <span className="text-xxs md:text-xs md:font-normal md:italic md:text-neutral-500">
                {t("FormLabel.optional", {}, "(Opsional)")}
              </span>
            </>
          )}
        </label>
      ) : (
        children
      )}

      {/* If you need to add like InfoTooltip, you can add via tooltip props */}
      <div className="flex-shrink-0">{tooltip}</div>
    </div>
  );
};
