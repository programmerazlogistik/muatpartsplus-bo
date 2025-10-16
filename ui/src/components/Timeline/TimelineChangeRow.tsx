import * as React from "react";

export interface TimelineChangeRowProps {
  children?: React.ReactNode;
  className?: string;
  before?: any;
  after?: any;
  type?: string;
  showPickupHeader?: boolean;
  showDropoffHeader?: boolean;
  isLast?: boolean;
  isLastInGroup?: boolean;
}

export const TimelineChangeRow: React.FC<TimelineChangeRowProps> = ({
  children,
  className,
  before,
  after,
  type,
  showPickupHeader,
  showDropoffHeader,
  isLast,
  isLastInGroup,
}) => {
  return <div className={className}>{children}</div>;
};

export default TimelineChangeRow;
