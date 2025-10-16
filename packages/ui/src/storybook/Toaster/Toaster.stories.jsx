/**
 * 🚨 Toaster Component Stories
 *
 * A dynamic toast notification system that displays success and error messages
 * with responsive positioning and smooth animations. The Toaster component
 * automatically manages toast state and positioning across mobile and desktop devices.
 */
import { Button } from "@muatmuat/ui/Button";
import { Toaster } from "@muatmuat/ui/Toaster";
import { toast } from "@muatmuat/ui/Toaster";

export default {
  title: "Components/Toaster",
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive toast notification system that displays success and error messages with smooth animations and accessibility support. Place once at your app root level to handle notifications throughout your application.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling individual toast items",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export const Default = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">Toast Demo</h2>
        <p className="text-neutral-600">
          Click the buttons below to trigger different types of toast
          notifications. The Toaster component handles positioning and
          animations automatically.
        </p>

        <div className="space-y-3">
          <Button
            variant="muattrans-primary"
            onClick={() => toast.success("Operation completed successfully!")}
            className="w-full"
          >
            Success Toast
          </Button>

          <Button
            variant="muattrans-error"
            onClick={() =>
              toast.error("Something went wrong! Please try again.")
            }
            className="w-full"
          >
            Error Toast
          </Button>

          <Button
            variant="muattrans-outline-primary"
            onClick={() => {
              toast.success("First success message");
              setTimeout(() => toast.error("Then an error message"), 200);
              setTimeout(() => toast.success("Finally another success"), 400);
            }}
            className="w-full"
          >
            Multiple Toasts (Staggered)
          </Button>
        </div>

        <div className="mt-6 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-600">
          <strong>Usage:</strong> Place &lt;Toaster /&gt; once at your app root
          level. Trigger toasts using <code>toast.success()</code> or{" "}
          <code>toast.error()</code> from anywhere in your app.
        </div>
      </div>

      <Toaster {...args} />
    </div>
  ),
};

export const WithCustomDuration = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Custom Duration
        </h2>
        <p className="text-neutral-600">
          Toasts auto-dismiss after 6 seconds by default, but you can customize
          the duration.
        </p>

        <div className="space-y-3">
          <Button
            variant="muattrans-primary"
            onClick={() => toast.success("Quick message (2 seconds)", 2000)}
            className="w-full"
          >
            Quick Toast (2s)
          </Button>

          <Button
            variant="muattrans-error"
            onClick={() => toast.error("Important error (10 seconds)", 10000)}
            className="w-full"
          >
            Long Duration Toast (10s)
          </Button>

          <Button
            variant="muattrans-primary-secondary"
            onClick={() => toast.success("Default duration (6 seconds)")}
            className="w-full"
          >
            Default Duration (6s)
          </Button>
        </div>
      </div>

      <Toaster {...args} />
    </div>
  ),
};

export const LongMessages = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Long Messages
        </h2>
        <p className="text-neutral-600">
          Messages automatically wrap within the toast container while
          maintaining readability.
        </p>

        <div className="space-y-3">
          <Button
            variant="muattrans-primary"
            onClick={() =>
              toast.success(
                "This is a very long success message that will wrap to multiple lines while maintaining good readability and proper spacing within the toast container. The layout remains clean and accessible."
              )
            }
            className="w-full"
          >
            Long Success Message
          </Button>

          <Button
            variant="muattrans-error"
            onClick={() =>
              toast.error(
                "This is a very long error message that explains what went wrong and provides helpful information about how the user can resolve the issue or contact support for assistance. All text remains readable."
              )
            }
            className="w-full"
          >
            Long Error Message
          </Button>
        </div>
      </div>

      <Toaster {...args} />
    </div>
  ),
};

export const ResponsiveDemo = {
  args: {},
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Responsive Positioning
        </h2>
        <p className="text-neutral-600">
          Resize your browser to see how toasts adapt to mobile and desktop
          layouts.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="font-medium text-neutral-900">Mobile Layout</h3>
            <p className="mb-3 text-sm text-neutral-600">
              Full width, positioned above footer
            </p>
            <Button
              variant="muattrans-primary"
              onClick={() => toast.success("Mobile-optimized positioning")}
              className="w-full"
            >
              Test Mobile Layout
            </Button>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="font-medium text-neutral-900">Desktop Layout</h3>
            <p className="mb-3 text-sm text-neutral-600">
              Fixed width (440px), bottom-right corner
            </p>
            <Button
              variant="muattrans-error"
              onClick={() => toast.error("Desktop-optimized positioning")}
              className="w-full"
            >
              Test Desktop Layout
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-neutral-200 p-4">
          <div className="text-sm text-neutral-600">
            <strong>Responsive Behavior:</strong>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>
                <strong>Mobile:</strong> Full width with padding, stacked
                vertically
              </li>
              <li>
                <strong>Desktop:</strong> Fixed 440px width, right-aligned in
                bottom corner
              </li>
              <li>
                <strong>Footer aware:</strong> Automatically adjusts position
                based on footer height
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Toaster {...args} />
    </div>
  ),
};

export const Playground = {
  args: {
    className: "",
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-900">
            Interactive Playground
          </h2>
          <p className="text-neutral-600">
            Test different toast scenarios and customize the component.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button
            variant="muattrans-primary"
            onClick={() => toast.success("Success!")}
            size="sm"
          >
            Success
          </Button>

          <Button
            variant="muattrans-error"
            onClick={() => toast.error("Error!")}
            size="sm"
          >
            Error
          </Button>

          <Button
            variant="muattrans-outline-primary"
            onClick={() => {
              for (let i = 0; i < 3; i++) {
                setTimeout(() => toast.success(`Message ${i + 1}`), i * 200);
              }
            }}
            size="sm"
          >
            Queue (3)
          </Button>

          <Button
            variant="muattrans-primary-secondary"
            onClick={() => toast.success("Extended duration", 8000)}
            size="sm"
          >
            Long (8s)
          </Button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-medium text-neutral-900">
            Real-world Examples
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Button
              variant="muattrans-primary"
              onClick={() => toast.success("Profile updated successfully!")}
              className="w-full justify-start text-left"
            >
              💾 Save Success
            </Button>

            <Button
              variant="muattrans-error"
              onClick={() =>
                toast.error("Failed to save changes. Please try again.")
              }
              className="w-full justify-start text-left"
            >
              ❌ Save Error
            </Button>

            <Button
              variant="muattrans-primary"
              onClick={() => toast.success("File uploaded successfully!")}
              className="w-full justify-start text-left"
            >
              📤 Upload Success
            </Button>

            <Button
              variant="muattrans-error"
              onClick={() =>
                toast.error("Network error. Check your connection.")
              }
              className="w-full justify-start text-left"
            >
              🌐 Network Error
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 p-4 text-sm text-neutral-600">
          <strong>Integration:</strong> Import <code>{"{ toast }"}</code> from{" "}
          <code>@muatmuat/ui/Toaster</code>
          and use <code>toast.success("message")</code> or{" "}
          <code>toast.error("message")</code> anywhere in your app.
        </div>
      </div>

      <Toaster {...args} />
    </div>
  ),
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling individual toast items",
    },
  },
};
