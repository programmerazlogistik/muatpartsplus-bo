/**
 * @fileoverview Timeline component exports
 */
// Import components
import { DriverTimeline } from "./DriverTimeline";
import { TimelineChangeRow } from "./TimelineChangeRow";
import { TimelineContainer } from "./TimelineContainer";
import { TimelineItem } from "./TimelineItem";
import { TimelinePICData } from "./TimelinePICData";
import TimelineField from "./timeline-field";

export { DriverTimeline };
export { default as TimelineField } from "./timeline-field";
export { TimelineContainer };
export { TimelineItem };
export { TimelineChangeRow };
export { TimelinePICData };

// Type exports
export type { DriverTimelineProps } from "./DriverTimeline";
export type {
  TimelineFieldRootProps,
  TimelineFieldItemProps,
  TimelineFieldRemoveButtonProps,
} from "./timeline-field";
export type { TimelineContainerProps } from "./TimelineContainer";
export type { TimelineItemProps } from "./TimelineItem";
export type { TimelineChangeRowProps } from "./TimelineChangeRow";
export type { TimelinePICDataProps } from "./TimelinePICData";

// Default export for backward compatibility
const timelineExports = {
  DriverTimeline,
  TimelineField,
  TimelineContainer,
  TimelineItem,
  TimelineChangeRow,
};

export default timelineExports;
