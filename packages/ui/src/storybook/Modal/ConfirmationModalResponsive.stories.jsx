import { ConfirmationModalResponsive } from "@muatmuat/ui/Modal";

/**
 * # 📱 ConfirmationModalResponsive Component
 *
 * A mobile-optimized confirmation modal designed specifically for responsive layouts and mobile devices.
 *
 * ## When to Use
 * - Mobile-first applications
 * - Responsive designs that work well on small screens
 * - Confirmation dialogs in mobile contexts
 * - When space is limited and mobile optimization is critical
 *
 * ## Design System Category
 * Feedback / Mobile Components
 *
 * ## Prerequisites
 * - Built for mobile-first responsive design
 * - Uses MuatParts branding and styling
 * - Optimized for touch interactions
 *
 * ## Import & Quick Start
 *
 * ```jsx
 * import ConfirmationModalResponsive from "./ConfirmationModalResponsive";
 *
 * // Basic usage
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <ConfirmationModalResponsive
 *   isOpen={isOpen}
 *   setIsOpen={setIsOpen}
 *   title={{ text: "Confirm Action?" }}
 *   description={{ text: "Are you sure you want to proceed?" }}
 *   cancel={{ text: "Cancel" }}
 *   confirm={{ text: "Confirm" }}
 * />
 * ```
 */

export default {
  title: "Components/Modal/ConfirmationModalResponsive",
  component: ConfirmationModalResponsive,
  parameters: {
    docs: {
      description: {
        component:
          "A mobile-optimized confirmation modal designed for responsive layouts and touch interactions.",
      },
    },
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Whether the modal is currently open",
    },
    setIsOpen: {
      action: "setIsOpen",
      description: "Function to control the open state of the modal",
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
    closeOnOutsideClick: {
      control: { type: "boolean" },
      description: "Whether clicking outside closes the modal",
    },
  },
};

/**
 * ## Default Responsive Modal
 *
 * Basic responsive confirmation modal with standard layout.
 *
 * ### When to Use
 * - Standard mobile confirmations
 * - Responsive dialog patterns
 * - Mobile-first applications
 */
export const Default = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-muat-parts-non-600 hover:bg-muat-parts-non-700 rounded-md px-4 py-2 text-white"
        >
          Open Responsive Modal
        </button>
        <ConfirmationModalResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Remove Item?" }}
          description={{ text: "This item will be removed from your list." }}
          cancel={{ text: "Cancel" }}
          confirm={{ text: "Remove" }}
        />
      </div>
    );
  },
  args: {
    closeOnOutsideClick: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * ## Document Confirmation
 *
 * Specialized modal for document-related confirmations.
 *
 * ### When to Use
 * - Document management workflows
 * - File processing confirmations
 * - Digital document actions
 */
export const DocumentConfirmation = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-muat-parts-non-600 hover:bg-muat-parts-non-700 rounded-md px-4 py-2 text-white"
        >
          Receive Document
        </button>
        <ConfirmationModalResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Receive Document?" }}
          description={{
            text: "Are you sure you want to mark this document as received?",
          }}
          cancel={{ text: "Not Yet" }}
          confirm={{ text: "Receive" }}
        />
      </div>
    );
  },
  args: {
    closeOnOutsideClick: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * ## Mobile-Optimized Layout
 *
 * Shows the mobile-specific layout with compact design.
 *
 * ### When to Use
 * - Mobile phone screens
 * - Touch-first interfaces
 * - Space-constrained environments
 */
export const MobileOptimized = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-muat-parts-non-600 hover:bg-muat-parts-non-700 rounded-md px-4 py-2 text-white"
        >
          Mobile Optimized
        </button>
        <ConfirmationModalResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Delete Photo?" }}
          description={{
            text: "This photo will be permanently deleted from your device.",
          }}
          cancel={{ text: "Keep" }}
          confirm={{ text: "Delete" }}
        />
      </div>
    );
  },
  args: {
    closeOnOutsideClick: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * ## Custom Styling
 *
 * Modal with custom title and description styling.
 *
 * ### When to Use
 * - Brand-specific confirmations
 * - Custom visual treatments
 * - When you need visual emphasis
 */
export const CustomStyling = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-muat-parts-non-600 hover:bg-muat-parts-non-700 rounded-md px-4 py-2 text-white"
        >
          Custom Styled Modal
        </button>
        <ConfirmationModalResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{
            text: "Complete Verification",
            className: "text-lg font-semibold",
          }}
          description={{
            text: "Please verify your identity to complete this secure transaction.",
            className: "text-base leading-relaxed",
          }}
          cancel={{ text: "Skip for Now" }}
          confirm={{ text: "Verify" }}
        />
      </div>
    );
  },
  args: {
    closeOnOutsideClick: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * ## No Outside Click Close
 *
 * Modal that requires explicit button interaction.
 *
 * ### When to Use
 * - Critical confirmations
 * - Important system actions
 * - When accidental dismissal would be problematic
 */
export const NoOutsideClick = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-muat-parts-non-600 hover:bg-muat-parts-non-700 rounded-md px-4 py-2 text-white"
        >
          Critical Action
        </button>
        <ConfirmationModalResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Delete Account?" }}
          description={{
            text: "This action will permanently delete your account and all associated data.",
          }}
          cancel={{ text: "Cancel" }}
          confirm={{ text: "Delete Account" }}
          closeOnOutsideClick={false}
        />
      </div>
    );
  },
  args: {
    closeOnOutsideClick: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * ## Viewport Comparison
 *
 * Shows how the modal behaves across different viewport sizes.
 *
 * ### Responsive Behavior
 * - Mobile: Compact layout with touch-friendly buttons
 * - Tablet: Balanced layout with appropriate spacing
 * - Desktop: Maintains mobile-optimized design
 */
export const ViewportComparison = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-muat-parts-non-600 hover:bg-muat-parts-non-700 rounded-md px-4 py-2 text-white"
        >
          Test Responsive Layout
        </button>
        <ConfirmationModalResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={{ text: "Responsive Test" }}
          description={{
            text: "This modal maintains mobile-optimized design across all viewport sizes.",
          }}
          cancel={{ text: "Cancel" }}
          confirm={{ text: "Test" }}
        />
      </div>
    );
  },
  args: {
    closeOnOutsideClick: true,
  },
  parameters: {
    viewport: {
      viewports: ["mobile1", "tablet", "desktop"],
    },
  },
};

