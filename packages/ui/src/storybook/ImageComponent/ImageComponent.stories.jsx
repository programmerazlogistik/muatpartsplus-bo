import { ImageComponent } from "@muatmuat/ui/ImageComponent";

export default {
  title: "Components/ImageComponent",
  component: ImageComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A wrapper component around Next.js Image with custom source URL handling. Automatically prepends the asset reverse proxy URL to relative image paths, making it easy to work with both local and remote images.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description:
        "The path or URL to the image. Relative paths will be prefixed with the asset reverse proxy URL.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    width: {
      control: "number",
      description: "The width of the image in pixels",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    height: {
      control: "number",
      description: "The height of the image in pixels",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"alt"' },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the image",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    quality: {
      control: { type: "range", min: 1, max: 100, step: 1 },
      description: "The quality of the optimized image, an integer 1-100",
      table: {
        type: { summary: "number" },
      },
    },
    priority: {
      control: "boolean",
      description: "True if image should be prioritized for loading",
      table: {
        type: { summary: "boolean" },
      },
    },
    loading: {
      control: "select",
      options: ["lazy", "eager"],
      description: "Loading behavior for the image",
      table: {
        type: { summary: '"lazy" | "eager"' },
      },
    },
    unoptimized: {
      control: "boolean",
      description: "True if image should be unoptimized",
      table: {
        type: { summary: "boolean" },
      },
    },
    objectFit: {
      control: "select",
      options: ["fill", "contain", "cover", "none", "scale-down"],
      description: "CSS object-fit property",
      table: {
        type: {
          summary: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'",
        },
      },
    },
    placeholder: {
      control: "select",
      options: ["blur", "empty", "color"],
      description: "Placeholder type while loading",
      table: {
        type: { summary: "'blur' | 'empty' | 'color'" },
      },
    },
  },
};

export const Default = {
  args: {
    src: "/placeholder-image.jpg",
    width: 200,
    height: 200,
    alt: "Placeholder image",
    className: "rounded-lg",
  },
};

export const RemoteImage = {
  args: {
    src: "https://via.placeholder.com/300x200/4F46E5/white?text=Remote+Image",
    width: 300,
    height: 200,
    alt: "Remote image from placeholder service",
    className: "rounded-lg shadow-md",
  },
  parameters: {
    docs: {
      storyDescription:
        "Demonstrates loading images from remote URLs. The component will use the URL as-is when it starts with 'https'.",
    },
  },
};

export const LocalImage = {
  args: {
    src: "/images/sample.jpg",
    width: 250,
    height: 150,
    alt: "Local image from assets",
    className: "rounded-md border-2 border-neutral-200",
  },
  parameters: {
    docs: {
      storyDescription:
        "Shows how local image paths are automatically prefixed with the asset reverse proxy URL.",
    },
  },
};

export const WithObjectFit = {
  render: (args) => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <ImageComponent
            {...args}
            src="https://via.placeholder.com/150x150/4F46E5/white?text=Cover"
            width={100}
            height={100}
            objectFit="cover"
            alt="Cover fit"
            className="rounded"
          />
          <span className="text-xs text-neutral-600">Cover</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ImageComponent
            {...args}
            src="https://via.placeholder.com/150x150/10B981/white?text=Contain"
            width={100}
            height={100}
            objectFit="contain"
            alt="Contain fit"
            className="rounded"
          />
          <span className="text-xs text-neutral-600">Contain</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ImageComponent
            {...args}
            src="https://via.placeholder.com/150x150/F59E0B/white?text=Fill"
            width={100}
            height={100}
            objectFit="fill"
            alt="Fill fit"
            className="rounded"
          />
          <span className="text-xs text-neutral-600">Fill</span>
        </div>
      </div>
    </div>
  ),
  args: {
    alt: "Object fit demonstration",
  },
  parameters: {
    docs: {
      storyDescription:
        "Demonstrates different object-fit values for image scaling and positioning.",
    },
  },
};

export const Prioritized = {
  args: {
    src: "https://via.placeholder.com/400x200/EF4444/white?text=Priority+Image",
    width: 400,
    height: 200,
    alt: "Priority image",
    priority: true,
    className: "rounded-lg shadow-lg",
  },
  parameters: {
    docs: {
      storyDescription:
        "Shows a prioritized image that will be loaded early in the page lifecycle.",
    },
  },
};

export const WithPlaceholder = {
  args: {
    src: "https://via.placeholder.com/300x300/8B5CF6/white?text=Blur+Placeholder",
    width: 300,
    height: 300,
    alt: "Image with blur placeholder",
    placeholder: "blur",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
    className: "rounded-lg",
  },
  parameters: {
    docs: {
      storyDescription:
        "Demonstrates the blur placeholder effect while the image loads.",
    },
  },
};

export const Responsive = {
  render: (args) => (
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full max-w-md">
        <ImageComponent
          {...args}
          src="https://via.placeholder.com/800x400/3B82F6/white?text=Responsive+Image"
          width={800}
          height={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="Responsive image"
          className="h-auto w-full rounded-lg"
        />
      </div>
    </div>
  ),
  args: {
    alt: "Responsive image",
  },
  parameters: {
    docs: {
      storyDescription:
        "Shows responsive image behavior with size hints for different viewport sizes.",
    },
  },
};

export const Playground = {
  args: {
    src: "https://via.placeholder.com/300x200/6366F1/white?text=Playground",
    width: 300,
    height: 200,
    alt: "Playground image",
    className: "rounded-lg shadow-md",
    quality: 85,
    priority: false,
    loading: "lazy",
    unoptimized: false,
    objectFit: "cover",
  },
  parameters: {
    docs: {
      storyDescription:
        "Interactive playground to test different image configurations. Use the controls below to customize the component.",
    },
  },
};
