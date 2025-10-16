import { useClientHeight } from "@muatmuat/hooks/use-client-height";
import { cn } from "@muatmuat/lib/utils";

import { tMockFn } from "../../lib/mock-t";
import IconComponent from "../IconComponent/IconComponent";

/**
 * Timeline item displaying PIC (Person in Charge) contact information.
 */

export interface TimelinePICDataProps {
  /** Timeline title for the PIC section */
  title?: string;
  /** PIC data object containing contact and location information */
  data?: {
    /** Address information */
    address: string;
    /** Additional location details */
    details: string;
    /** Name of the Person in Charge */
    picName: string;
    /** Phone number of the Person in Charge */
    picPhone: string;
  };
  /** Timeline variant styling */
  variant?: string;
  /** Current item index */
  index?: number;
  /** Active item index for state tracking */
  activeIndex?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether this is the last item in the timeline */
  isLast?: boolean;
  /** Translation function */
  t?: (key: string, params?: any, defaultValue?: string) => string;
}

const lineStyles = {
  inactive: "border-neutral-400",
  active: "border-muat-trans-primary-400",
};

const bulletStyles: Record<string, { outer: string; inner: string }> = {
  "bullet-inactive": {
    outer: "bg-muat-trans-secondary-900",
    inner: "bg-neutral-50",
  },
  "bullet-active": {
    outer: "bg-muat-trans-primary-400",
    inner: "bg-muat-trans-secondary-900",
  },
  "number-muat": {
    outer: "bg-muat-trans-primary-400 text-muat-trans-secondary-900",
    inner: "",
  },
  "number-bongkar": {
    outer: "bg-muat-trans-secondary-900 text-white",
    inner: "",
  },
  "field-muat": {
    outer: "bg-muat-trans-primary-400 text-muat-trans-secondary-900",
    inner: "",
  },
  "field-bongkar": {
    outer: "bg-muat-trans-secondary-900 text-white",
    inner: "",
  },
  "bullet-driver-status-inactive": {
    outer: "bg-neutral-200 ",
    inner: "bg-neutral-600",
  },
  "bullet-driver-status-active": {
    outer: "bg-muat-trans-primary-400",
    inner: "bg-muat-trans-secondary-900",
  },
  // Custom bullet colors for SOS timeline
  "bullet-yellow": {
    outer: "bg-muat-trans-primary-400",
    inner: "bg-muat-trans-secondary-900",
  },
  "bullet-brown": {
    outer: "bg-muat-trans-secondary-900",
    inner: "bg-neutral-50",
  },
};

const getVariant = ({
  variant,
  index,
  activeIndex,
}: {
  variant?: string;
  index?: number;
  activeIndex?: number;
}) => {
  const selected: {
    line?: string;
    bullet?: string;
  } = {};

  if (variant === "bullet")
    selected.line =
      (index ?? 0) <= (activeIndex ?? 0) - 1 ? "active" : "inactive";
  else selected.line = "inactive";

  // setting bullet variant
  if (variant === "bullet")
    selected.bullet =
      (index ?? 0) <= (activeIndex ?? 0) ? "bullet-active" : "bullet-inactive";
  else if (variant === "bullet-driver-status")
    selected.bullet =
      (index ?? 0) <= (activeIndex ?? 0)
        ? "bullet-driver-status-active"
        : "bullet-driver-status-inactive";
  // Custom bullet variants for specific colors
  else if (variant === "bullet-yellow") selected.bullet = "bullet-yellow";
  else if (variant === "bullet-brown") selected.bullet = "bullet-brown";
  else selected.bullet = variant;

  return selected;
};

/**
 * Timeline item displaying PIC (Person in Charge) contact information.
 * @param {TimelinePICDataProps} props - Component props
 * @returns {React.ReactElement}
 */
export const TimelinePICData = ({
  title,
  data = {
    address: "",
    details: "",
    picName: "",
    picPhone: "",
  },
  variant,
  index,
  activeIndex,
  className,
  isLast,
  t = tMockFn,
}: TimelinePICDataProps) => {
  const variantStyles = getVariant({ variant, index, activeIndex });

  const { ref: containerRef, height: containerHeight } = useClientHeight();
  const { ref: contentRef, height: contentHeight } = useClientHeight();

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="grid grid-cols-[16px_1fr] gap-x-3"
    >
      <div className="relative flex justify-center">
        {!isLast && (
          <div
            className={cn(
              "absolute left-1/2 top-0 h-[20px] w-px flex-1 -translate-x-1/2 border-l-2 border-dashed",
              lineStyles.inactive
            )}
            style={{
              height: `${containerHeight - 16}px`,
              top: "16px",
            }}
          />
        )}

        <div
          className={cn(
            "relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full font-bold",
            variantStyles.bullet
              ? bulletStyles[variantStyles.bullet]?.outer
              : ""
          )}
        >
          {!variant?.startsWith("bullet") ? (
            <div className="ml-[0.5px] mt-[1px] text-xxs">
              {(index ?? 0) + 1}
            </div>
          ) : (
            <div
              className={cn(
                "absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
                variantStyles.bullet
                  ? bulletStyles[variantStyles.bullet]?.inner
                  : ""
              )}
            />
          )}
        </div>
      </div>

      <div
        ref={contentRef as React.RefObject<HTMLDivElement>}
        className={cn("flex w-full flex-col pb-3", title && "-mt-5", className)}
      >
        {title && (
          <div className="h-5 text-xs font-medium text-neutral-600">
            {title}
          </div>
        )}
        {/* Detail items */}
        <div className="mt-0.5 grid grid-cols-[166px_1fr] gap-2">
          <div className="col-span-2 text-xs font-medium text-neutral-900">
            {data.address}
          </div>

          <div className="flex items-center gap-2">
            <IconComponent
              src="/icons/topik-amandemen16.svg"
              className="text-muat-trans-secondary-900"
            />
            <span className="text-xs font-medium text-neutral-600">
              {t("TimelinePICData.labelDetailLokasi", {}, "Detail Lokasi:")}
            </span>
          </div>
          <span className="text-xs font-medium text-neutral-900">
            {data.details}
          </span>

          <div className="flex items-center gap-2">
            <IconComponent
              src="/icons/profile16.svg"
              className="text-muat-trans-secondary-900"
            />
            <span className="text-xs font-medium text-neutral-600">
              {t(
                "TimelinePICData.labelNamaPICLokasiMuat",
                {},
                "Nama PIC Lokasi Muat:"
              )}
            </span>
          </div>
          <span className="text-xs font-medium text-neutral-900">
            {data.picName}
          </span>

          <div className="flex items-center gap-2">
            <IconComponent
              src="/icons/call16.svg"
              width={16}
              height={16}
              className="text-muat-trans-secondary-900"
            />
            <span className="text-xs font-medium text-neutral-600">
              {t(
                "TimelinePICData.labelNoHPPICLokasiMuat",
                {},
                "No. HP PIC Lokasi Muat:"
              )}
            </span>
          </div>
          <span className="text-xs font-medium text-neutral-900">
            {data.picPhone}
          </span>
        </div>
      </div>
    </div>
  );
};
