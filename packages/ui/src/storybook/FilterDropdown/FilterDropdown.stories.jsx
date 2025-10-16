import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import { FilterDropdown } from "@muatmuat/ui/FilterDropdown";

const meta = {
  title: "Components/FilterDropdown",
  component: FilterDropdown,
  parameters: {
    docs: {
      description: {
        component:
          "A powerful multi-category filter dropdown component with search capabilities, multi-select support, and custom trigger options.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    trigger: {
      description:
        "Custom trigger element or function. Defaults to a filter button with selected count.",
      control: { type: "object" },
    },
    categories: {
      description: "Array of filter categories with their configuration",
      control: { type: "object" },
    },
    data: {
      description: "Object containing filter items for each category",
      control: { type: "object" },
    },
    selectedValues: {
      description: "Currently selected filter values",
      control: { type: "object" },
    },
    onSelectionChange: {
      description: "Callback fired when selection changes",
      action: "onSelectionChange",
    },
    searchable: {
      description: "Enable search functionality across all categories",
      control: { type: "boolean" },
      defaultValue: true,
    },
    multiSelect: {
      description: "Allow multiple selections within each category",
      control: { type: "boolean" },
      defaultValue: true,
    },
    showSelectedCount: {
      description: "Display count of selected items in trigger",
      control: { type: "boolean" },
      defaultValue: true,
    },
    triggerClassName: {
      description: "Additional CSS classes for the trigger element",
      control: { type: "text" },
    },
    dropdownClassName: {
      description: "Additional CSS classes for the dropdown container",
      control: { type: "text" },
    },
    itemClassName: {
      description: "Additional CSS classes for individual items",
      control: { type: "text" },
    },
    searchPlaceholder: {
      description:
        "Placeholder text for search inputs. Use {category} as variable",
      control: { type: "text" },
      defaultValue: "Search...",
    },
    emptyMessage: {
      description: "Custom message when no results found",
      control: { type: "text" },
    },
    maxHeight: {
      description: "Maximum height for item lists",
      control: { type: "text" },
      defaultValue: "160px",
    },
    disabled: {
      description: "Disable the entire filter dropdown",
      control: { type: "boolean" },
      defaultValue: false,
    },
    t: {
      description: "Translation function",
      control: { type: "object" },
    },
  },
};

export default meta;

// Sample data for stories
const sampleCategories = [
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "category", label: "Category" },
];

const sampleData = {
  status: [
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ],
  priority: [
    { id: "high", label: "High Priority" },
    { id: "medium", label: "Medium Priority" },
    { id: "low", label: "Low Priority" },
  ],
  category: [
    { id: "work", label: "Work" },
    { id: "personal", label: "Personal" },
    { id: "urgent", label: "Urgent" },
    { id: "long-term", label: "Long Term" },
  ],
};

// Interactive Storybook story with comprehensive controls
export const Playground = {
  args: {
    categories: sampleCategories,
    data: sampleData,
    selectedValues: {},
    searchable: true,
    multiSelect: true,
    showSelectedCount: true,
    disabled: false,
    searchPlaceholder: "Search {category}...",
    maxHeight: "160px",
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState(
        context.args.selectedValues
      );

      useEffect(() => {
        setSelectedValues(context.args.selectedValues);
      }, [context.args.selectedValues]);

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: (newValues) => {
                setSelectedValues(newValues);
                context.args.onSelectionChange?.(newValues);
              },
            }}
          />
          <div className="mt-4 rounded-md bg-neutral-100 p-4">
            <p className="mb-2 text-sm font-medium">Selected Values:</p>
            <pre className="rounded bg-white p-2 text-xs">
              {JSON.stringify(selectedValues, null, 2)}
            </pre>
          </div>
        </div>
      );
    },
  ],
};

// Basic multi-select example
export const MultiSelect = {
  args: {
    categories: sampleCategories,
    data: sampleData,
    selectedValues: {},
    multiSelect: true,
    searchable: true,
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState({});

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: setSelectedValues,
            }}
          />
        </div>
      );
    },
  ],
};

// Single select mode example
export const SingleSelect = {
  args: {
    categories: sampleCategories,
    data: sampleData,
    selectedValues: {},
    multiSelect: false,
    searchable: true,
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState({});

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: setSelectedValues,
            }}
          />
        </div>
      );
    },
  ],
};

// With pre-selected values
export const WithPreselection = {
  args: {
    categories: sampleCategories,
    data: sampleData,
    selectedValues: {
      status: [{ id: "active", label: "Active" }],
      priority: [{ id: "high", label: "High Priority" }],
    },
    multiSelect: true,
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState(
        context.args.selectedValues
      );

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: setSelectedValues,
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
    categories: sampleCategories,
    data: sampleData,
    selectedValues: {
      status: [{ id: "active", label: "Active" }],
    },
    disabled: true,
  },
};

// With custom trigger
export const CustomTrigger = {
  args: {
    categories: sampleCategories,
    data: sampleData,
    trigger: ({ selectedCount, disabled }) => (
      <button
        className={`rounded-lg px-4 py-2 font-medium transition-all ${
          disabled
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : selectedCount > 0
              ? "bg-primary-700 hover:bg-primary-800 text-white"
              : "border-primary-700 text-primary-700 hover:bg-primary-50 border-2 bg-white"
        } `}
        disabled={disabled}
      >
        {selectedCount > 0
          ? `${selectedCount} Filters Applied`
          : "Apply Filters"}
      </button>
    ),
    multiSelect: true,
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState({});

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: setSelectedValues,
            }}
          />
        </div>
      );
    },
  ],
};

// Non-searchable categories
export const NonSearchable = {
  args: {
    categories: [
      { key: "status", label: "Status", searchable: false },
      { key: "priority", label: "Priority" },
    ],
    data: {
      status: sampleData.status,
      priority: sampleData.priority,
    },
    searchable: false,
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState({});

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: setSelectedValues,
            }}
          />
        </div>
      );
    },
  ],
};

// Mixed searchability per category
export const MixedSearchability = {
  args: {
    categories: [
      { key: "status", label: "Status", searchable: true },
      { key: "priority", label: "Priority", searchable: false },
      { key: "category", label: "Category", searchable: true },
    ],
    data: sampleData,
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState({});

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: setSelectedValues,
            }}
          />
        </div>
      );
    },
  ],
};

// With custom styling
export const CustomStyling = {
  args: {
    categories: sampleCategories,
    data: sampleData,
    triggerClassName: "border-2 border-primary-700 rounded-lg",
    dropdownClassName: "rounded-lg border-2 border-primary-200",
    itemClassName: "hover:bg-primary-50",
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState({});

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: setSelectedValues,
            }}
          />
        </div>
      );
    },
  ],
};

// Without selected count
export const WithoutSelectedCount = {
  args: {
    categories: sampleCategories,
    data: sampleData,
    showSelectedCount: false,
  },
  decorators: [
    (Story, context) => {
      const [selectedValues, setSelectedValues] = useState({});

      return (
        <div className="p-8">
          <Story
            args={{
              ...context.args,
              selectedValues,
              onSelectionChange: setSelectedValues,
            }}
          />
        </div>
      );
    },
  ],
};
