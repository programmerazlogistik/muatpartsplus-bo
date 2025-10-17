/**
 * @fileoverview NotificationDot component exports
 * @exports NotificationDot - A notification dot component for displaying small indicators
 * @exports NotificationCount - A notification count component for displaying numeric badges
 * @exports default - Default export of NotificationDot components
 */
import {
  NotificationCount,
  type NotificationCountProps,
} from "./NotificationCount";
import { NotificationDot, type NotificationDotProps } from "./NotificationDot";

export {
  NotificationDot,
  NotificationCount,
  type NotificationDotProps,
  type NotificationCountProps,
};

// Default export for backward compatibility
const notificationDotExports = {
  NotificationDot,
  NotificationCount,
};

export default notificationDotExports;
