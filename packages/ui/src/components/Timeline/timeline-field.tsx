import { createContext, useContext } from "react";

import { cn } from "@muatmuat/lib/utils";

import { tMockFn } from "../../lib/mock-t";
import IconComponent from "../IconComponent/IconComponent";
import { TimelineContainer } from "./TimelineContainer";
import { TimelineItem } from "./TimelineItem";

interface TimelineFieldValue {
  name?: string;
  [key: string]: any;
}

interface TimelineFieldContextValue {
  variant: "muat" | "bongkar";
  values: TimelineFieldValue[];
  maxLocation: number;
  onAddLocation?: () => void;
  onEditLocation?: (index: number) => void;
  labelAddLocation: string;
  className?: string;
  errorMessage?: string;
  disabled: boolean;
}

// Context for TimelineField
const TimelineFieldContext = createContext<TimelineFieldContextValue | null>(
  null
);

function useTimelineField(): TimelineFieldContextValue {
  const context = useContext(TimelineFieldContext);
  if (!context) {
    throw new Error(
      "TimelineField compound components must be used within <TimelineField>"
    );
  }
  return context;
}

export interface TimelineFieldRootProps {
  variant: "muat" | "bongkar";
  values: TimelineFieldValue[];
  maxLocation?: number;
  onAddLocation?: () => void;
  onEditLocation?: (index: number) => void;
  labelAddLocation?: string;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
  children: React.ReactNode;
  t?: (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

const Root: React.FC<TimelineFieldRootProps> = ({
  variant,
  values,
  maxLocation = 5,
  onAddLocation,
  onEditLocation,
  labelAddLocation,
  className,
  errorMessage,
  disabled = false,
  children,
  t = tMockFn,
}) => {
  // Provide all props via context for subcomponents
  const contextValue: TimelineFieldContextValue = {
    variant,
    values,
    maxLocation,
    onAddLocation,
    onEditLocation,
    labelAddLocation:
      labelAddLocation || t("TimelineField.addLocation", {}, "Tambah Lokasi"),
    className,
    errorMessage,
    disabled,
  };

  return (
    <TimelineFieldContext.Provider value={contextValue}>
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            "rounded-[6px] border border-[#7B7B7B] px-3 py-2 md:rounded-md md:py-3",
            errorMessage && "border-error-400",
            className,
            disabled && "cursor-not-allowed bg-neutral-200"
          )}
        >
          <TimelineContainer>{children}</TimelineContainer>
        </div>
        {errorMessage && (
          <span className="text-xs font-medium text-error-400">
            {errorMessage}
          </span>
        )}
      </div>
    </TimelineFieldContext.Provider>
  );
};

export interface TimelineFieldItemProps {
  buttonRemove?: React.ReactNode;
  index: number;
  className?: string;
  t?: (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

const Item: React.FC<TimelineFieldItemProps> = ({
  buttonRemove,
  index,
  className,
  t = tMockFn,
}) => {
  const { variant, values, onEditLocation, disabled, maxLocation } =
    useTimelineField();

  const item = values[index];

  // Variant logic
  const getVariant = () => {
    const selected = { variant: "", activeIndex: -1 };
    if (values.length > 1) {
      if (variant === "bongkar") selected.variant = "field-bongkar";
      else selected.variant = "field-muat";
    } else {
      selected.variant = "bullet";
    }
    if (variant === "muat") selected.activeIndex = 0;
    else selected.activeIndex = -1;
    return selected;
  };

  return (
    <>
      <TimelineItem
        variant={getVariant().variant as any}
        index={index}
        activeIndex={getVariant().activeIndex}
        title={
          item?.name ||
          (variant === "muat"
            ? t("TimelineField.loadingLocation", {}, "Masukkan Lokasi Muat")
            : t(
                "TimelineField.unloadingLocation",
                {},
                "Masukkan Lokasi Bongkar"
              ))
        }
        isLast={index === values.length - 1}
        buttonRemove={buttonRemove}
        onClick={() => {
          if (!disabled && onEditLocation) onEditLocation(index);
        }}
        className="pb-0 md:pb-0"
        appearance={{
          titleClassname: cn(
            "line-clamp-1 text-xs",
            !item?.name && "text-neutral-600",
            className
          ),
        }}
        withDivider={index !== values.length - 1}
      />
    </>
  );
};

const AddButton: React.FC = () => {
  const {
    values,
    maxLocation,
    onAddLocation,
    labelAddLocation,
    variant,
    disabled,
  } = useTimelineField();
  if (values.length >= maxLocation) return null;
  return (
    <>
      {values.length === 1 && <hr className="my-3 block border-[#C4C4C4]" />}
      <div className="flex justify-center">
        <button
          className={cn(
            "flex items-center gap-2 text-sm font-semibold leading-[1.2] text-[#176CF7] md:text-xs",
            disabled && "cursor-not-allowed"
          )}
          onClick={onAddLocation}
          disabled={disabled}
        >
          <IconComponent
            width={20}
            height={20}
            src="/icons/plus-square24.svg"
            className="text-[#176CF7]"
            size="medium"
          />
          <span className="capsize">
            {labelAddLocation}
            <span className="capitalize md:hidden">&nbsp;{variant}</span>
          </span>
        </button>
      </div>
    </>
  );
};

export interface TimelineFieldRemoveButtonProps {
  onClick: () => void;
}

const RemoveButton: React.FC<TimelineFieldRemoveButtonProps> = ({
  onClick,
}) => {
  return (
    <button className="size-4" onClick={onClick}>
      <IconComponent
        src="/icons/min-square24.svg"
        className="size-4"
        size="medium"
      />
    </button>
  );
};

const TimelineField = {
  Root,
  Item,
  AddButton,
  RemoveButton,
};

export default TimelineField;
