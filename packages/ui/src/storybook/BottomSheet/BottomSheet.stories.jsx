import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@muatmuat/ui/BottomSheet";

export default {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: {
    docs: {
      description: {
        component: `
# 📱 BottomSheet

A responsive, accessible bottom sheet component built on top of Vaul. Perfect for mobile-first interfaces and progressive disclosure of content. Features smooth animations, gesture support, and automatic focus management.

## When to Use

- **Mobile interfaces** where space is limited
- **Progressive disclosure** of content without full page navigation
- **Forms and settings** that need contextual display
- **Action sheets** for user choices and confirmations
- **Information displays** that support the main content
- **Filtering and sorting** controls for data tables

## Key Features

- 🎨 **Smooth animations** - Native-feeling slide-up transitions
- 👆 **Gesture support** - Swipe down to dismiss, drag handle for control
- ♿ **Accessibility-first** - ARIA support, focus management, keyboard navigation
- 📱 **Mobile optimized** - Max height 75% of viewport, responsive design
- 🎯 **Portal rendering** - Rendered outside DOM hierarchy for proper layering
- 🔧 **Composable API** - Mix and match components for different layouts
- 🎪 **Stack integration** - Works with stacking manager for multiple modals
- 🎭 **Backdrop handling** - Automatic overlay with click-to-dismiss

## Design System Category

Layout / Modal Components

## Import

\`\`\`javascript
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@muatmuat/ui/BottomSheet";
\`\`\`

## Basic Usage

\`\`\`jsx
<BottomSheet>
  <BottomSheetTrigger asChild>
    <button>Open Bottom Sheet</button>
  </BottomSheetTrigger>
  <BottomSheetContent>
    <BottomSheetHeader>
      <BottomSheetTitle>Sheet Title</BottomSheetTitle>
      <BottomSheetClose />
    </BottomSheetHeader>
    <div className="p-4">
      Your content here...
    </div>
  </BottomSheetContent>
</BottomSheet>
\`\`\`

## Component Architecture

The BottomSheet is composed of several sub-components:

- **BottomSheet**: Root component providing context
- **BottomSheetTrigger**: Element that opens the sheet
- **BottomSheetContent**: Main container with backdrop
- **BottomSheetHeader**: Header area with title and close button
- **BottomSheetTitle**: Accessible title component
- **BottomSheetClose**: Pre-styled close button
- **BottomSheetFooter**: Footer area for actions
        `,
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    // These are handled by the individual sub-components
    // Main BottomSheet component just provides context
  },
};

// ============================================================================
// Basic Examples
// ============================================================================

export const Default = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-white">
            Open Bottom Sheet
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Welcome to Bottom Sheet</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="flex-1 p-4">
            <p className="text-neutral-600">
              This is a basic bottom sheet with a title, close button, and some
              content. You can swipe down or click the backdrop to dismiss it.
            </p>
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic bottom sheet with standard header, title, close button, and content area.",
      },
    },
  },
};

// ============================================================================
// Content Variations
// ============================================================================

export const WithFormContent = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
            Edit Profile
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Edit Your Profile</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="flex-1 space-y-4 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full rounded border border-neutral-300 px-3 py-2"
                placeholder="Enter your full name"
                defaultValue="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded border border-neutral-300 px-3 py-2"
                placeholder="Enter your email"
                defaultValue="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea
                className="w-full rounded border border-neutral-300 px-3 py-2"
                rows={3}
                placeholder="Tell us about yourself"
                defaultValue="Software developer passionate about creating great user experiences."
              />
            </div>
          </div>
          <BottomSheetFooter>
            <div className="flex gap-3">
              <BottomSheetClose asChild>
                <button className="flex-1 rounded-lg border border-neutral-300 py-2 hover:bg-neutral-50">
                  Cancel
                </button>
              </BottomSheetClose>
              <button className="bg-primary-600 hover:bg-primary-700 flex-1 rounded-lg py-2 text-white">
                Save Changes
              </button>
            </div>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Bottom sheet containing a form with multiple inputs and action buttons in the footer.",
      },
    },
  },
};

export const WithListContent = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="bg-secondary-600 hover:bg-secondary-700 rounded-lg px-4 py-2 text-white">
            Select Option
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Choose Your Plan</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="flex-1 p-4">
            <div className="space-y-3">
              {[
                {
                  name: "Basic",
                  price: "$9/month",
                  features: "Up to 10 projects",
                },
                {
                  name: "Pro",
                  price: "$29/month",
                  features: "Unlimited projects, Priority support",
                },
                {
                  name: "Enterprise",
                  price: "$99/month",
                  features: "Custom integrations, Dedicated support",
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className="cursor-pointer rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{plan.name}</h3>
                      <p className="text-sm text-neutral-600">
                        {plan.features}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-600 font-semibold">
                        {plan.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Bottom sheet displaying a list of selectable options, perfect for choice scenarios.",
      },
    },
  },
};

