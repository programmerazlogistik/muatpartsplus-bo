// src/app/page.js
"use client";

import React, { useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { NotificationDot } from "@muatmuat/ui/NotificationDot";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@muatmuat/ui/Popover";

// src/app/page.js

/**
 * @typedef {Object} NotificationItemData
 * @property {string | number} id - The unique identifier for the notification.
 * @property {string} i18nKey - The translation key for the notification message.
 * @property {Record<string, string>} [params] - Optional parameters for the translation string.
 */

/**
 * Renders a single notification item within the popover.
 * @param {{ item: NotificationItemData }} props
 */
const NotificationItem = ({ item }) => {
  // A simple fallback for demonstration if a key is missing
  const fallbackText = `Notification for key: ${item.i18nKey}`;
  const message = fallbackText;

  // This logic splits the translated message to style the second sentence blue.
  const parts = message.split(". ");
  const firstSentence = parts[0] ? `${parts[0]}.` : "";
  const secondSentence = parts.slice(1).join(". ");

  return (
    <div className="border-b border-neutral-700 px-4 py-3 last:border-b-0">
      <p className="text-sm leading-relaxed text-white">
        {firstSentence}
        {secondSentence && " "}
        {secondSentence && (
          <span className="text-blue-400">{secondSentence}</span>
        )}
      </p>
    </div>
  );
};

/**
 * @typedef {Object} NotificationPopoverProps
 * @property {React.ReactNode} trigger - The element that opens the popover.
 * @property {NotificationItemData[]} notifications - An array of notification objects.
 * @property {boolean} isOpen - Controlled state for popover visibility.
 * @property {(isOpen: boolean) => void} onOpenChange - Callback to change the open state.
 */

/**
 * A co-located popover component for displaying notifications.
 * @param {NotificationPopoverProps} props
 */
const NotificationPopover = ({
  trigger,
  notifications,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[380px] rounded-xl border-none bg-neutral-900 p-0 shadow-lg"
        )}
        sideOffset={12}
      >
        <PopoverArrow className="fill-neutral-900" />
        <div className="max-h-[320px] overflow-y-auto">
          {notifications.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

/**
 * Main page component demonstrating the use of the controlled NotificationPopover.
 */
const NotificationField = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Mock data for the usage example, passed via props.
  const mockNotifications = [
    {
      id: 1,
      i18nKey: "Notifications.hakiExpired",
      params: { companyName: "PT. Maju Mapan" },
    },
    {
      id: 2,
      i18nKey: "Notifications.documentSent",
      params: { companyName: "PT. Madju Djada" },
    },
    {
      id: 3,
      i18nKey: "Notifications.hakiExpired",
      params: { companyName: "PT. Maju Mapan" },
    },
    {
      id: 4,
      i18nKey: "Notifications.hakiExpired",
      params: { companyName: "PT. Maju Mapan" },
    },
  ];

  const triggerButton = (
    <Button
      variant="muattrans-outline-primary"
      className="relative h-10 w-10 rounded-full p-0"
    >
      <IconComponent
        src="/icons/bell.svg"
        className="size-5"
        alt="Notifications"
      />
      {mockNotifications.length > 0 && (
        <NotificationDot
          color="red"
          size="sm"
          position="absolute"
          positionClasses="top-1 right-1"
        />
      )}
    </Button>
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <NotificationPopover
        isOpen={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        notifications={mockNotifications}
        trigger={triggerButton}
      />
    </div>
  );
};

export default NotificationField;
