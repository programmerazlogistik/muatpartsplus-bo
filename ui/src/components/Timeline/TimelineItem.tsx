import * as React from "react";

export interface TimelineItemProps {
  children?: React.ReactNode;
  className?: string;
  variant?: string;
  index?: number;
  activeIndex?: number;
  isLast?: boolean;
  title?: string;
  timestamp?: string;
  appearance?: {
    titleClassname?: string;
  };
  buttonDetail?: React.ReactNode;
  buttonRemove?: React.ReactNode;
  withDivider?: boolean;
  onClick?: () => void;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  children,
  className,
  title,
  appearance,
  // Other props are accepted but not used in this simple implementation
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {title && <div className={appearance?.titleClassname}>{title}</div>}
      {children}
    </div>
  );
};

export default TimelineItem;
