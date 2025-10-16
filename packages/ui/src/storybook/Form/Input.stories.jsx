import { Input } from "@muatmuat/ui/Form";

/**
 * Input component with comprehensive features including icons, text elements, validation, and customization.
 * Supports all standard input types with enhanced styling and functionality.
 */
export default {
  title: "Form/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `
A versatile input component with extensive customization options.
Features left/right icons, text elements, error handling, and reset functionality.

## When to use
- When you need a customizable input field with icons or text elements
- When you want to display validation errors or supportive text
- When you need different input types (text, password, email, etc.)
- When you want reset functionality for clearing input values

## Design System Category
Form Components / Data Entry

## Prerequisites
Requires the useTranslation hook for error message translation.
The component uses Tailwind CSS classes from the design system.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
      description: "Input type",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
    },
    supportiveText: {
      control: "text",
      description: "Supportive text to display",
    },
    withReset: {
      control: "boolean",
      description: "Whether to show reset (X) button when input has value",
    },
    icon: {
      control: "object",
      description: "Icon configuration for left and right sides",
    },
    text: {
      control: "object",
      description: "Text configuration for left and right sides",
    },
    appearance: {
      control: "object",
      description: "Appearance customization",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

// Sample data for stories
const sampleIcons = {
  search: "/icons/search16.svg",
  user: "/icons/user16.svg",
  lock: "/icons/lock16.svg",
  email: "/icons/email16.svg",
  phone: "/icons/phone16.svg",
};

/**
 * Basic input with default styling
 */
export const Default = {
  args: {
    placeholder: "Enter text...",
    type: "text",
  },
};

/**
 * Input with left icon
 */
export const WithLeftIcon = {
  args: {
    placeholder: "Search...",
    icon: { left: sampleIcons.search },
    type: "text",
  },
};

/**
 * Input with right icon
 */
export const WithRightIcon = {
  args: {
    placeholder: "Enter username",
    icon: { right: sampleIcons.user },
    type: "text",
  },
};

/**
 * Input with both left and right icons
 */
export const WithBothIcons = {
  args: {
    placeholder: "Enter password",
    icon: { left: sampleIcons.lock, right: sampleIcons.user },
    type: "password",
  },
};

/**
 * Input with left text element
 */
export const WithLeftText = {
  args: {
    placeholder: "Enter amount",
    text: { left: "$" },
    type: "number",
  },
};

/**
 * Input with right text element
 */
export const WithRightText = {
  args: {
    placeholder: "Enter weight",
    text: { right: "kg" },
    type: "number",
  },
};

/**
 * Input with both left and right text elements
 */
export const WithBothText = {
  args: {
    placeholder: "Enter price",
    text: { left: "$", right: "USD" },
    type: "number",
  },
};

/**
 * Input with error message
 */
export const WithError = {
  args: {
    placeholder: "Enter email",
    errorMessage: "Please enter a valid email address",
    type: "email",
  },
};

/**
 * Input with supportive text
 */
export const WithSupportiveText = {
  args: {
    placeholder: "Enter username",
    supportiveText: "Choose a unique username",
    type: "text",
  },
};

/**
 * Input with both error and supportive text
 */
export const WithErrorAndSupportiveText = {
  args: {
    placeholder: "Enter password",
    errorMessage: "Password must be at least 8 characters",
    supportiveText: "Use a mix of letters, numbers, and symbols",
    type: "password",
  },
};

/**
 * Input with reset functionality
 */
export const WithReset = {
  args: {
    placeholder: "Type something...",
    withReset: true,
    value: "Sample text to reset",
    type: "text",
  },
};

/**
 * Disabled input
 */
export const Disabled = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    type: "text",
  },
};

/**
 * Password input
 */
export const Password = {
  args: {
    placeholder: "Enter password",
    icon: { left: sampleIcons.lock },
    type: "password",
  },
};

/**
 * Email input
 */
export const Email = {
  args: {
    placeholder: "Enter email",
    icon: { left: sampleIcons.email },
    type: "email",
  },
};

/**
 * Phone input
 */
export const Phone = {
  args: {
    placeholder: "Enter phone number",
    icon: { left: sampleIcons.phone },
    type: "tel",
  },
};

/**
 * Number input
 */
export const Number = {
  args: {
    placeholder: "Enter quantity",
    text: { right: "pcs" },
    type: "number",
  },
};

/**
 * URL input
 */
export const Url = {
  args: {
    placeholder: "Enter website URL",
    type: "url",
  },
};

/**
 * Input with custom appearance
 */
export const CustomAppearance = {
  args: {
    placeholder: "Custom styled input",
    appearance: {
      containerClassName: "border-2 border-blue-500",
      inputClassName: "text-blue-600 font-bold",
      iconClassName: "text-blue-500",
    },
    icon: { left: sampleIcons.search },
    type: "text",
  },
};

/**
 * Complete form example
 */
export const CompleteForm = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Full Name</label>
        <Input
          placeholder="Enter your full name"
          icon={{ left: sampleIcons.user }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address</label>
        <Input
          placeholder="Enter your email"
          type="email"
          icon={{ left: sampleIcons.email }}
          errorMessage="Please enter a valid email address"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input
          placeholder="Create a password"
          type="password"
          icon={{ left: sampleIcons.lock }}
          supportiveText="Must be at least 8 characters"
          withReset={true}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Phone Number</label>
        <Input
          placeholder="Enter phone number"
          type="tel"
          icon={{ left: sampleIcons.phone }}
          text={{ left: "+62" }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Price</label>
        <Input
          placeholder="Enter price"
          type="number"
          text={{ left: "Rp", right: ",00" }}
        />
      </div>
    </div>
  ),
};

/**
 * Interactive playground with all controls
 */
export const Playground = {
  args: {
    placeholder: "Type here...",
    type: "text",
    disabled: false,
    withReset: false,
    errorMessage: "",
    supportiveText: "",
    icon: { left: "", right: "" },
    text: { left: "", right: "" },
    appearance: {
      containerClassName: "",
      inputClassName: "",
      errorMessageClassName: "",
      supportiveTextClassName: "",
      iconClassName: "",
    },
  },
};
