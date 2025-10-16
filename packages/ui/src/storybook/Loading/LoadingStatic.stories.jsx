import { LoadingStatic } from "@muatmuat/ui/Loading";

export default {
  title: "Components/Loading/LoadingStatic",
  component: LoadingStatic,
  parameters: {
    docs: {
      description: {
        component:
          "A static loading component that is SSR/RSC friendly. Always displays the loading overlay, perfect for server-side rendered applications and Suspense boundaries.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    // No configurable props for static loading
  },
  decorators: [
    (Story) => {
      return (
        <div>
          <Story />
          <div className="space-y-4 p-8">
            <h2 className="text-2xl font-bold">Page Content</h2>
            <p className="text-neutral-600">
              This content is behind the static loading overlay.
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
  render: () => <LoadingStatic />,
};

export const WithinContainer = {
  render: () => (
    <div className="relative h-96 overflow-hidden rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100">
      <LoadingStatic />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-neutral-700">
            Container Content
          </p>
          <p className="text-sm text-neutral-500">Loading overlay is visible</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      storyDescription:
        "LoadingStatic within a bounded container instead of full screen.",
    },
  },
};

export const Playground = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-2 text-lg font-semibold">Full Screen Loading</h3>
        <p className="mb-4 text-neutral-600">
          LoadingStatic always renders a full-screen overlay:
        </p>
        <LoadingStatic />
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h4 className="mb-2 font-medium text-blue-900">✅ Use Cases:</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Server-side rendered applications</li>
          <li>• React Server Components</li>
          <li>• Suspense fallbacks</li>
          <li>• Static site generation</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      storyDescription:
        "Comprehensive demonstration of LoadingStatic component capabilities.",
    },
  },
};
