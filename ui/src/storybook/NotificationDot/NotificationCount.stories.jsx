import { NotificationCount } from "@muatmuat/ui/NotificationDot";

export default {
  title: "Components/NotificationCount",
  component: NotificationCount,
  parameters: {
    docs: {
      description: {
        component:
          "A notification count component for displaying numeric badges with various sizes, colors, and styles.",
      },
    },
    layout: "centered",
  },
};

export const Sizes = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="text-center">
        <NotificationCount count={5} size="xs" {...args} />
        <p className="mt-2 text-xs text-neutral-600">XS</p>
      </div>
      <div className="text-center">
        <NotificationCount count={5} size="sm" {...args} />
        <p className="mt-2 text-xs text-neutral-600">SM</p>
      </div>
      <div className="text-center">
        <NotificationCount count={5} size="md" {...args} />
        <p className="mt-2 text-xs text-neutral-600">MD</p>
      </div>
      <div className="text-center">
        <NotificationCount count={5} size="lg" {...args} />
        <p className="mt-2 text-xs text-neutral-600">LG</p>
      </div>
      <div className="text-center">
        <NotificationCount count={5} size="xl" {...args} />
        <p className="mt-2 text-xs text-neutral-600">XL</p>
      </div>
    </div>
  ),
  args: {
    animated: false,
    color: "white",
    backgroundColor: "red",
  },
  parameters: {
    docs: {
      description: {
        story: "All available sizes of the notification count component.",
      },
    },
  },
};

export const BackgroundColors = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="red" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Red</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="green" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Green</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="blue" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Blue</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="yellow" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Yellow</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="orange" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Orange</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="purple" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Purple</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="gray" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Gray</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="primary" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Primary</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="success" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Success</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="warning" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Warning</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} backgroundColor="error" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Error</p>
      </div>
    </div>
  ),
  args: {
    animated: false,
    size: "md",
    color: "white",
  },
  parameters: {
    docs: {
      description: {
        story:
          "All available background colors of the notification count component.",
      },
    },
  },
};

export const TextColors = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="text-center">
        <NotificationCount count={3} color="white" {...args} />
        <p className="mt-2 text-xs text-neutral-600">White</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} color="black" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Black</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} color="gray" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Gray</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} color="red" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Red</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} color="blue" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Blue</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} color="green" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Green</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} color="yellow" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Yellow</p>
      </div>
      <div className="text-center">
        <NotificationCount count={3} color="primary" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Primary</p>
      </div>
    </div>
  ),
  args: {
    animated: false,
    size: "md",
    backgroundColor: "blue",
  },
  parameters: {
    docs: {
      description: {
        story: "All available text colors of the notification count component.",
      },
    },
  },
};

export const Variants = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="text-center">
        <NotificationCount count={5} variant="default" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Default</p>
      </div>
      <div className="text-center">
        <NotificationCount count={5} variant="bordered" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Bordered</p>
      </div>
    </div>
  ),
  args: {
    animated: false,
    size: "md",
    color: "white",
    backgroundColor: "red",
  },
  parameters: {
    docs: {
      description: {
        story: "Different variants of the notification count component.",
      },
    },
  },
};

export const CountValues = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="text-center">
        <NotificationCount count={1} {...args} />
        <p className="mt-2 text-xs text-neutral-600">1</p>
      </div>
      <div className="text-center">
        <NotificationCount count={5} {...args} />
        <p className="mt-2 text-xs text-neutral-600">5</p>
      </div>
      <div className="text-center">
        <NotificationCount count={9} {...args} />
        <p className="mt-2 text-xs text-neutral-600">9</p>
      </div>
      <div className="text-center">
        <NotificationCount count={10} {...args} />
        <p className="mt-2 text-xs text-neutral-600">10</p>
      </div>
      <div className="text-center">
        <NotificationCount count={99} {...args} />
        <p className="mt-2 text-xs text-neutral-600">99</p>
      </div>
      <div className="text-center">
        <NotificationCount count={100} {...args} />
        <p className="mt-2 text-xs text-neutral-600">100</p>
      </div>
      <div className="text-center">
        <NotificationCount count={150} {...args} />
        <p className="mt-2 text-xs text-neutral-600">150</p>
      </div>
    </div>
  ),
  args: {
    animated: false,
    size: "md",
    color: "white",
    backgroundColor: "red",
    maxCount: 99,
  },
  parameters: {
    docs: {
      description: {
        story: "Different count values showing how maxCount works.",
      },
    },
  },
};

export const MaxCountExamples = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="text-center">
        <NotificationCount count={150} maxCount={9} {...args} />
        <p className="mt-2 text-xs text-neutral-600">maxCount=9</p>
      </div>
      <div className="text-center">
        <NotificationCount count={150} maxCount={50} {...args} />
        <p className="mt-2 text-xs text-neutral-600">maxCount=50</p>
      </div>
      <div className="text-center">
        <NotificationCount count={150} maxCount={99} {...args} />
        <p className="mt-2 text-xs text-neutral-600">maxCount=99</p>
      </div>
      <div className="text-center">
        <NotificationCount count={150} maxCount={999} {...args} />
        <p className="mt-2 text-xs text-neutral-600">maxCount=999</p>
      </div>
    </div>
  ),
  args: {
    animated: false,
    size: "md",
    color: "white",
    backgroundColor: "red",
    count: 150,
  },
  parameters: {
    docs: {
      description: {
        story: "Examples showing how maxCount affects large number display.",
      },
    },
  },
};

