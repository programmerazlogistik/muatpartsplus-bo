import { NotificationDot } from "@muatmuat/ui/NotificationDot";

export default {
  title: "Components/NotificationDot",
  component: NotificationDot,
  parameters: {
    docs: {
      description: {
        component:
          "A notification dot component for displaying small indicators with various sizes, colors, and animation options.",
      },
    },
    layout: "centered",
  },
};

export const Sizes = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="text-center">
        <NotificationDot size="xs" {...args} />
        <p className="mt-2 text-xs text-neutral-600">XS</p>
      </div>
      <div className="text-center">
        <NotificationDot size="sm" {...args} />
        <p className="mt-2 text-xs text-neutral-600">SM</p>
      </div>
      <div className="text-center">
        <NotificationDot size="md" {...args} />
        <p className="mt-2 text-xs text-neutral-600">MD</p>
      </div>
      <div className="text-center">
        <NotificationDot size="lg" {...args} />
        <p className="mt-2 text-xs text-neutral-600">LG</p>
      </div>
      <div className="text-center">
        <NotificationDot size="xl" {...args} />
        <p className="mt-2 text-xs text-neutral-600">XL</p>
      </div>
    </div>
  ),
  args: {
    animated: true,
    color: "red",
  },
  parameters: {
    docs: {
      description: {
        story: "All available sizes of the notification dot component.",
      },
    },
  },
};

export const Colors = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="text-center">
        <NotificationDot color="red" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Red</p>
      </div>
      <div className="text-center">
        <NotificationDot color="green" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Green</p>
      </div>
      <div className="text-center">
        <NotificationDot color="blue" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Blue</p>
      </div>
      <div className="text-center">
        <NotificationDot color="yellow" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Yellow</p>
      </div>
      <div className="text-center">
        <NotificationDot color="orange" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Orange</p>
      </div>
      <div className="text-center">
        <NotificationDot color="purple" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Purple</p>
      </div>
      <div className="text-center">
        <NotificationDot color="gray" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Gray</p>
      </div>
      <div className="text-center">
        <NotificationDot color="primary" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Primary</p>
      </div>
      <div className="text-center">
        <NotificationDot color="success" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Success</p>
      </div>
      <div className="text-center">
        <NotificationDot color="warning" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Warning</p>
      </div>
      <div className="text-center">
        <NotificationDot color="error" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Error</p>
      </div>
    </div>
  ),
  args: {
    animated: true,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "All available colors of the notification dot component.",
      },
    },
  },
};

export const AnimationStates = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-8">
      <div className="text-center">
        <NotificationDot animated={true} {...args} />
        <p className="mt-2 text-xs text-neutral-600">Animated</p>
      </div>
      <div className="text-center">
        <NotificationDot animated={false} {...args} />
        <p className="mt-2 text-xs text-neutral-600">Static</p>
      </div>
    </div>
  ),
  args: {
    size: "lg",
    color: "red",
  },
  parameters: {
    docs: {
      description: {
        story: "Animation states of the notification dot component.",
      },
    },
  },
};

export const Positioning = {
  render: (args) => (
    <div className="space-y-8">
      <div className="relative inline-block">
        <div className="h-12 w-12 rounded bg-neutral-200" />
        <NotificationDot
          position="absolute"
          positionClasses="top-0 right-0"
          {...args}
        />
        <p className="mt-2 text-xs text-neutral-600">Top Right (Absolute)</p>
      </div>

      <div className="relative inline-block">
        <div className="h-12 w-12 rounded bg-neutral-200" />
        <NotificationDot
          position="absolute"
          positionClasses="bottom-0 left-0"
          {...args}
        />
        <p className="mt-2 text-xs text-neutral-600">Bottom Left (Absolute)</p>
      </div>

      <div className="inline-block">
        <NotificationDot position="relative" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Relative</p>
      </div>
    </div>
  ),
  args: {
    animated: true,
    size: "md",
    color: "red",
  },
  parameters: {
    docs: {
      description: {
        story: "Different positioning options for the notification dot.",
      },
    },
  },
};

export const RealWorldExamples = {
  render: (args) => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
            <span className="text-primary-700">📧</span>
          </div>
          <NotificationDot
            position="absolute"
            positionClasses="top-0 right-0"
            color="red"
            {...args}
          />
        </div>
        <span>Email with new message</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-100">
            <span className="text-warning-700">🔔</span>
          </div>
          <NotificationDot
            position="absolute"
            positionClasses="top-0 right-0"
            color="warning"
            {...args}
          />
        </div>
        <span>Notification with warning</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-100">
            <span className="text-success-700">✓</span>
          </div>
          <NotificationDot
            position="absolute"
            positionClasses="top-0 right-0"
            color="success"
            {...args}
          />
        </div>
        <span>Task completed</span>
      </div>
    </div>
  ),
  args: {
    animated: true,
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world usage examples of the notification dot.",
      },
    },
  },
};

export const Playground = {
  render: (args) => (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white p-6">
        <NotificationDot {...args} />
      </div>
      <div className="text-sm text-neutral-600">
        <p>Position: {args.position}</p>
        <p>Position Classes: {args.positionClasses || "none"}</p>
        <p>Size: {args.size}</p>
        <p>Color: {args.color}</p>
        <p>Animated: {args.animated ? "Yes" : "No"}</p>
      </div>
    </div>
  ),
  args: {
    animated: true,
    size: "sm",
    color: "red",
    position: "relative",
    positionClasses: "",
    className: "",
  },
  argTypes: {
    animated: {
      control: "boolean",
      description: "Whether to show the pulsing animation",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the dot",
    },
    color: {
      control: "select",
      options: [
        "red",
        "green",
        "blue",
        "yellow",
        "orange",
        "purple",
        "gray",
        "primary",
        "success",
        "warning",
        "error",
      ],
      description: "Color of the dot",
    },
    position: {
      control: "select",
      options: ["absolute", "relative", "fixed"],
      description: "Position type",
    },
    positionClasses: {
      control: "text",
      description: "Position classes like 'top-0 right-0'",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all NotificationDot properties.",
      },
    },
  },
};
