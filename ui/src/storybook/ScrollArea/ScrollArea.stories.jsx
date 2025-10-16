import { ScrollArea, ScrollBar } from "@muatmuat/ui/ScrollArea";

export default {
  title: "Components/ScrollArea",
  component: ScrollArea,
  subcomponents: { ScrollBar },
  parameters: {
    docs: {
      description: {
        component:
          "A customizable scroll area component with styled scrollbars built on Radix UI primitives. Provides accessible scrolling with smooth animations and custom styling.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    className: {
      description:
        "Additional CSS classes to apply to the scroll area container",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    children: {
      description: "Content to be displayed within the scrollable area",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "null" },
      },
    },
    type: {
      description: "Defines the scroll behavior type",
      control: { type: "select" },
      options: ["auto", "always", "scroll", "hover"],
      table: {
        type: { summary: "'auto' | 'always' | 'scroll' | 'hover'" },
        defaultValue: { summary: "hover" },
      },
    },
    dir: {
      description: "Text direction for the scroll area",
      control: { type: "select" },
      options: ["ltr", "rtl"],
      table: {
        type: { summary: "'ltr' | 'rtl'" },
        defaultValue: { summary: "ltr" },
      },
    },
  },
};

export const Default = {
  args: {
    className: "w-[300px] h-[200px] border rounded-md p-4",
    children: `
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Scrollable Content</h3>
        <p>This is a scrollable area with custom styling. Scroll down to see more content.</p>
        <div className="space-y-2">
          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">Item 1</div>
          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">Item 2</div>
          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">Item 3</div>
          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">Item 4</div>
          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">Item 5</div>
          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">Item 6</div>
          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">Item 7</div>
          <div className="h-16 bg-primary/10 rounded flex items-center justify-center">Item 8</div>
        </div>
      </div>
    `,
    type: "hover",
  },
};

export const VerticalScroll = {
  args: {
    className: "w-[300px] h-[200px] border rounded-md p-4",
    children: `
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vertical Scrolling</h3>
        <p>Scroll vertically to navigate through content</p>
        <div className="space-y-2">
          ${Array.from(
            { length: 20 },
            (_, i) =>
              `<div key=${i} className="h-12 bg-secondary/20 rounded flex items-center justify-center px-4">
              Vertical Item ${i + 1}
            </div>`
          ).join("")}
        </div>
      </div>
    `,
  },
};

export const HorizontalScroll = {
  args: {
    className: "w-[400px] h-[100px] border rounded-md p-4",
    children: `
      <div className="space-y-2">
        <h3 className="text-lg font-semibold whitespace-nowrap">Horizontal Scrolling</h3>
        <p className="whitespace-nowrap">Scroll horizontally to see more content</p>
        <div className="flex space-x-2 whitespace-nowrap">
          ${Array.from(
            { length: 15 },
            (_, i) =>
              `<div key=${i} class="min-w-[150px] h-16 bg-accent/20 rounded flex items-center justify-center px-4">
              Horizontal Item ${i + 1}
            </div>`
          ).join("")}
        </div>
      </div>
    `,
  },
};

export const LongTextContent = {
  args: {
    className: "w-[350px] h-[250px] border rounded-md p-6",
    children: `
      <div className="prose prose-sm max-w-none">
        <h3 className="text-lg font-semibold mb-4">Long Text Content</h3>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="mb-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p className="mb-4">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
      </div>
    `,
  },
};

export const WithCustomScrollBar = {
  args: {
    className: "w-[300px] h-[200px] border rounded-md p-4",
    children: `
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom ScrollBar</h3>
        <p>This scroll area uses a custom styled scrollbar</p>
        <div className="space-y-2">
          ${Array.from(
            { length: 10 },
            (_, i) =>
              `<div key=${i} className="h-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded flex items-center justify-center">
              Custom Styled Item ${i + 1}
            </div>`
          ).join("")}
        </div>
      </div>
    `,
  },
};

export const ScrollWithImages = {
  args: {
    className: "w-[400px] h-[300px] border rounded-md p-4",
    children: `
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Image Gallery</h3>
        <p>Scroll through this image gallery</p>
        <div className="grid grid-cols-2 gap-4">
          ${Array.from(
            { length: 12 },
            (_, i) =>
              `<div key=${i} className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Image ${i + 1}
            </div>`
          ).join("")}
        </div>
      </div>
    `,
  },
};

export const TableScroll = {
  args: {
    className: "w-full max-w-md border rounded-md overflow-hidden",
    children: `
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Scrollable Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th class="text-left p-2 min-w-[100px]">Name</th>
                <th class="text-left p-2 min-w-[120px]">Email</th>
                <th class="text-left p-2 min-w-[100px]">Status</th>
                <th class="text-left p-2 min-w-[80px]">Role</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from(
                { length: 15 },
                (_, i) =>
                  `<tr key=${i} class="border-b">
                  <td class="p-2 whitespace-nowrap">User ${i + 1}</td>
                  <td class="p-2 whitespace-nowrap">user${i + 1}@example.com</td>
                  <td class="p-2 whitespace-nowrap">${i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Inactive"}</td>
                  <td class="p-2 whitespace-nowrap">${i % 2 === 0 ? "Admin" : "User"}</td>
                </tr>`
              ).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,
  },
};

export const Playground = {
  args: {
    className: "w-[350px] h-[250px] border rounded-md p-4",
    children: `
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <p>Customize the scroll area using the controls panel</p>
        <div className="space-y-2">
          ${Array.from(
            { length: 12 },
            (_, i) =>
              `<div key=${i} className="h-16 bg-primary/10 rounded flex items-center justify-center px-4">
              Play with me - Item ${i + 1}
            </div>`
          ).join("")}
        </div>
      </div>
    `,
    type: "hover",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls panel to experiment with different scroll area configurations. Try changing the scroll type and direction to see how it affects the scrolling behavior.",
      },
    },
  },
};
