import { LoadingInteractive, LoadingStatic } from "@muatmuat/ui/Loading";

export default {
  title: "Components/Loading",
  component: LoadingInteractive,
  subcomponents: { LoadingStatic },
  parameters: {
    docs: {
      description: {
        component:
          "Loading components for displaying application loading states. Choose between interactive (store-driven) or static (SSR-friendly) implementations.",
      },
    },
  },
};

export const LoadingOverview = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Loading Components</h2>
        <p className="mb-6 text-neutral-600">
          Choose the right loading component based on your application
          architecture and requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold">LoadingInteractive</h3>
          <div className="mb-4 rounded bg-neutral-50 p-4">
            <LoadingInteractive />
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Store-driven:</strong> Uses Zustand for state management
            </p>
            <p>
              <strong>Conditional:</strong> Shows/hides based on global loading
              state
            </p>
            <p>
              <strong>Client-side:</strong> Best for SPAs and client-side apps
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold">LoadingStatic</h3>
          <div className="mb-4 rounded bg-neutral-50 p-4">
            <LoadingStatic />
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Always visible:</strong> Renders loading overlay
              unconditionally
            </p>
            <p>
              <strong>SSR-friendly:</strong> Works with Server Components
            </p>
            <p>
              <strong>Simple:</strong> No dependencies on external state
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h4 className="mb-3 font-medium text-blue-900">
          📋 Component Comparison
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="py-2 pr-4 text-left">Feature</th>
                <th className="px-4 py-2 text-center">LoadingInteractive</th>
                <th className="px-4 py-2 text-center">LoadingStatic</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-100">
                <td className="py-2 pr-4">State Management</td>
                <td className="px-4 py-2 text-center">✅ Zustand Store</td>
                <td className="px-4 py-2 text-center">❌ None</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 pr-4">SSR Compatible</td>
                <td className="px-4 py-2 text-center">❌ Client-only</td>
                <td className="px-4 py-2 text-center">✅ Yes</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 pr-4">Conditional Display</td>
                <td className="px-4 py-2 text-center">✅ Dynamic</td>
                <td className="px-4 py-2 text-center">❌ Always</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 pr-4">Dependencies</td>
                <td className="px-4 py-2 text-center">Store required</td>
                <td className="px-4 py-2 text-center">None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      storyDescription: "Overview and comparison of all Loading components.",
    },
  },
};

export const UsageExamples = {
  render: () => (
    <div className="space-y-8 p-6">
      <h2 className="mb-4 text-2xl font-bold">Usage Examples</h2>

      <div className="rounded-lg border bg-white p-6">
        <h3 className="mb-3 text-lg font-semibold">LoadingInteractive Usage</h3>
        <div className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
          <pre className="text-sm">
            {`import { LoadingInteractive } from "@muatmuat/ui/Loading";
import { useLoadingAction } from "@muatmuat/ui/Loading";

function MyComponent() {
  const { setIsGlobalLoading } = useLoadingAction();

  const handleAsyncAction = async () => {
    setIsGlobalLoading(true);
    try {
      await fetchData();
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return (
    <div>
      <LoadingInteractive />
      <button onClick={handleAsyncAction}>
        Load Data
      </button>
    </div>
  );
}`}
          </pre>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h3 className="mb-3 text-lg font-semibold">LoadingStatic Usage</h3>
        <div className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
          <pre className="text-sm">
            {`import { LoadingStatic } from "@muatmuat/ui/Loading";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<LoadingStatic />}>
      <AsyncComponent />
    </Suspense>
  );
}

// Or for Server Components:
export default function Loading() {
  return <LoadingStatic />;
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      storyDescription: "Code examples showing how to use Loading components.",
    },
  },
};
