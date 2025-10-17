import { useState } from "react";

import { ConditionalDiv } from "@muatmuat/ui/Card";

export default {
  title: "Components/Card/ConditionalDiv",
  component: ConditionalDiv,
  parameters: {
    docs: {
      description: {
        component:
          "A utility component that conditionally renders a div wrapper only when it has valid children. " +
          "Automatically hides itself if all children are null, undefined, or empty. " +
          "Perfect for layout components that should only appear when they contain actual content.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "CSS classes to apply to the div when rendered",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      control: false,
      description: "Child elements - div only renders if children exist",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
};

// Basic Usage
export const Default = {
  render: () => (
    <div className="space-y-4">
      <div className="rounded border p-4">
        <h3 className="mb-2 text-sm font-medium">
          ConditionalDiv with content:
        </h3>
        <ConditionalDiv className="rounded border-2 border-blue-500 bg-blue-50 p-2">
          <p>This content is visible, so the ConditionalDiv renders</p>
        </ConditionalDiv>
      </div>

      <div className="rounded border p-4">
        <h3 className="mb-2 text-sm font-medium">
          ConditionalDiv with null children:
        </h3>
        <ConditionalDiv className="rounded border-2 border-red-500 bg-red-50 p-2">
          {null}
        </ConditionalDiv>
        <p className="mt-1 text-xs text-gray-500">
          ↑ The ConditionalDiv above doesn't render because children is null
        </p>
      </div>
    </div>
  ),
};

// With Valid Content
export const WithContent = {
  render: () => (
    <ConditionalDiv className="rounded-lg border-2 border-green-500 bg-green-50 p-4">
      <h4 className="font-medium text-green-800">Valid Content</h4>
      <p className="text-sm text-green-700">
        This ConditionalDiv is rendered because it has valid children.
      </p>
    </ConditionalDiv>
  ),
};

// With Empty Content (Hidden)
export const WithEmptyContent = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        The following ConditionalDiv containers will be hidden because they have
        no valid children:
      </p>

      <div className="rounded border border-dashed border-gray-300 p-4">
        <p className="mb-2 text-xs text-gray-500">ConditionalDiv with null:</p>
        <ConditionalDiv className="border-2 border-red-500 bg-red-100 p-4">
          {null}
        </ConditionalDiv>
      </div>

      <div className="rounded border border-dashed border-gray-300 p-4">
        <p className="mb-2 text-xs text-gray-500">
          ConditionalDiv with undefined:
        </p>
        <ConditionalDiv className="border-2 border-red-500 bg-red-100 p-4">
          {undefined}
        </ConditionalDiv>
      </div>

      <div className="rounded border border-dashed border-gray-300 p-4">
        <p className="mb-2 text-xs text-gray-500">
          ConditionalDiv with empty array:
        </p>
        <ConditionalDiv className="border-2 border-red-500 bg-red-100 p-4">
          {[]}
        </ConditionalDiv>
      </div>

      <p className="text-xs italic text-gray-500">
        None of the red bordered divs above should be visible in the rendered
        output.
      </p>
    </div>
  ),
};

// Interactive Demo
export const InteractiveDemo = {
  render: () => {
    const [showContent, setShowContent] = useState(true);
    const [contentType, setContentType] = useState("text");

    const renderContent = () => {
      if (!showContent) return null;

      switch (contentType) {
        case "text":
          return <p>Text content</p>;
        case "element":
          return (
            <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
              Button Element
            </button>
          );
        case "multiple":
          return (
            <>
              <p>Multiple elements</p>
              <span className="text-sm text-gray-600">Another element</span>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showContent}
              onChange={(e) => setShowContent(e.target.checked)}
            />
            <span className="text-sm">Show Content</span>
          </label>

          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="rounded border px-2 py-1 text-sm"
            disabled={!showContent}
          >
            <option value="text">Text Content</option>
            <option value="element">Button Element</option>
            <option value="multiple">Multiple Elements</option>
          </select>
        </div>

        <div className="min-h-[100px] rounded border border-dashed border-gray-400 p-4">
          <p className="mb-2 text-xs text-gray-500">
            ConditionalDiv container:
          </p>
          <ConditionalDiv className="rounded border-2 border-purple-500 bg-purple-50 p-4">
            {renderContent()}
          </ConditionalDiv>
          {!showContent && (
            <p className="mt-2 text-xs italic text-gray-500">
              ConditionalDiv is hidden because there are no valid children
            </p>
          )}
        </div>
      </div>
    );
  },
};

// Use Case: Conditional Layout Sections
export const LayoutSections = {
  render: () => {
    const [sections, setSections] = useState({
      header: true,
      content: true,
      footer: false,
      sidebar: false,
    });

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {Object.entries(sections).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setSections((prev) => ({ ...prev, [key]: e.target.checked }))
                }
              />
              <span className="text-sm capitalize">{key}</span>
            </label>
          ))}
        </div>

        <div className="overflow-hidden rounded-lg border">
          <ConditionalDiv className="border-b bg-blue-100 p-4">
            {sections.header && (
              <h2 className="text-lg font-bold">Page Header</h2>
            )}
          </ConditionalDiv>

          <div className="flex">
            <ConditionalDiv className="w-64 border-r bg-yellow-100 p-4">
              {sections.sidebar && (
                <div>
                  <h3 className="mb-2 font-medium">Sidebar</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Nav Item 1</li>
                    <li>Nav Item 2</li>
                    <li>Nav Item 3</li>
                  </ul>
                </div>
              )}
            </ConditionalDiv>

            <ConditionalDiv className="flex-1 bg-gray-50 p-4">
              {sections.content && (
                <div>
                  <h3 className="mb-2 font-medium">Main Content</h3>
                  <p className="text-sm text-gray-700">
                    This is the main content area of the page.
                  </p>
                </div>
              )}
            </ConditionalDiv>
          </div>

          <ConditionalDiv className="border-t bg-green-100 p-4">
            {sections.footer && (
              <p className="text-center text-sm">© 2024 Footer Content</p>
            )}
          </ConditionalDiv>
        </div>
      </div>
    );
  },
};