/**
 * ## Interactive Playground
 *
 * Customize all responsive modal properties.
 *
 * ### Props Documentation
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `isOpen` | `boolean` | - | Yes | Whether the modal is currently open |
 * | `setIsOpen` | `function` | - | Yes | Function to control the open state |
 * | `title` | `{ text: string, className: string }` | `{ text: "", className: "" }` | No | Title configuration |
 * | `description` | `{ text: string, className: string }` | `{ text: "", className: "" }` | No | Description configuration |
 * | `cancel` | `{ classname: string, text: string, onClick: function }` | `{ classname: "", text: "", onClick: () => {} }` | No | Cancel button configuration |
 * | `confirm` | `{ classname: string, text: string, onClick: function }` | `{ classname: "", text: "", onClick: () => {} }` | No | Confirm button configuration |
 * | `closeOnOutsideClick` | `boolean` | `true` | No | Whether clicking outside closes the modal |
 *
 * ### Mobile-Optimized Features
 * - **Fixed width**: `w-[296px]` for consistent mobile layout
 * - **Compact buttons**: `h-7 w-[112px]` for touch targets
 * - **Responsive padding**: `px-4 py-6` for mobile spacing
 * - **Vertical layout**: Stacked content for mobile screens
 * - **Touch-friendly**: Large touch targets and spacing
 *
 * ### Accessibility Features
 * - Full keyboard navigation support
 * - Touch-friendly button sizes
 * - ARIA labels and roles
 * - Focus management within modal
 * - Screen reader compatibility
 *
 * ### Best Practices
 * ✅ **DO**: Use clear, action-oriented text for buttons
 * ✅ **DO**: Keep text concise for mobile screens
 * ✅ **DO**: Use touch-friendly button sizes
 * ✅ **DO**: Test on actual mobile devices
 * ❌ **DON'T**: Use long paragraphs of text
 * ❌ **DON'T**: Make buttons too small for touch
 * ❌ **DON'T**: Override mobile-specific styling
 * ❌ **DON'T**: Use desktop-only interactions
 *
 * ### Edge Cases
 * - Very small screens: Modal maintains minimum usable size
 * - Long text: Text wraps appropriately in mobile layout
 * - Landscape orientation: Layout adapts to orientation changes
 * - Touch events: Proper touch handling for mobile devices
 */
export const Playground = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-muat-parts-non-600 hover:bg-muat-parts-non-700 rounded-md px-4 py-2 text-white"
        >
          Open Responsive Modal
        </button>
        <ConfirmationModalResponsive
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
    closeOnOutsideClick: true,
    title: { text: "Confirm Action?", className: "" },
    description: { text: "Are you sure you want to proceed?", className: "" },
    cancel: { classname: "", text: "Cancel" },
    confirm: { classname: "", text: "Confirm" },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
