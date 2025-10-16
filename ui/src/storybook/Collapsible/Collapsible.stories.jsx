import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@muatmuat/ui/Collapsible";

export default {
  title: "Components/Collapsible",
  component: Collapsible,
  subcomponents: { CollapsibleTrigger, CollapsibleContent },
  parameters: {
    docs: {
      description: {
        component:
          "A collapsible component that can show/hide content with smooth animations. Built on Radix UI for accessibility and keyboard navigation.",
      },
    },
  },
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Whether the collapsible is open by default",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
      table: {
        type: { summary: "boolean" },
      },
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Callback when open state changes",
      table: {
        type: { summary: "function" },
      },
    },
    children: {
      control: false,
      description: "CollapsibleTrigger and CollapsibleContent components",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export const Default = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>What is a collapsible component?</CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        <p className="text-neutral-600">
          A collapsible component allows users to show or hide content with a
          smooth animation. It's perfect for FAQs, expandable sections, and
          content that users might not need to see immediately.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Playground = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Try me! Click to toggle</CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        <div className="space-y-4">
          <h4 className="font-medium">This is collapsible content!</h4>
          <p className="text-neutral-600">
            You can put any content here - text, images, forms, or even other
            components.
          </p>
          <div className="flex gap-2">
            <button className="bg-primary rounded px-3 py-1 text-sm text-white">
              Action 1
            </button>
            <button className="bg-secondary rounded px-3 py-1 text-sm text-white">
              Action 2
            </button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const WithIcon = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>
        {({ open }) => (
          <div className="flex items-center gap-2">
            <svg
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span>Settings Panel</span>
          </div>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        <div className="space-y-4 rounded bg-neutral-50 p-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Notification Settings
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Email notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Push notifications</span>
              </label>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Theme</label>
            <select className="w-full rounded border px-3 py-2 text-sm">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled = {
  args: {
    open: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.open);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary rounded px-3 py-1 text-sm text-white"
          >
            Open
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-secondary rounded px-3 py-1 text-sm text-white"
          >
            Close
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded bg-neutral-600 px-3 py-1 text-sm text-white"
          >
            Toggle
          </button>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger>
            Controlled Collapsible (Currently: {isOpen ? "Open" : "Closed"})
          </CollapsibleTrigger>
          <CollapsibleContent className="py-4">
            <p className="text-neutral-600">
              This collapsible is controlled by the external buttons above. The
              state is managed by React useState.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const NestedCollapsibles = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Parent Section</CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        <div className="space-y-3 border-l-2 border-neutral-200 pl-4">
          <p className="mb-3 text-sm text-neutral-600">
            This is parent content with nested collapsibles:
          </p>

          <Collapsible>
            <CollapsibleTrigger className="py-2 text-sm">
              Nested Item 1
            </CollapsibleTrigger>
            <CollapsibleContent className="py-2 pl-4">
              <p className="text-xs text-neutral-500">Nested content 1</p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="py-2 text-sm">
              Nested Item 2
            </CollapsibleTrigger>
            <CollapsibleContent className="py-2 pl-4">
              <p className="text-xs text-neutral-500">Nested content 2</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const FAQExample = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <div className="max-w-md space-y-2">
      <h3 className="mb-4 text-lg font-semibold">Frequently Asked Questions</h3>

      <Collapsible {...args}>
        <CollapsibleTrigger className="text-left">
          How do I reset my password?
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3">
          <p className="text-sm text-neutral-600">
            Click on the "Forgot Password" link on the login page and follow the
            instructions sent to your email.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="text-left">
          What payment methods do you accept?
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3">
          <p className="text-sm text-neutral-600">
            We accept all major credit cards, PayPal, and bank transfers.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="text-left">
          How can I contact support?
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3">
          <p className="text-sm text-neutral-600">
            You can reach our support team 24/7 through the in-app chat or by
            emailing support@example.com.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const WithLongContent = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Read More (Long Content Example)</CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        <div className="space-y-4 text-sm text-neutral-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const AccessibilityDemo = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm">
        <p className="mb-1 font-medium text-blue-800">
          ♿ Accessibility Features:
        </p>
        <ul className="space-y-1 text-blue-700">
          <li>• Full keyboard navigation support</li>
          <li>• Proper ARIA attributes</li>
          <li>• Screen reader compatibility</li>
          <li>• Focus management</li>
        </ul>
      </div>

      <Collapsible {...args}>
        <CollapsibleTrigger>Accessible Collapsible Demo</CollapsibleTrigger>
        <CollapsibleContent className="py-4">
          <div className="space-y-3">
            <p className="text-sm text-neutral-600">
              Try using keyboard navigation:
            </p>
            <ul className="ml-4 space-y-1 text-sm text-neutral-600">
              <li>• Tab to focus the trigger</li>
              <li>• Enter or Space to toggle</li>
              <li>• Screen readers will announce state changes</li>
            </ul>
            <div className="rounded bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">
                This collapsible uses Radix UI primitives which ensure full
                accessibility compliance with WCAG 2.1 guidelines.
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