// Use Case: Dynamic Form Sections
export const DynamicFormSections = {
  render: () => {
    const [formData, setFormData] = useState({
      showPersonal: true,
      showCompany: false,
      showShipping: false,
    });

    return (
      <div className="max-w-md space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Form Sections</h3>
          {Object.entries(formData).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [key]: e.target.checked }))
                }
              />
              <span className="text-sm">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </label>
          ))}
        </div>

        <form className="space-y-4">
          <ConditionalDiv className="rounded-lg border bg-blue-50 p-4">
            {formData.showPersonal && (
              <div className="space-y-3">
                <h4 className="font-medium text-blue-800">
                  Personal Information
                </h4>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded border px-3 py-2 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded border px-3 py-2 text-sm"
                />
              </div>
            )}
          </ConditionalDiv>

          <ConditionalDiv className="rounded-lg border bg-green-50 p-4">
            {formData.showCompany && (
              <div className="space-y-3">
                <h4 className="font-medium text-green-800">
                  Company Information
                </h4>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full rounded border px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full rounded border px-3 py-2 text-sm"
                />
              </div>
            )}
          </ConditionalDiv>

          <ConditionalDiv className="rounded-lg border bg-purple-50 p-4">
            {formData.showShipping && (
              <div className="space-y-3">
                <h4 className="font-medium text-purple-800">
                  Shipping Information
                </h4>
                <textarea
                  placeholder="Shipping Address"
                  className="h-20 w-full rounded border px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full rounded border px-3 py-2 text-sm"
                />
              </div>
            )}
          </ConditionalDiv>
        </form>
      </div>
    );
  },
};

// Performance Demo
export const PerformanceDemo = {
  render: () => {
    const [items, setItems] = useState([1, 2, 3]);
    const [hideEven, setHideEven] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setItems((prev) => [...prev, prev.length + 1])}
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
          >
            Add Item
          </button>
          <button
            onClick={() => setItems((prev) => prev.slice(0, -1))}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white"
            disabled={items.length === 0}
          >
            Remove Item
          </button>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hideEven}
              onChange={(e) => setHideEven(e.target.checked)}
            />
            <span className="text-sm">Hide Even Numbers</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ConditionalDiv
              key={item}
              className="rounded border-2 border-blue-500 bg-blue-50 p-3"
            >
              {(!hideEven || item % 2 !== 0) && (
                <div>
                  <p className="font-medium">Item {item}</p>
                  <p className="text-sm text-gray-600">
                    {item % 2 === 0 ? "Even" : "Odd"} number
                  </p>
                </div>
              )}
            </ConditionalDiv>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          ConditionalDiv automatically hides containers with no valid children.
          When "Hide Even Numbers" is checked, even-numbered items disappear
          completely.
        </p>
      </div>
    );
  },
};

// Playground
export const Playground = {
  render: (args) => (
    <ConditionalDiv {...args}>
      <p>Sample content for testing</p>
      <button className="mt-2 rounded bg-primary-500 px-3 py-1 text-sm text-white">
        Test Button
      </button>
    </ConditionalDiv>
  ),
  args: {
    className: "border-2 border-primary-500 p-4 rounded-lg bg-primary-50",
  },
};
