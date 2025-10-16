import { LightboxPreview, LightboxProvider, LightboxTrigger } from "@muatmuat/ui/Lightbox";

export default {
  title: "Components/Lightbox",
  component: LightboxProvider,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive lightbox component for displaying images in a modal with navigation capabilities. Provides a context-based API for flexible implementation patterns.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["shipper", "square"],
      description: "Visual style variant of the lightbox",
      table: {
        defaultValue: { summary: "shipper" },
      },
    },
    title: {
      control: { type: "text" },
      description: "Title displayed in the lightbox header",
    },
    images: {
      control: { type: "array" },
      description: "Array of image URLs to display in the lightbox",
    },
    image: {
      control: { type: "text" },
      description: "Single image URL to display in the lightbox",
    },
  },
};

const sampleImages = [
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
];

export const Default = {
  args: {
    title: "Image Gallery",
    images: sampleImages,
    variant: "shipper",
  },
  render: (args) => (
    <LightboxProvider {...args}>
      <div className="p-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {args.images.map((image, index) => (
            <LightboxPreview
              key={index}
              image={image}
              index={index}
              alt={`Sample image ${index + 1}`}
              variant={args.variant}
            />
          ))}
        </div>
      </div>
    </LightboxProvider>
  ),
};

export const SingleImage = {
  args: {
    title: "Single Image View",
    image: sampleImages[0],
    variant: "shipper",
  },
  render: (args) => (
    <LightboxProvider {...args}>
      <div className="p-8">
        <LightboxPreview
          image={args.image}
          index={0}
          alt="Single image preview"
          variant={args.variant}
        />
      </div>
    </LightboxProvider>
  ),
};

export const SquareVariant = {
  args: {
    title: "Square Gallery",
    images: sampleImages.slice(0, 3),
    variant: "square",
  },
  render: (args) => (
    <LightboxProvider {...args}>
      <div className="p-8">
        <div className="flex flex-wrap gap-4">
          {args.images.map((image, index) => (
            <LightboxPreview
              key={index}
              image={image}
              index={index}
              alt={`Square image ${index + 1}`}
              variant={args.variant}
            />
          ))}
        </div>
      </div>
    </LightboxProvider>
  ),
};

export const WithTrigger = {
  args: {
    title: "Trigger Example",
    images: sampleImages,
    variant: "shipper",
  },
  render: (args) => (
    <LightboxProvider {...args}>
      <div className="p-8">
        <LightboxTrigger variant={args.variant}>
          <button className="bg-primary-700 hover:bg-primary-800 rounded-lg px-6 py-3 text-white transition-colors">
            Open Gallery
          </button>
        </LightboxTrigger>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {args.images.map((image, index) => (
            <LightboxPreview
              key={index}
              image={image}
              index={index}
              alt={`Trigger image ${index + 1}`}
              variant={args.variant}
            />
          ))}
        </div>
      </div>
    </LightboxProvider>
  ),
};

export const DynamicTitle = {
  args: {
    title: (currentIndex) => `Image ${currentIndex + 1} of 4`,
    images: sampleImages,
    variant: "shipper",
  },
  render: (args) => (
    <LightboxProvider {...args}>
      <div className="p-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {args.images.map((image, index) => (
            <LightboxPreview
              key={index}
              image={image}
              index={index}
              alt={`Dynamic title image ${index + 1}`}
              variant={args.variant}
            />
          ))}
        </div>
      </div>
    </LightboxProvider>
  ),
};

export const Playground = {
  args: {
    title: "Interactive Gallery",
    images: sampleImages,
    variant: "shipper",
  },
  render: (args) => (
    <LightboxProvider {...args}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold">Lightbox Gallery Demo</h2>
          <p className="text-neutral-600">
            Click on any image preview to open the lightbox
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {args.images.map((image, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-sm font-medium text-neutral-700">
                Image {index + 1}
              </h3>
              <LightboxPreview
                image={image}
                index={index}
                alt={`Playground image ${index + 1}`}
                variant={args.variant}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-neutral-100 p-4">
          <h3 className="mb-2 font-medium">Custom Trigger</h3>
          <LightboxTrigger variant={args.variant}>
            <button className="rounded bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-900">
              Open Full Gallery
            </button>
          </LightboxTrigger>
        </div>
      </div>
    </LightboxProvider>
  ),
  parameters: {
    docs: {
      storyDescription:
        "Interactive playground demonstrating all Lightbox features including navigation, multiple images, and custom triggers.",
    },
  },
};
