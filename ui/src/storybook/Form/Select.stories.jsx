import { Select } from "@muatmuat/ui/Form";

/**
 * Select component for dropdown selection with accessibility and customization
 *
 * The Select component provides a fully accessible dropdown selection interface built on Radix UI primitives.
 * It supports single selection, custom options, error states, and internationalization.
 *
 * ## When to Use
 *
 * - User needs to select from a predefined list of options
 * - Form inputs requiring dropdown selection
 * - Any scenario needing accessible select functionality
 * - When you need custom styling and behavior beyond native select
 *
 * ## Design System Category
 *
 * Data Entry / Form Components
 *
 * ## Prerequisites
 *
 * - Requires Radix UI Select primitives
 * - IconComponent for visual indicators
 * - Tailwind CSS for styling
 */

// Use relative import since story is co-located with component
export default {
  title: "Form/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable, accessible select component built on Radix UI with support for custom options, error states, and internationalization.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "Currently selected value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display below the select",
    },
    notFoundText: {
      control: "text",
      description: "Text to show when no options are available",
    },
    searchable: {
      control: "boolean",
      description: "Whether the select supports search functionality",
    },
    options: {
      control: "object",
      description: "Array of options with value and label properties",
    },
    onChange: {
      action: "option selected",
      description: "Callback function called when selection changes",
    },
  },
};

/**
 * Default Select
 *
 * Basic usage with predefined options
 */
export const Default = {
  args: {
    placeholder: "Select an option...",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

/**
 * With Selected Value
 *
 * Select with a pre-selected option
 */
export const WithValue = {
  args: {
    value: "option2",
    placeholder: "Select an option...",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

/**
 * Disabled State
 *
 * Select in disabled state
 */
export const Disabled = {
  args: {
    disabled: true,
    placeholder: "Select an option...",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

/**
 * With Error Message
 *
 * Select showing an error state
 */
export const WithError = {
  args: {
    errorMessage: "Please select a valid option",
    placeholder: "Select an option...",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

/**
 * Empty Options
 *
 * Select with no available options
 */
export const EmptyOptions = {
  args: {
    placeholder: "Select an option...",
    notFoundText: "No options available at this time",
    options: [],
  },
};

/**
 * Long Option Labels
 *
 * Select with longer option text to test truncation
 */
export const LongLabels = {
  args: {
    placeholder: "Select a programming language...",
    options: [
      { value: "javascript", label: "JavaScript (ES6+)" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python 3.x" },
      { value: "java", label: "Java (JDK 11+)" },
      { value: "csharp", label: "C# (.NET Core)" },
      { value: "golang", label: "Go (Golang)" },
      { value: "rust", label: "Rust Programming Language" },
      { value: "swift", label: "Swift (iOS/macOS)" },
    ],
  },
};

/**
 * Interactive Playground
 *
 * Fully interactive story for testing different configurations
 */
export const Playground = {
  args: {
    value: "",
    placeholder: "Choose your favorite fruit...",
    disabled: false,
    errorMessage: "",
    notFoundText: "No fruits available",
    searchable: false,
    options: [
      { value: "apple", label: "🍎 Apple" },
      { value: "banana", label: "🍌 Banana" },
      { value: "orange", label: "🍊 Orange" },
      { value: "grape", label: "🍇 Grape" },
      { value: "strawberry", label: "🍓 Strawberry" },
      { value: "pineapple", label: "🍍 Pineapple" },
    ],
  },
};
