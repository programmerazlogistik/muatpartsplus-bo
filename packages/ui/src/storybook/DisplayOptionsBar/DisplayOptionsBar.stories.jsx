import { useState } from "react";

import { DisplayOptionsBar } from "@muatmuat/ui/DisplayOptionsBar";

export default {
  title: "Components/DisplayOptionsBar",
  component: DisplayOptionsBar,
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal bar for selecting display options with status filters, showing counts and optional notification indicators.",
      },
    },
  },
  argTypes: {
    totalCount: {
      description: "Total count for all items (shown in 'Semua' option)",
      control: { type: "number" },
    },
    statusOptions: {
      description: "Array of status options to display",
      control: { type: "object" },
    },
    currentStatus: {
      description: "Currently selected status value",
      control: { type: "text" },
    },
    onStatusChange: {
      description: "Callback function when status is changed",
      action: "status changed",
    },
    className: {
      description: "Additional CSS classes for the container",
      control: { type: "text" },
    },
    showAllOption: {
      description: "Whether to show the 'Semua' option",
      control: { type: "boolean" },
    },
  },
};

const mockStatusOptions = [
  { value: "pending", label: "Menunggu", count: 5 },
  { value: "active", label: "Aktif", count: 12 },
  { value: "completed", label: "Selesai", count: 8 },
  { value: "cancelled", label: "Dibatalkan", count: 2 },
];

const mockStatusOptionsWithNotifications = [
  { value: "pending", label: "Menunggu", count: 5, hasNotification: true },
  { value: "active", label: "Aktif", count: 12 },
  { value: "completed", label: "Selesai", count: 8 },
  { value: "cancelled", label: "Dibatalkan", count: 2, hasNotification: true },
];

const mockStatusOptionsWithoutCounts = [
  { value: "pending", label: "Menunggu" },
  { value: "active", label: "Aktif" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export const Default = {
  args: {
    totalCount: 27,
    statusOptions: mockStatusOptions,
    currentStatus: null,
    showAllOption: true,
  },
  render: (args) => {
    const [currentStatus, setCurrentStatus] = useState(args.currentStatus);

    const handleStatusChange = (status) => {
      setCurrentStatus(status);
      args.onStatusChange(status);
    };

    return (
      <DisplayOptionsBar
        {...args}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    );
  },
};

export const WithActiveStatus = {
  args: {
    totalCount: 27,
    statusOptions: mockStatusOptions,
    currentStatus: "active",
    showAllOption: true,
  },
  render: (args) => {
    const [currentStatus, setCurrentStatus] = useState(args.currentStatus);

    const handleStatusChange = (status) => {
      setCurrentStatus(status);
      args.onStatusChange(status);
    };

    return (
      <DisplayOptionsBar
        {...args}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    );
  },
};

export const WithoutAllOption = {
  args: {
    statusOptions: mockStatusOptions,
    currentStatus: "active",
    showAllOption: false,
  },
  render: (args) => {
    const [currentStatus, setCurrentStatus] = useState(args.currentStatus);

    const handleStatusChange = (status) => {
      setCurrentStatus(status);
      args.onStatusChange(status);
    };

    return (
      <DisplayOptionsBar
        {...args}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    );
  },
};

export const WithNotifications = {
  args: {
    totalCount: 27,
    statusOptions: mockStatusOptionsWithNotifications,
    currentStatus: null,
    showAllOption: true,
  },
  render: (args) => {
    const [currentStatus, setCurrentStatus] = useState(args.currentStatus);

    const handleStatusChange = (status) => {
      setCurrentStatus(status);
      args.onStatusChange(status);
    };

    return (
      <DisplayOptionsBar
        {...args}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    );
  },
};

export const WithoutCounts = {
  args: {
    statusOptions: mockStatusOptionsWithoutCounts,
    currentStatus: null,
    showAllOption: true,
  },
  render: (args) => {
    const [currentStatus, setCurrentStatus] = useState(args.currentStatus);

    const handleStatusChange = (status) => {
      setCurrentStatus(status);
      args.onStatusChange(status);
    };

    return (
      <DisplayOptionsBar
        {...args}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    );
  },
};

export const EmptyOptions = {
  args: {
    totalCount: 0,
    statusOptions: [],
    currentStatus: null,
    showAllOption: true,
  },
  render: (args) => {
    const [currentStatus, setCurrentStatus] = useState(args.currentStatus);

    const handleStatusChange = (status) => {
      setCurrentStatus(status);
      args.onStatusChange(status);
    };

    return (
      <DisplayOptionsBar
        {...args}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    );
  },
};

export const NoOptionsNoAll = {
  args: {
    statusOptions: [],
    currentStatus: null,
    showAllOption: false,
  },
  render: (args) => {
    const [currentStatus, setCurrentStatus] = useState(args.currentStatus);

    const handleStatusChange = (status) => {
      setCurrentStatus(status);
      args.onStatusChange(status);
    };

    return (
      <DisplayOptionsBar
        {...args}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    );
  },
};

export const Playground = {
  args: {
    totalCount: 27,
    statusOptions: mockStatusOptions,
    currentStatus: null,
    showAllOption: true,
    className: "",
  },
  render: (args) => {
    const [currentStatus, setCurrentStatus] = useState(args.currentStatus);

    const handleStatusChange = (status) => {
      setCurrentStatus(status);
      args.onStatusChange(status);
    };

    return (
      <DisplayOptionsBar
        {...args}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    );
  },
};
