import { useState } from "react";

import { MultilevelSelect } from "@muatmuat/ui/FilterDropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/MultilevelSelect",
  component: MultilevelSelect,
  parameters: {
    docs: {
      description: {
        component:
          "A two-level cascading dropdown component that displays hierarchical options with radio button selection.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    options: {
      description: "Array of first-level options with optional children",
      control: { type: "object" },
    },
    value: {
      description: "Currently selected value",
      control: { type: "text" },
    },
    onChange: {
      description:
        "Callback fired when selection changes. Returns { name, value }",
      action: "onChange",
    },
    disabled: {
      description: "Disable the component",
      control: { type: "boolean" },
      defaultValue: false,
    },
    t: {
      description: "Translation function for internationalization",
      control: { type: "object" },
    },
  },
};

export default meta;

// Sample data for stories
const sampleOptions = [
  {
    key: "status",
    label: "Status",
    children: [
      { key: "active", label: "Active", value: "active" },
      { key: "inactive", label: "Inactive", value: "inactive" },
      { key: "pending", label: "Pending", value: "pending" },
    ],
  },
  {
    key: "priority",
    label: "Priority",
    children: [
      { key: "high", label: "High", value: "high" },
      { key: "medium", label: "Medium", value: "medium" },
      { key: "low", label: "Low", value: "low" },
      { key: "urgent", label: "Urgent", value: "urgent" },
      { key: "normal", label: "Normal", value: "normal" },
      { key: "low-priority", label: "Low Priority", value: "low-priority" },
    ],
  },
  {
    key: "category",
    label: "Category",
    children: [
      { key: "work", label: "Work", value: "work" },
      { key: "personal", label: "Personal", value: "personal" },
    ],
  },
];

// Interactive Storybook story with comprehensive controls
export const Playground = {
  args: {
    options: sampleOptions,
    value: "",
    disabled: false,
  },
  decorators: [
    (Story, context) => {
      const [selectedValue, setSelectedValue] = useState(context.args.value);

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              value: selectedValue,
              onChange: (selection) => {
                setSelectedValue(selection.value);
                context.args.onChange?.(selection);
              },
            }}
          />
          <div className="mt-4 rounded-md bg-neutral-100 p-4">
            <p className="mb-2 text-sm font-medium">Selected Value:</p>
            <pre className="rounded bg-white p-2 text-xs">
              {selectedValue || "No selection"}
            </pre>
          </div>
        </div>
      );
    },
  ],
};

// Basic example with default state
export const Default = {
  args: {
    options: sampleOptions,
    value: "",
  },
  decorators: [
    (Story, context) => {
      const [selectedValue, setSelectedValue] = useState("");

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              value: selectedValue,
              onChange: (selection) => setSelectedValue(selection.value),
            }}
          />
        </div>
      );
    },
  ],
};

// With pre-selected value
export const WithSelection = {
  args: {
    options: sampleOptions,
    value: "high",
  },
  decorators: [
    (Story, context) => {
      const [selectedValue, setSelectedValue] = useState(context.args.value);

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              value: selectedValue,
              onChange: (selection) => setSelectedValue(selection.value),
            }}
          />
        </div>
      );
    },
  ],
};

// Disabled state
export const Disabled = {
  args: {
    options: sampleOptions,
    value: "active",
    disabled: true,
  },
};

// Options without children (clickable first-level items)
export const ClickableFirstLevel = {
  args: {
    options: [
      {
        key: "quick-actions",
        label: "Quick Actions",
        children: [],
      },
      {
        key: "status",
        label: "Status",
        children: [
          { key: "active", label: "Active", value: "active" },
          { key: "inactive", label: "Inactive", value: "inactive" },
        ],
      },
    ],
    value: "",
  },
  decorators: [
    (Story, context) => {
      const [selectedValue, setSelectedValue] = useState("");

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              value: selectedValue,
              onChange: (selection) => setSelectedValue(selection.value),
            }}
          />
        </div>
      );
    },
  ],
};

// Large dataset with many options
export const LargeDataset = {
  args: {
    options: [
      {
        key: "departments",
        label: "Departments",
        children: [
          { key: "engineering", label: "Engineering", value: "engineering" },
          { key: "design", label: "Design", value: "design" },
          { key: "marketing", label: "Marketing", value: "marketing" },
          { key: "sales", label: "Sales", value: "sales" },
          { key: "hr", label: "Human Resources", value: "hr" },
          { key: "finance", label: "Finance", value: "finance" },
          { key: "operations", label: "Operations", value: "operations" },
        ],
      },
      {
        key: "locations",
        label: "Locations",
        children: [
          { key: "jakarta", label: "Jakarta", value: "jakarta" },
          { key: "surabaya", label: "Surabaya", value: "surabaya" },
          { key: "bandung", label: "Bandung", value: "bandung" },
          { key: "medan", label: "Medan", value: "medan" },
          { key: "semarang", label: "Semarang", value: "semarang" },
        ],
      },
      {
        key: "projects",
        label: "Projects",
        children: [
          {
            key: "project-alpha",
            label: "Project Alpha",
            value: "project-alpha",
          },
          { key: "project-beta", label: "Project Beta", value: "project-beta" },
          {
            key: "project-gamma",
            label: "Project Gamma",
            value: "project-gamma",
          },
          {
            key: "project-delta",
            label: "Project Delta",
            value: "project-delta",
          },
          {
            key: "project-epsilon",
            label: "Project Epsilon",
            value: "project-epsilon",
          },
          { key: "project-zeta", label: "Project Zeta", value: "project-zeta" },
        ],
      },
    ],
    value: "",
  },
  decorators: [
    (Story, context) => {
      const [selectedValue, setSelectedValue] = useState("");

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              value: selectedValue,
              onChange: (selection) => setSelectedValue(selection.value),
            }}
          />
        </div>
      );
    },
  ],
};

// Nested structure example
export const NestedStructure = {
  args: {
    options: [
      {
        key: "settings",
        label: "Settings",
        children: [
          { key: "general", label: "General", value: "settings-general" },
          { key: "privacy", label: "Privacy", value: "settings-privacy" },
          { key: "security", label: "Security", value: "settings-security" },
        ],
      },
      {
        key: "account",
        label: "Account",
        children: [
          { key: "profile", label: "Profile", value: "account-profile" },
          { key: "billing", label: "Billing", value: "account-billing" },
          {
            key: "notifications",
            label: "Notifications",
            value: "account-notifications",
          },
          {
            key: "integrations",
            label: "Integrations",
            value: "account-integrations",
          },
        ],
      },
    ],
    value: "account-profile",
  },
  decorators: [
    (Story, context) => {
      const [selectedValue, setSelectedValue] = useState(context.args.value);

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              value: selectedValue,
              onChange: (selection) => setSelectedValue(selection.value),
            }}
          />
        </div>
      );
    },
  ],
};
