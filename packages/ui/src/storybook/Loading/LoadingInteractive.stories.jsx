import { LoadingInteractive } from "@muatmuat/ui/Loading";

import { useLoadingAction } from "./loadingStore";

// Mock the loading store for Storybook
const MockLoadingInteractive = ({ isLoading = true }) => {
  const { setIsGlobalLoading } = useLoadingAction();

  // Simulate loading state
  if (isLoading) {
    setIsGlobalLoading(true);
  }

  return <LoadingInteractive />;
};

export default {
  title: "Components/Loading/LoadingInteractive",
  component: LoadingInteractive,
  parameters: {
    docs: {
      description: {
        component:
          "An interactive loading component that responds to global loading state using Zustand store. Features backdrop blur and centered loading animation.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    isLoading: {
      control: { type: "boolean" },
      description: "Controls the loading state visibility",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
  decorators: [
    (Story, context) => {
      return (
        <div>
          <Story {...context} />
          <div className="space-y-4 p-8">
            <h2 className="text-2xl font-bold">Page Content</h2>
            <p className="text-neutral-600">
              This content is behind the loading overlay when active.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="rounded-lg border p-4">
                  <h3 className="font-medium">Card {item}</h3>
                  <p className="text-sm text-neutral-500">Sample content</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    },
  ],
};

export const Default = {
  args: {
    isLoading: true,
  },
  render: (args) => <MockLoadingInteractive {...args} />,
};

export const NotLoading = {
  args: {
    isLoading: false,
  },
  render: (args) => <MockLoadingInteractive {...args} />,
};

export const WithControls = {
  args: {
    isLoading: true,
  },
  render: (args) => (
    <div className="space-y-4">
      <MockLoadingInteractive {...args} />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-lg border bg-white p-4 shadow-lg">
        <p className="mb-2 text-sm text-neutral-600">Toggle loading state:</p>
        <button
          onClick={() => {
            const button = event.target;
            const newState = button.textContent === "Start Loading";
            button.textContent = newState ? "Stop Loading" : "Start Loading";
            // This would normally use the store action
            console.log("Loading state toggled:", newState);
          }}
          className="rounded bg-primary-700 px-4 py-2 text-white transition-colors hover:bg-primary-800"
        >
          Stop Loading
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      storyDescription:
        "Interactive demo showing how the loading overlay covers page content.",
    },
  },
};
