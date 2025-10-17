import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

/**
 * # 🔲 Modal Component
 *
 * A flexible modal dialog component built on top of Radix UI, designed for displaying content overlays in the MuatMuat design system.
 *
 * ## When to Use
 * - Displaying important information or actions that require user attention
 * - Confirming destructive actions
 * - Collecting user input in a focused context
 * - Showing detailed content without navigating away from the current page
 *
 * ## Design System Category
 * Feedback / Overlay Components
 *
 * ## Prerequisites
 * - Requires Radix UI Dialog primitives
 * - Uses custom Tailwind classes from the design system
 * - Depends on IconComponent for close button
 *
 * ## Import & Quick Start
 *
 * ```jsx
 * import { Modal, ModalTrigger, ModalContent, ModalTitle } from "./Modal";
 *
 * // Basic usage
 * <Modal>
 *   <ModalTrigger asChild>
 *     <button>Open Modal</button>
 *   </ModalTrigger>
 *   <ModalContent>
 *     <ModalTitle>Modal Title</ModalTitle>
 *     <p>Modal content here...</p>
 *   </ModalContent>
 * </Modal>
 * ```
 */

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible modal dialog component for displaying overlays with various customization options.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Controls the modal content size",
    },
    type: {
      control: { type: "select" },
      options: ["muatmuat", "muatparts", "muattrans", "lightbox"],
      description: "Defines the modal theme and styling",
    },
    withCloseButton: {
      control: { type: "boolean" },
      description: "Whether to show the close button",
    },
    closeOnOutsideClick: {
      control: { type: "boolean" },
      description: "Whether clicking outside closes the modal",
    },
  },
};

/**
 * ## Default Modal
 *
 * The basic modal with default settings.
 *
 * ### When to Use
 * - Simple informational modals
 * - Standard confirmation dialogs
 */
export const Default = {
  render: (args) => (
    <Modal {...args}>
      <ModalTrigger asChild>
        <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          Open Modal
        </button>
      </ModalTrigger>
      <ModalContent>
        <ModalTitle>Default Modal</ModalTitle>
        <div className="p-6">
          <p className="text-neutral-700">
            This is a basic modal with default settings. It includes a title,
            content area, and close functionality.
          </p>
        </div>
      </ModalContent>
    </Modal>
  ),
  args: {
    size: "small",
    type: "muatmuat",
    withCloseButton: true,
    closeOnOutsideClick: false,
  },
};

/**
 * ## Modal with Header
 *
 * Modal featuring the branded header design.
 *
 * ### When to Use
 * - Branded modals for marketing or important announcements
 * - Modals requiring visual hierarchy with the MuatMuat logo
 */
export const WithHeader = {
  render: (args) => (
    <Modal {...args}>
      <ModalTrigger asChild>
        <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          Open Modal with Header
        </button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader />
        <div className="p-6">
          <ModalTitle>Modal with Branded Header</ModalTitle>
          <p className="mt-4 text-neutral-700">
            This modal includes the custom header with MuatMuat branding and
            decorative SVG elements.
          </p>
        </div>
      </ModalContent>
    </Modal>
  ),
  args: {
    size: "small",
    type: "muatmuat",
    withCloseButton: true,
    closeOnOutsideClick: false,
  },
};

/**
 * ## Modal with Footer
 *
 * Modal including action buttons in the footer.
 *
 * ### When to Use
 * - Confirmation dialogs with accept/cancel actions
 * - Forms requiring submit and cancel buttons
 * - Any modal needing persistent action buttons
 */