export const WithScrollableContent = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="rounded-lg bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-900">
            View Terms
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Terms and Conditions</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4 text-sm text-neutral-700">
              <section>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing and using this service, you accept and agree to
                  be bound by the terms and provision of this agreement. If you
                  do not agree to abide by the above, please do not use this
                  service.
                </p>
              </section>

              <section>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  2. Use License
                </h3>
                <p>
                  Permission is granted to temporarily download one copy of the
                  materials on our website for personal, non-commercial
                  transitory viewing only. This is the grant of a license, not a
                  transfer of title.
                </p>
              </section>

              <section>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  3. Disclaimer
                </h3>
                <p>
                  The materials on our website are provided on an 'as is' basis.
                  We make no warranties, expressed or implied, and hereby
                  disclaim and negate all other warranties including without
                  limitation.
                </p>
              </section>

              <section>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  4. Limitations
                </h3>
                <p>
                  In no event shall our company or its suppliers be liable for
                  any damages (including, without limitation, damages for loss
                  of data or profit, or due to business interruption) arising
                  out of the use or inability to use the materials.
                </p>
              </section>

              <section>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  5. Accuracy of Materials
                </h3>
                <p>
                  The materials appearing on our website could include
                  technical, typographical, or photographic errors. We do not
                  warrant that any of the materials on its website are accurate,
                  complete, or current.
                </p>
              </section>

              <section>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  6. Links
                </h3>
                <p>
                  We have not reviewed all of the sites linked to our website
                  and are not responsible for the contents of any such linked
                  site. The inclusion of any link does not imply endorsement by
                  us of the site.
                </p>
              </section>
            </div>
          </div>
          <BottomSheetFooter>
            <BottomSheetClose asChild>
              <button className="bg-primary-600 hover:bg-primary-700 w-full rounded-lg py-2 text-white">
                I Understand
              </button>
            </BottomSheetClose>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Bottom sheet with scrollable content that exceeds the viewport height, demonstrating overflow behavior.",
      },
    },
  },
};

// ============================================================================
// Layout Variations
// ============================================================================

export const MinimalLayout = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="bg-success-600 hover:bg-success-700 rounded-lg px-4 py-2 text-white">
            Quick Action
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <div className="p-6 text-center">
            <h2 className="mb-3 text-lg font-semibold">Confirm Action</h2>
            <p className="mb-6 text-neutral-600">
              Are you sure you want to proceed with this action?
            </p>
            <div className="flex gap-3">
              <BottomSheetClose asChild>
                <button className="flex-1 rounded-lg border border-neutral-300 py-2 hover:bg-neutral-50">
                  Cancel
                </button>
              </BottomSheetClose>
              <button className="bg-error-600 hover:bg-error-700 flex-1 rounded-lg py-2 text-white">
                Confirm
              </button>
            </div>
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Minimal bottom sheet without header/footer components for simple confirmations or quick actions.",
      },
    },
  },
};

export const HeaderOnly = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="bg-warning-600 hover:bg-warning-700 rounded-lg px-4 py-2 text-white">
            Show Notification
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>System Notification</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="p-4 pb-6">
            <div className="bg-warning-50 border-warning-200 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="bg-warning-400 mt-0.5 h-5 w-5 rounded-full"></div>
                <div>
                  <h3 className="text-warning-800 font-medium">
                    Maintenance Scheduled
                  </h3>
                  <p className="text-warning-700 mt-1 text-sm">
                    System maintenance is scheduled for tonight from 2:00 AM to
                    4:00 AM EST. Some features may be temporarily unavailable
                    during this time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Bottom sheet with header and content, but no footer. Good for notifications or informational content.",
      },
    },
  },
};

// ============================================================================
// Interactive Examples
// ============================================================================

