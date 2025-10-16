import { AlertCircle, HelpCircle, Info } from "lucide-react";

import { Button } from "@muatmuat/ui/Button";
import { InfoTooltip } from "@muatmuat/ui/Tooltip";

export default {
  title: "Components/Tooltip",
  component: InfoTooltip,
  parameters: {
    docs: {
      description: {
        component:
          "An accessible tooltip component built on Radix UI primitives. Perfect for providing additional context, help text, or information on hover/focus.",
      },
    },
    layout: "centered",
  },
};

export const Default = {
  render: (args) => (
    <div className="p-8">
      <InfoTooltip {...args}>
        This is a helpful tooltip that appears when you hover over the info
        icon.
      </InfoTooltip>
    </div>
  ),
  args: {
    side: "top",
    align: "center",
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Basic tooltip with default info icon and simple text content.",
      },
    },
  },
};

export const Positions = {
  render: (args) => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="text-center">
        <p className="mb-4 text-sm text-neutral-600">Top</p>
        <InfoTooltip side="top" {...args}>
          This tooltip appears above the trigger element.
        </InfoTooltip>
      </div>

      <div className="text-center">
        <p className="mb-4 text-sm text-neutral-600">Bottom</p>
        <InfoTooltip side="bottom" {...args}>
          This tooltip appears below the trigger element.
        </InfoTooltip>
      </div>

      <div className="text-center">
        <p className="mb-4 text-sm text-neutral-600">Left</p>
        <InfoTooltip side="left" {...args}>
          This tooltip appears to the left of the trigger element.
        </InfoTooltip>
      </div>

      <div className="text-center">
        <p className="mb-4 text-sm text-neutral-600">Right</p>
        <InfoTooltip side="right" {...args}>
          This tooltip appears to the right of the trigger element.
        </InfoTooltip>
      </div>
    </div>
  ),
  args: {
    align: "center",
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Different positioning options for the tooltip.",
      },
    },
  },
};

export const Alignments = {
  render: (args) => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="text-center">
        <p className="mb-4 text-sm text-neutral-600">Start</p>
        <InfoTooltip side="top" align="start" {...args}>
          This tooltip is aligned to the start of the trigger element.
        </InfoTooltip>
      </div>

      <div className="text-center">
        <p className="mb-4 text-sm text-neutral-600">Center</p>
        <InfoTooltip side="top" align="center" {...args}>
          This tooltip is centered relative to the trigger element.
        </InfoTooltip>
      </div>

      <div className="text-center">
        <p className="mb-4 text-sm text-neutral-600">End</p>
        <InfoTooltip side="top" align="end" {...args}>
          This tooltip is aligned to the end of the trigger element.
        </InfoTooltip>
      </div>
    </div>
  ),
  args: {
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Different alignment options for the tooltip.",
      },
    },
  },
};

export const CustomIcons = {
  render: (args) => (
    <div className="flex flex-wrap gap-6 p-8">
      <div className="text-center">
        <p className="mb-2 text-sm text-neutral-600">Default Info</p>
        <InfoTooltip icon="/icons/info16.svg" {...args}>
          Default info icon tooltip.
        </InfoTooltip>
      </div>

      <div className="text-center">
        <p className="mb-2 text-sm text-neutral-600">Alert</p>
        <InfoTooltip icon="/icons/alert16.svg" {...args}>
          Alert icon for important information.
        </InfoTooltip>
      </div>

      <div className="text-center">
        <p className="mb-2 text-sm text-neutral-600">Question</p>
        <InfoTooltip icon="/icons/question16.svg" {...args}>
          Question mark icon for help text.
        </InfoTooltip>
      </div>

      <div className="text-center">
        <p className="mb-2 text-sm text-neutral-600">Warning</p>
        <InfoTooltip icon="/icons/warning16.svg" {...args}>
          Warning icon for cautionary information.
        </InfoTooltip>
      </div>
    </div>
  ),
  args: {
    side: "top",
    align: "center",
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Different icon options for the tooltip trigger.",
      },
    },
  },
};

export const CustomTriggers = {
  render: (args) => (
    <div className="flex flex-wrap gap-8 p-8">
      <div>
        <p className="mb-4 text-sm text-neutral-600">Button Trigger</p>
        <InfoTooltip
          trigger={
            <Button variant="outline" size="sm">
              Help
            </Button>
          }
          {...args}
        >
          This tooltip is triggered by a custom button element.
        </InfoTooltip>
      </div>

      <div>
        <p className="mb-4 text-sm text-neutral-600">Text Trigger</p>
        <InfoTooltip
          trigger={
            <span className="text-primary-700 cursor-pointer underline">
              Hover me
            </span>
          }
          {...args}
        >
          This tooltip is triggered by custom text content.
        </InfoTooltip>
      </div>

      <div>
        <p className="mb-4 text-sm text-neutral-600">Icon Trigger</p>
        <InfoTooltip
          trigger={
            <div className="bg-warning-100 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full">
              <AlertCircle className="text-warning-700 h-4 w-4" />
            </div>
          }
          {...args}
        >
          This tooltip is triggered by a custom icon component.
        </InfoTooltip>
      </div>
    </div>
  ),
  args: {
    side: "top",
    align: "center",
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Custom trigger elements for the tooltip.",
      },
    },
  },
};

