"use client";

import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

import IconComponent from "@/components/IconComponent/IconComponent";

const StepBreadcrumb = ({
  data = [],
  className,
  activeStep,
  onStepClick,
}) => {
  const getItemClasses = (idx) =>
    cn(
      "text-xs font-medium capitalize text-neutral-600",
      "hover:text-primary-700",
      idx === data.length - 1
        ? "!max-w-none"
        : "overflow-hidden text-ellipsis whitespace-nowrap",
      activeStep === idx + 1 && "text-primary-700",
      onStepClick && "cursor-pointer"
    );

  return (
    <div className={cn("flex items-center gap-[5px]", className)}>
      {data?.map((val, idx) => (
        <div className="flex items-center gap-[5px]" key={idx}>
          <div
            className={getItemClasses(idx)}
            onClick={onStepClick ? () => onStepClick(idx + 1) : undefined}
          >
            {val}
          </div>
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

export default StepBreadcrumb;

StepBreadcrumb.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  activeStep: PropTypes.number,
  onStepClick: PropTypes.func,
};