import * as React from "react";

export interface TimelineContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineContainer: React.FC<TimelineContainerProps> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

export default TimelineContainer;
