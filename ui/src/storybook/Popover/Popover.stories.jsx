import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@muatmuat/ui/Popover";

/**
 * # 💬 Popover Component
 *
 * A flexible popover component built on Radix UI, providing context-aware overlays that can be triggered by user interaction.
 *
 * ## When to Use
 * - Displaying additional information on hover or click
 * - Providing contextual actions or menus
 * - Showing help text or tooltips for UI elements
 * - Creating interactive overlays without blocking the entire interface
 *
 * ## Design System Category
 * Overlay / Interactive Components
 *
 * ## Prerequisites
 * - Requires Radix UI Popover primitives
 * - Uses custom Tailwind animations from the design system
 * - Supports multiple positioning and animation options
 *
 * ## Import & Quick Start
 *
 * ```jsx
 * import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
 *
 * // Basic usage
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <button>Trigger Popover</button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>This is the popover content</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */

export default {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible popover component for displaying contextual overlays with various positioning and animation options.",
      },
    },
  },
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Whether the popover is currently open",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Function called when popover opens or closes",
    },
    modal: {
      control: { type: "boolean" },
      description:
        "Whether the popover should be modal (blocks interaction with outside)",
    },
  },
};

/**
 * ## Default Popover
 *
 * Basic popover with default positioning and animations.
 *
 * ### When to Use
 * - Simple information displays
 * - Contextual help text
 * - Basic interactive overlays
 */
export const Default = {
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Popover {...args}>
        <PopoverTrigger asChild>
          <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            Open Popover
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Popover Content</h4>
            <p className="text-muted-foreground text-sm">
              This is a basic popover with default settings and animations.
            </p>
          </div>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  ),
  args: {
    open: undefined,
    modal: false,
  },
};

/**
 * ## Popover with Close Button
 *
 * Popover with an explicit close button for better user control.
 *
 * ### When to Use
 * - Popovers that might be open for extended periods
 * - When users need clear dismissal options
 * - Complex popover content
 */
export const WithCloseButton = {
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Popover {...args}>
        <PopoverTrigger asChild>
          <button className="rounded-md bg-secondary-600 px-4 py-2 text-white hover:bg-secondary-700">
            Popover with Close
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="font-medium leading-none">Dismissable Popover</h4>
              <p className="text-muted-foreground text-sm">
                This popover can be closed using the close button.
              </p>
            </div>
            <PopoverClose asChild>
              <button className="hover:bg-muted rounded-md p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </PopoverClose>
          </div>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  ),
  args: {
    modal: false,
  },
};

/**
 * ## Interactive Content Popover
 *
 * Popover containing interactive elements like buttons and links.
 *
 * ### When to Use
 * - Action menus and toolbars
 * - Quick settings panels
 * - Interactive form elements
 */
export const InteractiveContent = {
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Popover {...args}>
        <PopoverTrigger asChild>
          <button className="rounded-md bg-success-600 px-4 py-2 text-white hover:bg-success-700">
            Actions Menu
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Quick Actions</h4>
            <div className="flex flex-col space-y-2">
              <button className="bg-muted hover:bg-muted/80 w-full rounded-md p-2 text-left">
                Edit Item
              </button>
              <button className="bg-muted hover:bg-muted/80 w-full rounded-md p-2 text-left">
                Duplicate
              </button>
              <button className="bg-destructive/10 text-destructive hover:bg-destructive/20 w-full rounded-md p-2 text-left">
                Delete
              </button>
            </div>
          </div>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  ),
  args: {
    modal: false,
  },
};

/**
 * ## Modal Popover
 *
 * Modal popover that blocks interaction with outside elements.
 *
 * ### When to Use
 * - Critical confirmations
 * - Important settings that require focus
 * - When user should not be distracted
 */
export const ModalPopover = {
  render: (args) => (
    <div className="flex h-64 items-center justify-center space-x-4">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          Try clicking outside the modal popover - it won't close!
        </p>
        <button className="rounded border px-3 py-1 text-sm">
          Outside Button (disabled when popover open)
        </button>
      </div>
      <Popover {...args}>
        <PopoverTrigger asChild>
          <button className="rounded-md bg-warning-600 px-4 py-2 text-white hover:bg-warning-700">
            Modal Popover
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Modal Content</h4>
            <p className="text-muted-foreground text-sm">
              This is a modal popover. You must interact with it before
              continuing.
            </p>
          </div>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  ),
  args: {
    modal: true,
  },
};