export const AnimationStates = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-8">
      <div className="text-center">
        <NotificationCount count={5} animated={true} {...args} />
        <p className="mt-2 text-xs text-neutral-600">Animated</p>
      </div>
      <div className="text-center">
        <NotificationCount count={5} animated={false} {...args} />
        <p className="mt-2 text-xs text-neutral-600">Static</p>
      </div>
    </div>
  ),
  args: {
    size: "md",
    color: "white",
    backgroundColor: "red",
  },
  parameters: {
    docs: {
      description: {
        story: "Animation states of the notification count component.",
      },
    },
  },
};

export const Positioning = {
  render: (args) => (
    <div className="space-y-8">
      <div className="relative inline-block">
        <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-200">
          <span>📧</span>
        </div>
        <NotificationCount
          count={5}
          position="absolute"
          positionClasses="top-0 right-0"
          {...args}
        />
        <p className="mt-2 text-xs text-neutral-600">Top Right (Absolute)</p>
      </div>

      <div className="relative inline-block">
        <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-200">
          <span>🔔</span>
        </div>
        <NotificationCount
          count={3}
          position="absolute"
          positionClasses="bottom-0 left-0"
          {...args}
        />
        <p className="mt-2 text-xs text-neutral-600">Bottom Left (Absolute)</p>
      </div>

      <div className="inline-block">
        <NotificationCount count={7} position="relative" {...args} />
        <p className="mt-2 text-xs text-neutral-600">Relative</p>
      </div>
    </div>
  ),
  args: {
    animated: false,
    size: "sm",
    color: "white",
    backgroundColor: "red",
  },
  parameters: {
    docs: {
      description: {
        story: "Different positioning options for the notification count.",
      },
    },
  },
};

export const RealWorldExamples = {
  render: (args) => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-lg">
            <span className="text-primary-700">📧</span>
          </div>
          <NotificationCount
            count={12}
            position="absolute"
            positionClasses="top-0 right-0"
            backgroundColor="red"
            {...args}
          />
        </div>
        <span>Email (12 new messages)</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="bg-warning-100 flex h-10 w-10 items-center justify-center rounded-lg">
            <span className="text-warning-700">🔔</span>
          </div>
          <NotificationCount
            count={3}
            position="absolute"
            positionClasses="top-0 right-0"
            backgroundColor="warning"
            {...args}
          />
        </div>
        <span>Notifications (3 new)</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="bg-success-100 flex h-10 w-10 items-center justify-center rounded-lg">
            <span className="text-success-700">✓</span>
          </div>
          <NotificationCount
            count={1}
            position="absolute"
            positionClasses="top-0 right-0"
            backgroundColor="success"
            {...args}
          />
        </div>
        <span>Tasks (1 completed)</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="bg-error-100 flex h-10 w-10 items-center justify-center rounded-lg">
            <span className="text-error-700">⚠️</span>
          </div>
          <NotificationCount
            count={99}
            position="absolute"
            positionClasses="top-0 right-0"
            backgroundColor="error"
            maxCount={99}
            {...args}
          />
        </div>
        <span>Errors (99+ issues)</span>
      </div>
    </div>
  ),
  args: {
    animated: true,
    size: "sm",
    color: "white",
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world usage examples of the notification count.",
      },
    },
  },
};

export const BorderedVariantExamples = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="text-center">
        <NotificationCount
          count={5}
          variant="bordered"
          borderColor="border-red-900"
          {...args}
        />
        <p className="mt-2 text-xs text-neutral-600">Red Border</p>
      </div>
      <div className="text-center">
        <NotificationCount
          count={3}
          variant="bordered"
          borderColor="border-blue-900"
          backgroundColor="blue"
          {...args}
        />
        <p className="mt-2 text-xs text-neutral-600">Blue Border</p>
      </div>
      <div className="text-center">
        <NotificationCount
          count={8}
          variant="bordered"
          borderColor="border-green-900"
          backgroundColor="green"
          {...args}
        />
        <p className="mt-2 text-xs text-neutral-600">Green Border</p>
      </div>
    </div>
  ),
  args: {
    animated: false,
    color: "white",
  },
  parameters: {
    docs: {
      description: {
        story: "Examples of the bordered variant with different border colors.",
      },
    },
  },
};

export const Playground = {
  render: (args) => (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white p-6">
        <NotificationCount {...args} />
      </div>
      <div className="text-sm text-neutral-600">
        <p>Count: {args.count}</p>
        <p>Position: {args.position}</p>
        <p>Position Classes: {args.positionClasses || "none"}</p>
        <p>Size: {args.size}</p>
        <p>Color: {args.color}</p>
        <p>Background: {args.backgroundColor}</p>
        <p>Variant: {args.variant}</p>
        <p>Animated: {args.animated ? "Yes" : "No"}</p>
        <p>Max Count: {args.maxCount}</p>
      </div>
    </div>
  ),
  args: {
    count: 5,
    animated: false,
    size: "sm",
    color: "white",
    backgroundColor: "red",
    variant: "default",
    borderColor: "border-red-900",
    position: "relative",
    positionClasses: "",
    maxCount: 99,
    className: "",
  },
  argTypes: {
    count: {
      control: "number",
      description: "The count to display",
    },
    animated: {
      control: "boolean",
      description: "Whether to show the pulsing animation",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the counter",
    },
    color: {
      control: "select",
      options: [
        "white",
        "black",
        "gray",
        "red",
        "blue",
        "green",
        "yellow",
        "primary",
      ],
      description: "Text color",
    },
    backgroundColor: {
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
      description: "Background color",
    },
    variant: {
      control: "select",
      options: ["default", "bordered"],
      description: "Style variant",
    },
    borderColor: {
      control: "text",
      description: "Border color for bordered variant",
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
    maxCount: {
      control: "number",
      description: "Maximum count to display (e.g., 99+)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all NotificationCount properties.",
      },
    },
  },
};
