import { useState } from "react";

import { CropperPreviewResponsive } from "@muatmuat/ui/Cropper";

export default {
  title: "Components/CropperPreviewResponsive",
  component: CropperPreviewResponsive,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive preview component for cropped images with mobile-optimized interface and upload options.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "The image source URL or data URL for preview",
    },
    title: {
      control: "text",
      description: "Title for the preview screen",
      defaultValue: "Upload Foto",
    },
    setIsShowPreview: {
      action: "setIsShowPreview",
      description: "Function to control preview visibility",
    },
    onConfirm: {
      action: "confirm",
      description:
        "Callback function triggered when user confirms the cropped image",
    },
    uploadOptions: {
      control: "array",
      description: "Array of upload options with onClick handlers",
    },
    onCancelCrop: {
      action: "cancel",
      description: "Callback function triggered when user cancels cropping",
    },
    description: {
      control: "text",
      description: "Description text for the preview screen",
      defaultValue: "Max. size foto 10MB",
    },
  },
};

export const Default = {
  args: {
    src: "https://via.placeholder.com/150",
    title: "Upload Foto",
    description: "Max. size foto 10MB",
    uploadOptions: [
      {
        title: "Camera",
        src: "/icons/camera.svg",
        onClick: () => console.log("Camera clicked"),
      },
      {
        title: "Gallery",
        src: "/icons/gallery.svg",
        onClick: () => console.log("Gallery clicked"),
      },
    ],
  },
  render: (args) => {
    const [isShowPreview, setIsShowPreview] = useState(false);

    const handleConfirm = () => {
      args.onConfirm();
      setIsShowPreview(false);
    };

    const handleCancel = () => {
      args.onCancelCrop();
      setIsShowPreview(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button
          onClick={() => setIsShowPreview(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Show Preview
        </button>

        {isShowPreview && (
          <CropperPreviewResponsive
            {...args}
            setIsShowPreview={setIsShowPreview}
            onConfirm={handleConfirm}
            onCancelCrop={handleCancel}
          />
        )}
      </div>
    );
  },
};

export const WithCustomTitle = {
  args: {
    src: "https://via.placeholder.com/150",
    title: "Profile Picture Preview",
    description: "Recommended size: 400x400px",
    uploadOptions: [
      {
        title: "Take Photo",
        src: "/icons/camera.svg",
        onClick: () => console.log("Camera clicked"),
      },
      {
        title: "Choose Photo",
        src: "/icons/gallery.svg",
        onClick: () => console.log("Gallery clicked"),
      },
    ],
  },
  render: (args) => {
    const [isShowPreview, setIsShowPreview] = useState(false);

    const handleConfirm = () => {
      args.onConfirm();
      setIsShowPreview(false);
    };

    const handleCancel = () => {
      args.onCancelCrop();
      setIsShowPreview(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button
          onClick={() => setIsShowPreview(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Show Custom Preview
        </button>

        {isShowPreview && (
          <CropperPreviewResponsive
            {...args}
            setIsShowPreview={setIsShowPreview}
            onConfirm={handleConfirm}
            onCancelCrop={handleCancel}
          />
        )}
      </div>
    );
  },
};

export const CoverPhotoPreview = {
  args: {
    src: "https://via.placeholder.com/400x200",
    title: "Cover Photo Preview",
    description: "Recommended size: 1200x400px",
    uploadOptions: [
      {
        title: "Camera",
        src: "/icons/camera.svg",
        onClick: () => console.log("Camera clicked"),
      },
      {
        title: "Gallery",
        src: "/icons/gallery.svg",
        onClick: () => console.log("Gallery clicked"),
      },
    ],
  },
  render: (args) => {
    const [isShowPreview, setIsShowPreview] = useState(false);

    const handleConfirm = () => {
      args.onConfirm();
      setIsShowPreview(false);
    };

    const handleCancel = () => {
      args.onCancelCrop();
      setIsShowPreview(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button
          onClick={() => setIsShowPreview(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Show Cover Preview
        </button>

        {isShowPreview && (
          <CropperPreviewResponsive
            {...args}
            setIsShowPreview={setIsShowPreview}
            onConfirm={handleConfirm}
            onCancelCrop={handleCancel}
          />
        )}
      </div>
    );
  },
};

export const InteractiveDemo = {
  args: {
    src: "https://via.placeholder.com/150",
    title: "Interactive Preview Demo",
    description: "Max. size foto 10MB",
    uploadOptions: [
      {
        title: "Camera",
        src: "/icons/camera.svg",
        onClick: () => console.log("Camera clicked"),
      },
      {
        title: "Gallery",
        src: "/icons/gallery.svg",
        onClick: () => console.log("Gallery clicked"),
      },
    ],
  },
  render: (args) => {
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [selectedImage, setSelectedImage] = useState(args.src);

    const handleConfirm = () => {
      args.onConfirm();
      setIsShowPreview(false);
    };

    const handleCancel = () => {
      args.onCancelCrop();
      setIsShowPreview(false);
    };

    const handleOptionClick = (option) => {
      option.onClick();
      setIsShowPreview(false);
    };

    const demoUploadOptions = args.uploadOptions.map((option) => ({
      ...option,
      onClick: () => handleOptionClick(option),
    }));

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-semibold">Interactive Preview Demo</h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => setIsShowPreview(true)}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Show Preview
            </button>
            <button
              onClick={() =>
                setSelectedImage("https://via.placeholder.com/200")
              }
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Change Image
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Title:</strong> {args.title}
            </p>
            <p>
              <strong>Description:</strong> {args.description}
            </p>
            <p>
              <strong>Preview Open:</strong> {isShowPreview ? "Yes" : "No"}
            </p>
            <p>
              <strong>Upload Options:</strong> {args.uploadOptions.length}
            </p>
          </div>

          {isShowPreview && (
            <CropperPreviewResponsive
              {...args}
              src={selectedImage}
              setIsShowPreview={setIsShowPreview}
              onConfirm={handleConfirm}
              onCancelCrop={handleCancel}
              uploadOptions={demoUploadOptions}
            />
          )}
        </div>
      </div>
    );
  },
};