export const RichContent = {
  render: (args) => (
    <div className="flex flex-wrap gap-8 p-8">
      <div>
        <p className="mb-4 text-sm text-neutral-600">HTML Content</p>
        <InfoTooltip
          render="<div><strong>Rich Content:</strong><br/>This tooltip contains <em>HTML</em> formatting including <code>code</code> and lists:<ul><li>Item 1</li><li>Item 2</li></ul></div>"
          {...args}
        />
      </div>

      <div>
        <p className="mb-4 text-sm text-neutral-600">JSX Content</p>
        <InfoTooltip {...args}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-success-500 h-3 w-3 rounded-full" />
              <span className="font-medium">Status: Active</span>
            </div>
            <div className="text-sm text-neutral-600">
              Last updated: 2 minutes ago
            </div>
            <div className="flex gap-2">
              <Button size="xs" variant="outline">
                View Details
              </Button>
              <Button size="xs">Edit</Button>
            </div>
          </div>
        </InfoTooltip>
      </div>
    </div>
  ),
  args: {
    side: "top",
    align: "center",
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Tooltips with rich HTML and JSX content.",
      },
    },
  },
};

export const CustomStyling = {
  render: (args) => (
    <div className="flex flex-wrap gap-8 p-8">
      <div>
        <p className="mb-4 text-sm text-neutral-600">Success Style</p>
        <InfoTooltip
          appearance={{
            iconClassName: "text-success-600",
          }}
          className="border-success-200 bg-success-50 text-success-800"
          {...args}
        >
          <div className="flex items-center gap-2">
            <div className="bg-success-500 h-2 w-2 rounded-full" />
            <span className="font-medium">Success!</span>
          </div>
          <p>Your action was completed successfully.</p>
        </InfoTooltip>
      </div>

      <div>
        <p className="mb-4 text-sm text-neutral-600">Warning Style</p>
        <InfoTooltip
          icon="/icons/warning16.svg"
          appearance={{
            iconClassName: "text-warning-600",
          }}
          className="border-warning-200 bg-warning-50 text-warning-800"
          {...args}
        >
          <div className="flex items-center gap-2">
            <div className="bg-warning-500 h-2 w-2 rounded-full" />
            <span className="font-medium">Warning</span>
          </div>
          <p>Please review your input before proceeding.</p>
        </InfoTooltip>
      </div>

      <div>
        <p className="mb-4 text-sm text-neutral-600">Error Style</p>
        <InfoTooltip
          icon="/icons/alert16.svg"
          appearance={{
            iconClassName: "text-error-600",
          }}
          className="border-error-200 bg-error-50 text-error-800"
          {...args}
        >
          <div className="flex items-center gap-2">
            <div className="bg-error-500 h-2 w-2 rounded-full" />
            <span className="font-medium">Error</span>
          </div>
          <p>Something went wrong. Please try again.</p>
        </InfoTooltip>
      </div>
    </div>
  ),
  args: {
    side: "top",
    align: "center",
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Custom styling options for different tooltip types.",
      },
    },
  },
};

export const RealWorldExamples = {
  render: (args) => (
    <div className="space-y-6 p-8">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">User Settings</h3>
          <InfoTooltip {...args}>
            Configure your account preferences, privacy settings, and
            notification options here.
          </InfoTooltip>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-medium">Email Notifications</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600">Enabled</span>
          <InfoTooltip icon="/icons/info16.svg" {...args}>
            Receive email updates about your account activity, security alerts,
            and important announcements.
          </InfoTooltip>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-medium">Two-Factor Authentication</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600">Not set up</span>
          <InfoTooltip
            icon="/icons/warning16.svg"
            appearance={{
              iconClassName: "text-warning-600",
            }}
            className="border-warning-200 bg-warning-50 text-warning-800"
            {...args}
          >
            <div className="space-y-2">
              <div className="font-medium">Security Recommendation</div>
              <p>
                Enable two-factor authentication to add an extra layer of
                security to your account.
              </p>
            </div>
          </InfoTooltip>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-medium">Data Export</span>
        <Button size="sm" variant="outline">
          Export Data
        </Button>
        <InfoTooltip
          trigger={
            <div className="h-4 w-4 cursor-pointer">
              <HelpCircle className="h-4 w-4 text-neutral-600" />
            </div>
          }
          {...args}
        >
          <div className="space-y-2">
            <div className="font-medium">Export Your Data</div>
            <p>
              Download all your account data in a structured format. This
              includes:
            </p>
            <ul className="ml-4 list-disc text-sm">
              <li>Profile information</li>
              <li>Activity history</li>
              <li>Settings and preferences</li>
            </ul>
            <p className="text-sm text-neutral-600">
              May take up to 24 hours to prepare.
            </p>
          </div>
        </InfoTooltip>
      </div>
    </div>
  ),
  args: {
    side: "top",
    align: "center",
    sideOffset: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world usage examples in forms and settings.",
      },
    },
  },
};

export const Playground = {
  render: (args) => (
    <div className="p-8">
      <div className="max-w-md space-y-4">
        <InfoTooltip {...args}>
          <div className="space-y-2">
            <div className="font-medium">Interactive Tooltip</div>
            <p>
              This is a configurable tooltip. Try changing the options below to
              see how it affects the appearance and behavior.
            </p>
            <div className="text-sm text-neutral-600">
              Side: {args.side}, Align: {args.align}, Offset: {args.sideOffset}
              px
            </div>
          </div>
        </InfoTooltip>
      </div>
    </div>
  ),
  args: {
    side: "top",
    align: "center",
    sideOffset: 8,
    icon: "/icons/info16.svg",
    appearance: {
      iconClassName: "text-neutral-600",
    },
    className: "",
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Side of the trigger element where tooltip appears",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the tooltip relative to the trigger",
    },
    sideOffset: {
      control: "number",
      description: "Distance in pixels from the trigger element",
    },
    icon: {
      control: "text",
      description: "Path to custom icon for default trigger",
    },
    "appearance.iconClassName": {
      control: "text",
      description: "Additional classes for the trigger icon",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the tooltip content",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all InfoTooltip properties.",
      },
    },
  },
};