export const ActionSheet = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
            More Actions
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Choose an Action</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="p-4">
            <div className="space-y-2">
              {[
                {
                  label: "Share",
                  icon: "📤",
                  description: "Share with others",
                },
                { label: "Edit", icon: "✏️", description: "Make changes" },
                {
                  label: "Duplicate",
                  icon: "📋",
                  description: "Create a copy",
                },
                {
                  label: "Archive",
                  icon: "📦",
                  description: "Move to archive",
                },
                {
                  label: "Delete",
                  icon: "🗑️",
                  description: "Remove permanently",
                  danger: true,
                },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`w-full rounded-lg p-3 text-left transition-colors ${
                    action.danger
                      ? "hover:bg-error-50 text-error-700"
                      : "hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{action.icon}</span>
                    <div>
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm text-neutral-500">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Action sheet pattern with a list of actions the user can take, including destructive actions.",
      },
    },
  },
};

// ============================================================================
// Best Practices Examples
// ============================================================================

export const BestPracticesExample = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="rounded-lg border border-neutral-200 p-4">
        <h2 className="mb-4 text-lg font-semibold">Best Practices Example</h2>

        <div className="space-y-4">
          <div className="text-sm">
            <h3 className="text-success-700 mb-2 font-medium">
              ✅ DO: Use for Progressive Disclosure
            </h3>
            <p className="mb-3 text-neutral-600">
              Bottom sheets are perfect for showing additional options without
              leaving the current context.
            </p>
            <BottomSheet>
              <BottomSheetTrigger asChild>
                <button className="text-primary-600 text-sm underline">
                  See filtering options
                </button>
              </BottomSheetTrigger>
              <BottomSheetContent>
                <BottomSheetHeader>
                  <BottomSheetTitle>Filter Results</BottomSheetTitle>
                  <BottomSheetClose />
                </BottomSheetHeader>
                <div className="space-y-4 p-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Category
                    </label>
                    <select className="w-full rounded border border-neutral-300 px-3 py-2">
                      <option>All Categories</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Books</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Price Range
                    </label>
                    <input type="range" className="w-full" min="0" max="1000" />
                  </div>
                </div>
                <BottomSheetFooter>
                  <div className="flex gap-3">
                    <BottomSheetClose asChild>
                      <button className="flex-1 rounded border border-neutral-300 py-2">
                        Clear
                      </button>
                    </BottomSheetClose>
                    <button className="bg-primary-600 flex-1 rounded py-2 text-white">
                      Apply Filters
                    </button>
                  </div>
                </BottomSheetFooter>
              </BottomSheetContent>
            </BottomSheet>
          </div>

          <div className="text-sm">
            <h3 className="text-error-700 mb-2 font-medium">
              ❌ DON'T: Use for Primary Navigation
            </h3>
            <p className="text-neutral-600">
              Bottom sheets shouldn't replace main navigation or be used for
              critical user flows. Use proper navigation components instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates best practices for using bottom sheets effectively in user interfaces.",
      },
    },
  },
};

// ============================================================================
// Accessibility Example
// ============================================================================

export const AccessibilityExample = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-describedby="bottom-sheet-trigger-description"
          >
            Accessible Bottom Sheet
          </button>
        </BottomSheetTrigger>
        <div id="bottom-sheet-trigger-description" className="sr-only">
          Opens a modal dialog with accessibility features
        </div>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Accessibility Features</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="flex-1 p-4">
            <div className="space-y-3 text-sm">
              <div className="bg-success-50 border-success-200 rounded-lg border p-3">
                <h4 className="text-success-800 font-medium">
                  ✅ Accessibility Features
                </h4>
                <ul className="text-success-700 mt-2 space-y-1">
                  <li>• Automatic focus management</li>
                  <li>• Keyboard navigation (Escape to close)</li>
                  <li>• Screen reader announcements</li>
                  <li>• ARIA labels and descriptions</li>
                  <li>• Focus trapping within modal</li>
                  <li>• Color contrast compliance</li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="accessible-input"
                  className="mb-1 block font-medium"
                >
                  Accessible Form Field
                </label>
                <input
                  id="accessible-input"
                  type="text"
                  className="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-1"
                  placeholder="Type something..."
                  aria-describedby="input-help"
                />
                <div id="input-help" className="mt-1 text-xs text-neutral-600">
                  This input demonstrates proper labeling and focus styles
                </div>
              </div>
            </div>
          </div>
          <BottomSheetFooter>
            <BottomSheetClose asChild>
              <button className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 w-full rounded-lg py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                Close (Escape key also works)
              </button>
            </BottomSheetClose>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates accessibility features including focus management, keyboard navigation, and proper ARIA attributes.",
      },
    },
  },
};

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-white">
            Open Playground
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Interactive Playground</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="flex-1 p-4">
            <p className="text-neutral-600">
              Experiment with the bottom sheet by interacting with it in
              different ways:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>• Try swiping down to dismiss</li>
              <li>• Click the backdrop to close</li>
              <li>• Use the close button</li>
              <li>• Press Escape key</li>
              <li>• Tab through focusable elements</li>
            </ul>
          </div>
          <BottomSheetFooter>
            <BottomSheetClose asChild>
              <button className="w-full rounded-lg border border-neutral-300 py-2 hover:bg-neutral-50">
                Close Playground
              </button>
            </BottomSheetClose>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all bottom sheet behaviors and interactions.",
      },
    },
  },
};