export const WithFooter = {
  render: (args) => (
    <Modal {...args}>
      <ModalTrigger asChild>
        <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          Open Modal with Footer
        </button>
      </ModalTrigger>
      <ModalContent>
        <ModalTitle>Confirmation Required</ModalTitle>
        <div className="p-6">
          <p className="text-neutral-700">
            Are you sure you want to proceed with this action? This cannot be
            undone.
          </p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <button className="rounded-md bg-neutral-300 px-4 py-2 text-neutral-700 hover:bg-neutral-400">
              Cancel
            </button>
          </ModalClose>
          <button className="rounded-md bg-error-600 px-4 py-2 text-white hover:bg-error-700">
            Confirm
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
  args: {
    size: "small",
    type: "muatmuat",
    withCloseButton: true,
    closeOnOutsideClick: false,
  },
};

/**
 * ## Lightbox Modal
 *
 * Full-screen modal for displaying images or media.
 *
 * ### When to Use
 * - Image galleries
 * - Media previews
 * - Full-screen content display
 */
export const Lightbox = {
  render: (args) => (
    <Modal {...args}>
      <ModalTrigger asChild>
        <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          Open Lightbox
        </button>
      </ModalTrigger>
      <ModalContent type="lightbox">
        <div className="flex min-h-screen items-center justify-center">
          <img
            src="/images/sample-image.jpg"
            alt="Sample"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </ModalContent>
    </Modal>
  ),
  args: {
    size: "small",
    type: "lightbox",
    withCloseButton: true,
    closeOnOutsideClick: true,
  },
};

/**
 * ## Modal Sizes
 *
 * Demonstrating different modal sizes.
 *
 * ### Size Options
 * - **Small**: Compact modals for simple content
 * - **Medium**: Balanced size for most use cases
 * - **Large**: Spacious modals for complex content
 */
export const Sizes = {
  render: (_args) => (
    <div className="space-y-4">
      <Modal>
        <ModalTrigger asChild>
          <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            Small Modal
          </button>
        </ModalTrigger>
        <ModalContent size="small">
          <ModalTitle>Small Modal</ModalTitle>
          <div className="p-4">
            <p>Compact modal for brief content.</p>
          </div>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <button className="rounded-md bg-secondary-600 px-4 py-2 text-white hover:bg-secondary-700">
            Medium Modal
          </button>
        </ModalTrigger>
        <ModalContent size="medium">
          <ModalTitle>Medium Modal</ModalTitle>
          <div className="p-6">
            <p>Balanced size for most modal content.</p>
          </div>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <button className="rounded-md bg-success-600 px-4 py-2 text-white hover:bg-success-700">
            Large Modal
          </button>
        </ModalTrigger>
        <ModalContent size="large">
          <ModalTitle>Large Modal</ModalTitle>
          <div className="p-8">
            <p>
              Spacious modal for detailed or complex content requiring more
              room.
            </p>
          </div>
        </ModalContent>
      </Modal>
    </div>
  ),
};

/**
 * ## Modal Types
 *
 * Different theme variants for various brand contexts.
 *
 * ### Type Options
 * - **muatmuat**: Primary brand theme
 * - **muatparts**: Parts marketplace theme
 * - **muattrans**: Transportation theme
 * - **lightbox**: Transparent overlay for media
 */
export const Types = {
  render: (_args) => (
    <div className="space-y-4">
      <Modal>
        <ModalTrigger asChild>
          <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            MuatMuat Theme
          </button>
        </ModalTrigger>
        <ModalContent type="muatmuat">
          <ModalTitle>MuatMuat Modal</ModalTitle>
          <div className="p-6">
            <p>Primary brand theme with standard styling.</p>
          </div>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <button className="rounded-md bg-muat-parts-non-600 px-4 py-2 text-white hover:bg-muat-parts-non-700">
            MuatParts Theme
          </button>
        </ModalTrigger>
        <ModalContent type="muatparts">
          <ModalTitle>MuatParts Modal</ModalTitle>
          <div className="p-6">
            <p>Parts marketplace theme with custom colors.</p>
          </div>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <button className="rounded-md bg-muat-trans-secondary-600 px-4 py-2 text-white hover:bg-muat-trans-secondary-700">
            MuatTrans Theme
          </button>
        </ModalTrigger>
        <ModalContent type="muattrans">
          <ModalTitle>MuatTrans Modal</ModalTitle>
          <div className="p-6">
            <p>Transportation theme with secondary colors.</p>
          </div>
        </ModalContent>
      </Modal>
    </div>
  ),
};

/**
 * ## Interactive Playground
 *
 * Customize all modal properties and see live updates.
 *
 * ### Props Documentation
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `size` | `'small' \| 'medium' \| 'large'` | `'small'` | No | Controls the modal content size |
 * | `type` | `'muatmuat' \| 'muatparts' \| 'muattrans' \| 'lightbox'` | `'muatmuat'` | No | Defines the modal theme and styling |
 * | `withCloseButton` | `boolean` | `true` | No | Whether to show the close button |
 * | `closeOnOutsideClick` | `boolean` | `false` | No | Whether clicking outside closes the modal |
 * | `appearance` | `object` | `{ backgroudClassname: "", closeButtonClassname: "" }` | No | Custom CSS classes for background and close button |
 * | `className` | `string` | - | No | Additional CSS classes for the modal content |
 * | `children` | `ReactNode` | - | Yes | Modal content |
 *
 * ### Accessibility Features
 * - ARIA attributes handled by Radix UI
 * - Keyboard navigation support (Escape to close)
 * - Focus management and trapping
 * - Screen reader announcements
 * - Proper semantic HTML structure
 *
 * ### Best Practices
 * ✅ **DO**: Use semantic titles with ModalTitle
 * ✅ **DO**: Provide clear action buttons in ModalFooter
 * ✅ **DO**: Use appropriate modal types for brand consistency
 * ✅ **DO**: Test keyboard navigation and screen readers
 * ❌ **DON'T**: Use modals for non-critical information
 * ❌ **DON'T**: Nest multiple modals without proper stack management
 * ❌ **DON'T**: Override default accessibility behaviors
 *
 * ### Edge Cases
 * - Long content: Modal content scrolls automatically
 * - Small screens: Modal adapts with responsive design
 * - Multiple modals: Proper z-index stacking handled
 * - No close button: Ensure alternative close methods
 */
export const Playground = {
  render: (args) => (
    <Modal>
      <ModalTrigger asChild>
        <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          Open Custom Modal
        </button>
      </ModalTrigger>
      <ModalContent
        size={args.size}
        type={args.type}
        withCloseButton={args.withCloseButton}
        closeOnOutsideClick={args.closeOnOutsideClick}
        appearance={args.appearance}
        className={args.className}
      >
        <ModalTitle>Custom Modal</ModalTitle>
        <div className="p-6">
          <p className="text-neutral-700">
            This modal demonstrates all customizable properties. Adjust the
            controls to see different configurations.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Size: {args.size} | Type: {args.type} | Close Button:{" "}
            {args.withCloseButton ? "Yes" : "No"}
          </p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <button className="rounded-md bg-neutral-300 px-4 py-2 text-neutral-700 hover:bg-neutral-400">
              Close
            </button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
  args: {
    size: "small",
    type: "muatmuat",
    withCloseButton: true,
    closeOnOutsideClick: false,
    appearance: {
      backgroudClassname: "",
      closeButtonClassname: "",
    },
    className: "",
  },
};