/**
 * ## Form Elements Popover
 *
 * Popover containing form inputs and controls.
 *
 * ### When to Use
 * - Quick settings adjustments
 * - Inline forms and filters
 * - Configuration panels
 */
export const FormElements = {
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Popover {...args}>
        <PopoverTrigger asChild>
          <button className="bg-info-600 hover:bg-info-700 rounded-md px-4 py-2 text-white">
            Settings
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Quick Settings</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Name</label>
                <input
                  className="w-full rounded-md border px-2 py-1 text-sm"
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border px-2 py-1 text-sm"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="newsletter" className="rounded" />
                <label htmlFor="newsletter" className="text-sm">
                  Subscribe to newsletter
                </label>
              </div>
            </div>
          </div>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  ),
  args: {
    modal: false,
  },
};

/**
 * ## Custom Styled Popover
 *
 * Popover with custom styling and branding.
 *
 * ### When to Use
 * - Branded overlays and menus
 * - Custom-themed components
 * - Design system variations
 */
export const CustomStyled = {
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Popover {...args}>
        <PopoverTrigger asChild>
          <button className="rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white hover:from-purple-700 hover:to-pink-700">
            Custom Styled
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
              <div>
                <h4 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-medium text-transparent">
                  Custom Design
                </h4>
                <p className="text-muted-foreground text-xs">
                  Branded popover experience
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="rounded-md bg-purple-100 px-3 py-1 text-xs text-purple-700 hover:bg-purple-200">
                Action 1
              </button>
              <button className="rounded-md bg-pink-100 px-3 py-1 text-xs text-pink-700 hover:bg-pink-200">
                Action 2
              </button>
            </div>
          </div>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  ),
  args: {
    modal: false,
  },
};

/**
 * ## Interactive Playground
 *
 * Customize all popover properties and see live updates.
 *
 * ### Props Documentation
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `open` | `boolean` | `undefined` | No | Controlled open state |
 * | `onOpenChange` | `function` | - | No | Called when open state changes |
 * | `modal` | `boolean` | `false` | No | Whether popover is modal |
 * | `defaultOpen` | `boolean` | `false` | No | Uncontrolled open state |
 *
 * ### Sub-components:
 *
 * **PopoverTrigger**: Wraps the element that triggers the popover
 * - `asChild`: boolean - Whether to render as child element
 *
 * **PopoverContent**: The popover content container
 * - `className`: string - Additional CSS classes
 * - `sideOffset`: number - Distance from trigger element
 * - Supports all Radix UI content props
 *
 * **PopoverClose**: Button that closes the popover
 * - `asChild`: boolean - Whether to render as child element
 *
 * **PopoverArrow**: Visual arrow pointing to trigger
 * - No props - uses default styling
 *
 * ### Accessibility Features
 * - Full keyboard navigation support
 * - ARIA attributes handled by Radix UI
 * - Focus management and trapping (for modal popovers)
 * - Screen reader compatibility
 * - Proper semantic HTML structure
 *
 * ### Best Practices
 * ✅ **DO**: Use clear trigger text that indicates what the popover contains
 * ✅ **DO**: Provide clear dismissal methods (close button, outside click)
 * ✅ **DO**: Consider modal behavior for critical interactions
 * ✅ **DO**: Test keyboard navigation and screen readers
 * ❌ **DON'T**: Use popovers for critical information that might be missed
 * ❌ **DON'T**: Place popovers where they might obscure important content
 * ❌ **DON'T**: Use very large popover content that might overwhelm users
 * ❌ **DON'T**: Forget to handle both controlled and uncontrolled states
 *
 * ### Animation Features
 * - Custom slide animations based on popover position
 * - Smooth fade in/out transitions
 * - Anti-glitch fixes for transform-based animations
 * - Customizable through Tailwind classes
 */
export const Playground = {
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            Customizable Popover
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Interactive Popover</h4>
            <p className="text-muted-foreground text-sm">
              This popover demonstrates customizable properties. Try adjusting
              the controls.
            </p>
            <div className="text-muted-foreground text-xs">
              Modal: {args.modal ? "Yes" : "No"} | Open:{" "}
              {args.open !== undefined
                ? args.open
                  ? "Yes"
                  : "No"
                : "Uncontrolled"}
            </div>
          </div>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  ),
  args: {
    open: undefined,
    modal: false,
  },
};
