import { FormContainer, FormLabel } from "@muatmuat/ui/Form";

/**
 * Form components for consistent form layouts and labeling.
 * Includes FormContainer for layout and FormLabel for consistent label styling.
 */
export default {
  title: "Form/Form",
  component: FormContainer,
  parameters: {
    docs: {
      description: {
        component: `
Form components provide consistent styling and layout for form elements.
Perfect for creating uniform form layouts across your application.

## Components
- **FormContainer**: Grid-based container for form fields and labels
- **FormLabel**: Consistent label styling with variants and states

## When to use
- When building forms that need consistent layout and styling
- When you need responsive form layouts that work on mobile and desktop
- When you want to show required/optional field indicators
- When you need tooltips or additional information with labels

## Design System Category
Form Components / Layout

## Prerequisites
FormLabel requires the useTranslation hook to be available for optional text translation.
        `,
      },
    },
  },
  argTypes: {
    // FormContainer props
    children: {
      control: "text",
      description: "Content to be rendered inside the form container",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
  },
};

// Sample form content for stories
const sampleFormContent = (
  <div className="space-y-4">
    <div className="flex flex-col gap-2">
      <FormLabel>Name</FormLabel>
      <input
        type="text"
        className="rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter your name"
      />
    </div>
    <div className="flex flex-col gap-2">
      <FormLabel required>Email</FormLabel>
      <input
        type="email"
        className="rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter your email"
      />
    </div>
    <div className="flex flex-col gap-2">
      <FormLabel optional>Phone Number</FormLabel>
      <input
        type="tel"
        className="rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter your phone"
      />
    </div>
  </div>
);

/**
 * Basic form container with default layout
 */
export const Default = {
  args: {
    children: sampleFormContent,
  },
};

/**
 * Form container with custom styling
 */
export const CustomStyling = {
  args: {
    children: sampleFormContent,
    className: "max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg",
  },
};

/**
 * Form label with default styling
 */
export const LabelDefault = {
  render: () => (
    <div className="space-y-4">
      <FormLabel>Default Label</FormLabel>
      <FormLabel variant="big">Big Variant Label</FormLabel>
    </div>
  ),
};

/**
 * Form label with required indicator
 */
export const LabelRequired = {
  render: () => (
    <div className="space-y-4">
      <FormLabel required>Name *</FormLabel>
      <FormLabel required variant="big">
        Full Name *
      </FormLabel>
    </div>
  ),
};

/**
 * Form label with optional indicator
 */
export const LabelOptional = {
  render: () => (
    <div className="space-y-4">
      <FormLabel optional>Middle Name</FormLabel>
      <FormLabel optional variant="big">
        Preferred Name
      </FormLabel>
    </div>
  ),
};

/**
 * Form label with both required and optional states
 */
export const LabelStates = {
  render: () => (
    <div className="space-y-4">
      <FormLabel required>First Name *</FormLabel>
      <FormLabel optional>Middle Name</FormLabel>
      <FormLabel>Last Name</FormLabel>
    </div>
  ),
};

/**
 * Form label with tooltip
 */
export const LabelWithTooltip = {
  render: () => (
    <div className="space-y-4">
      <FormLabel
        tooltip={
          <div
            className="ml-2 cursor-help text-neutral-500"
            title="This field is required"
          >
            ℹ️
          </div>
        }
      >
        Username
      </FormLabel>
      <FormLabel
        required
        tooltip={
          <div
            className="ml-2 cursor-help text-neutral-500"
            title="Enter a strong password"
          >
            ℹ️
          </div>
        }
      >
        Password *
      </FormLabel>
    </div>
  ),
};

/**
 * Form label with custom children (not just text)
 */
export const LabelCustomChildren = {
  render: () => (
    <div className="space-y-4">
      <FormLabel>
        <span className="flex items-center gap-2">
          <span>📧</span>
          <span>Email Address</span>
        </span>
      </FormLabel>
      <FormLabel required>
        <div className="flex items-center gap-2">
          <span>🔒</span>
          <span>Secure Field</span>
        </div>
      </FormLabel>
    </div>
  ),
};

/**
 * Complete form example using both components
 */
export const CompleteForm = {
  render: () => (
    <FormContainer>
      <FormLabel required>First Name *</FormLabel>
      <input
        type="text"
        className="w-full rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter first name"
      />

      <FormLabel optional>Middle Name</FormLabel>
      <input
        type="text"
        className="w-full rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter middle name"
      />

      <FormLabel required>Last Name *</FormLabel>
      <input
        type="text"
        className="w-full rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter last name"
      />

      <FormLabel
        required
        tooltip={
          <div
            className="ml-2 cursor-help text-neutral-500"
            title="We'll never share your email"
          >
            ℹ️
          </div>
        }
      >
        Email Address *
      </FormLabel>
      <input
        type="email"
        className="w-full rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter email"
      />

      <FormLabel optional>Phone Number</FormLabel>
      <input
        type="tel"
        className="w-full rounded border border-neutral-300 px-3 py-2"
        placeholder="Enter phone number"
      />
    </FormContainer>
  ),
};

/**
 * Responsive form layout demonstration
 */
export const ResponsiveLayout = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Mobile Layout (Stacked)</h3>
        <div className="max-w-sm">
          <FormContainer>
            <FormLabel required>Name *</FormLabel>
            <input
              type="text"
              className="w-full rounded border border-neutral-300 px-3 py-2"
              placeholder="John Doe"
            />

            <FormLabel required>Email *</FormLabel>
            <input
              type="email"
              className="w-full rounded border border-neutral-300 px-3 py-2"
              placeholder="john@example.com"
            />
          </FormContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Desktop Layout (Side-by-side)
        </h3>
        <div className="hidden md:block">
          <FormContainer>
            <FormLabel required>Name *</FormLabel>
            <input
              type="text"
              className="w-full rounded border border-neutral-300 px-3 py-2"
              placeholder="John Doe"
            />

            <FormLabel required>Email *</FormLabel>
            <input
              type="email"
              className="w-full rounded border border-neutral-300 px-3 py-2"
              placeholder="john@example.com"
            />
          </FormContainer>
        </div>
        <div className="md:hidden">
          <p className="text-neutral-500">
            Switch to desktop view to see side-by-side layout
          </p>
        </div>
      </div>
    </div>
  ),
};
