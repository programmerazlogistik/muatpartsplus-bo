import { ConfirmationModal } from "@muatmuat/ui/Modal";

/**
 * # ✔️ ConfirmationModal Component
 *
 * A pre-built confirmation modal dialog that provides standardized confirmation patterns with customizable title, description, and action buttons.
 *
 * ## When to Use
 * - Confirming destructive actions (delete, remove, cancel)
 * - Validating important decisions before proceeding
 * - Getting explicit user consent for critical operations
 * - Warning users about irreversible actions
 *
 * ## Design System Category
 * Feedback / Confirmation Components
 *
 * ## Prerequisites
 * - Depends on Modal components and Button components
 * - Uses branded header styling with MuatMuat design system
 * - Supports multiple brand variants (muattrans, muatparts)
 *
 * ## Import & Quick Start
 *
 * ```jsx
 * import ConfirmationModal from "./ConfirmationModal";
 *
 * // Basic usage
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <ConfirmationModal
 *   isOpen={isOpen}
 *   setIsOpen={setIsOpen}
 *   title={{ text: "Delete Item?" }}
 *   description={{ text: "This action cannot be undone." }}
 *   cancel={{ text: "Cancel" }}
 *   confirm={{ text: "Delete", onClick: handleDelete }}
 * />
 * ```
 */

export default {
  title: "Components/Modal/ConfirmationModal",
  component: ConfirmationModal,
  parameters: {
    docs: {
      description: {
        component:
          "A pre-built confirmation modal with standardized patterns for confirming user actions.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "big"],
      description: "Controls the modal size",
    },
    variant: {
      control: { type: "select" },
      options: ["muattrans", "muatparts"],
      description: "The visual style variant of the modal",
    },
    isOpen: {
      control: { type: "boolean" },
      description: "Whether the modal is currently open",
    },
    setIsOpen: {
      action: "setIsOpen",
      description: "Function to control the open state of the modal",
    },
    withCancel: {
      control: { type: "boolean" },
      description: "Whether to show the cancel button",
    },
    title: {
      control: { type: "object" },
      description: "Title configuration object",
    },
    description: {
      control: { type: "object" },
      description: "Description configuration object",
    },
    cancel: {
      control: { type: "object" },
      description: "Cancel button configuration",
    },
    confirm: {
      control: { type: "object" },
      description: "Confirm button configuration",
    },
  },
};

/**
 * ## Default Confirmation Modal
 *
 * Basic confirmation modal with title and description.
 *
 * ### When to Use
 * - Standard delete confirmations
 * - Simple action confirmations
 * - When you need explicit user consent
 */
export const Default = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        >
          Open Confirmation Modal
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Delete Item?" }}
          description={{ text: "This action cannot be undone." }}
          cancel={{ text: "Cancel" }}
          confirm={{ text: "Delete" }}
        />
      </div>
    );
  },
  args: {
    size: "small",
    variant: "muattrans",
    withCancel: true,
  },
};

/**
 * ## Warning Confirmation
 *
 * Confirmation modal for potentially destructive actions.
 *
 * ### When to Use
 * - Deleting important data
 * - Canceling subscriptions
 * - Irreversible operations
 */
export const Warning = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-error-600 px-4 py-2 text-white hover:bg-error-700"
        >
          Delete Account
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Delete Account?" }}
          description={{
            text: "This will permanently delete your account and all associated data. This action cannot be undone.",
          }}
          cancel={{ text: "Cancel" }}
          confirm={{ text: "Delete Account" }}
        />
      </div>
    );
  },
  args: {
    size: "small",
    variant: "muattrans",
    withCancel: true,
  },
};

/**
 * ## Success Confirmation
 *
 * Confirmation modal for positive actions.
 *
 * ### When to Use
 * - Confirming successful operations
 * - Positive action confirmations
 * - When the outcome is beneficial
 */
export const Success = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-success-600 px-4 py-2 text-white hover:bg-success-700"
        >
          Complete Setup
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Complete Setup?" }}
          description={{
            text: "Your setup is almost complete. This will finalize your configuration.",
          }}
          cancel={{ text: "Later" }}
          confirm={{ text: "Complete" }}
        />
      </div>
    );
  },
  args: {
    size: "small",
    variant: "muattrans",
    withCancel: true,
  },
};

/**
 * ## MuatParts Variant
 *
 * Confirmation modal with MuatParts branding.
 *
 * ### When to Use
 * - MuatParts specific confirmations
 * - Parts marketplace actions
 * - Brand-consistent modals
 */
