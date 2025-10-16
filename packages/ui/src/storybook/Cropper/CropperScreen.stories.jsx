import { CropperScreen } from "@muatmuat/ui/Cropper";

export default {
  title: "Components/CropperScreen",
  component: CropperScreen,
  parameters: {
    docs: {
      description: {
        component:
          "A screen-level cropper component that integrates with navigation and store management for image uploading workflows.",
      },
    },
  },
  argTypes: {
    isCircle: {
      control: "boolean",
      description: "Whether to crop as a circle",
      defaultValue: false,
    },
    onClose: {
      action: "close",
      description: "Callback function triggered when cropper is closed",
    },
  },
};

export const Default = {
  args: {
    isCircle: false,
  },
  render: (args) => {
    // Note: This component requires specific store and navigation context
    // This story is mainly for documentation purposes
    return (
      <div className="p-6">
        <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
          <p className="font-semibold">Component Requires Context</p>
          <p className="text-sm">CropperScreen requires:</p>
          <ul className="mt-2 list-inside list-disc text-sm">
            <li>useResponsiveNavigation hook</li>
            <li>useImageUploaderStore hook</li>
            <li>useImageUploaderActions hook</li>
            <li>CropperResponsiveLayout component</li>
          </ul>
          <p className="mt-2 text-sm">
            This component is designed for specific navigation flows and cannot
            be demoed in isolation.
          </p>
        </div>
      </div>
    );
  },
};

export const CircleCrop = {
  args: {
    isCircle: true,
  },
  render: (args) => {
    return (
      <div className="p-6">
        <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
          <p className="font-semibold">Component Requires Context</p>
          <p className="text-sm">
            CropperScreen with circle crop requires the same context as the
            default variant.
          </p>
        </div>
      </div>
    );
  },
};
