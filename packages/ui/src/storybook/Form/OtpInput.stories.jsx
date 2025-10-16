import {
  OtpInput as InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@muatmuat/ui/Form";

/**
 * OTP Input component for secure code entry
 *
 * The OTP Input component provides a user-friendly interface for entering one-time passwords or verification codes.
 * It supports customizable styling, validation states, and accessibility features.
 *
 * ## When to Use
 *
 * - User authentication flows requiring OTP verification
 * - Two-factor authentication screens
 * - Password reset flows
 * - Any scenario requiring secure numeric or alphanumeric code entry
 *
 * ## Design System Category
 *
 * Data Entry / Form Components
 *
 * ## Prerequisites
 *
 * - Requires the `input-otp` library for core functionality
 * - Tailwind CSS for styling
 * - Lucide React for icons
 */

// Use relative import since story is co-located with component
export default {
  title: "Form/OtpInput",
  component: InputOTP,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable OTP (One-Time Password) input component with built-in validation states and accessibility features.",
      },
    },
  },
  argTypes: {
    maxLength: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum number of characters allowed in the OTP input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
    containerClassName: {
      control: "text",
      description: "Additional CSS classes for the input container",
    },
  },
};

/**
 * Default OTP Input
 *
 * Basic usage with 6-digit OTP input
 */
export const Default = {
  args: {
    maxLength: 6,
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </>
    ),
  },
};

/**
 * Compact OTP Input
 *
 * Smaller OTP input for mobile interfaces
 */
export const Compact = {
  args: {
    maxLength: 4,
    className: "text-xs",
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </>
    ),
  },
};

/**
 * Disabled State
 *
 * OTP input in disabled state
 */
export const Disabled = {
  args: {
    maxLength: 6,
    disabled: true,
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </>
    ),
  },
};

/**
 * With Custom Styling
 *
 * OTP input with custom container styling
 */
export const CustomStyled = {
  args: {
    maxLength: 6,
    containerClassName: "bg-gray-50 p-4 rounded-lg",
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </>
    ),
  },
};

/**
 * Interactive Playground
 *
 * Fully interactive story for testing different configurations
 */
export const Playground = {
  args: {
    maxLength: 6,
    disabled: false,
    className: "",
    containerClassName: "",
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </>
    ),
  },
};

/**
 * Error State Example
 *
 * Demonstrates error styling (applied via aria-invalid)
 */
export const ErrorState = {
  args: {
    maxLength: 6,
    "aria-invalid": true,
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </>
    ),
  },
};
