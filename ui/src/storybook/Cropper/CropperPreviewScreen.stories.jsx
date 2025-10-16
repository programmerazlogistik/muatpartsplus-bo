import { CropperPreviewScreen } from "@muatmuat/ui/Cropper";

export default {
  title: "Components/CropperPreviewScreen",
  component: CropperPreviewScreen,
  parameters: {
    docs: {
      description: {
        component:
          "A screen-level preview component for displaying cropped images with footer actions and navigation integration.",
      },
    },
  },
  argTypes: {},
};

export const Default = {
  render: () => {
    // Note: This component requires specific store and navigation context
    // This story is mainly for documentation purposes
    return (
      <div className="p-6">
        <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
          <p className="font-semibold">Component Requires Context</p>
          <p className="text-sm">CropperPreviewScreen requires:</p>
          <ul className="mt-2 list-inside list-disc text-sm">
            <li>useResponsiveNavigation hook</li>
            <li>useImageUploaderStore hook</li>
            <li>useImageUploaderActions hook</li>
            <li>ResponsiveFooter component</li>
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