export const MuatPartsVariant = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-muat-parts-non-600 px-4 py-2 text-white hover:bg-muat-parts-non-700"
        >
          Remove from Cart
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Remove Item?" }}
          description={{ text: "This item will be removed from your cart." }}
          cancel={{ text: "Keep Item" }}
          confirm={{ text: "Remove" }}
        />
      </div>
    );
  },
  args: {
    size: "small",
    variant: "muatparts",
    withCancel: true,
  },
};

/**
 * ## Big Size Modal
 *
 * Larger confirmation modal for complex content.
 *
 * ### When to Use
 * - Detailed confirmation dialogs
 * - Multi-step confirmations
 * - When more context is needed
 */
export const BigSize = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        >
          Bulk Action
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Delete 50 Items?" }}
          description={{
            text: "You are about to delete 50 items. This action cannot be undone. All associated data will be permanently removed.",
          }}
          cancel={{ text: "Cancel" }}
          confirm={{ text: "Delete All" }}
        />
      </div>
    );
  },
  args: {
    size: "big",
    variant: "muattrans",
    withCancel: true,
  },
};

/**
 * ## No Cancel Option
 *
 * Confirmation modal without cancel button.
 *
 * ### When to Use
 * - Forced confirmations
 * - Critical system actions
 * - When user must proceed
 */
export const NoCancel = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-error-600 px-4 py-2 text-white hover:bg-error-700"
        >
          Force Action
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "System Update Required" }}
          description={{
            text: "Your system requires an immediate update to continue functioning properly.",
          }}
          withCancel={false}
          cancel={{ text: "" }}
          confirm={{ text: "Update Now" }}
        />
      </div>
    );
  },
  args: {
    size: "small",
    variant: "muattrans",
    withCancel: false,
  },
};

/**
 * ## Interactive Playground
 *
 * Customize all confirmation modal properties.
 *
 * ### Props Documentation
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `size` | `'small' \| 'big'` | `'small'` | No | Controls the modal size |
 * | `variant` | `'muattrans' \| 'muatparts'` | `'muattrans'` | No | The visual style variant |
 * | `isOpen` | `boolean` | - | Yes | Whether the modal is currently open |
 * | `setIsOpen` | `function` | - | Yes | Function to control the open state |
 * | `title` | `{ text: string, className: string }` | `{ text: "", className: "" }` | No | Title configuration |
 * | `description` | `{ text: string, className: string }` | `{ text: "", className: "" }` | No | Description configuration |
 * | `cancel` | `{ classname: string, text: string, onClick: function }` | `{ classname: "", text: "", onClick: () => {} }` | No | Cancel button configuration |
 * | `confirm` | `{ classname: string, text: string, onClick: function }` | `{ classname: "", text: "", onClick: () => {} }` | No | Confirm button configuration |
 * | `withCancel` | `boolean` | `true` | No | Whether to show the cancel button |
 * | `className` | `string` | `""` | No | Additional CSS classes |
 *
 * ### Accessibility Features
 * - Full keyboard navigation support
 * - ARIA labels and roles
 * - Focus management within modal
 * - Screen reader compatibility
 * - Semantic HTML structure
 *
 * ### Best Practices
 * ✅ **DO**: Use clear, action-oriented text for buttons
 * ✅ **DO**: Provide context about the action being confirmed
 * ✅ **DO**: Use appropriate variants for brand consistency
 * ✅ **DO**: Test with screen readers
 * ❌ **DON'T**: Use vague language like "Yes" or "No"
 * ❌ **DON'T**: Hide important information in small print
 * ❌ **DON'T**: Use confirmations for non-critical actions
 * ❌ **DON'T**: Make it difficult to cancel the action
 *
 * ### Edge Cases
 * - Long descriptions: Text wraps automatically
 * - Complex confirmations: Use big size for more space
 * - Critical actions: Consider removing cancel option
 * - Brand consistency: Always use appropriate variant
 */
export const Playground = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        >
          Open Confirmation Modal
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: args.title.text || "Confirm Action?" }}
          description={{
            text: args.description.text || "Are you sure you want to proceed?",
          }}
          cancel={{ text: args.cancel.text || "Cancel" }}
          confirm={{ text: args.confirm.text || "Confirm" }}
        />
      </div>
    );
  },
  args: {
    size: "small",
    variant: "muattrans",
    withCancel: true,
    title: { text: "Confirm Action?", className: "" },
    description: { text: "Are you sure you want to proceed?", className: "" },
    cancel: { classname: "", text: "Cancel" },
    confirm: { classname: "", text: "Confirm" },
  },
};
