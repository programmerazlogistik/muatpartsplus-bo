import { useState } from "react";

import { CropperResponsive } from "@muatmuat/ui/Cropper";

export default {
  title: "Components/CropperResponsive",
  component: CropperResponsive,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive image cropper component designed for mobile and full-screen experiences with overlay interface.",
      },
    },
  },
  argTypes: {
    imageSource: {
      control: "text",
      description: "The image source URL or data URL",
      defaultValue: "",
    },
    result: {
      action: "result",
      description: "Callback function triggered when cropping is completed",
    },
    isOpen: {
      control: "boolean",
      description: "Whether the cropper overlay is open",
      defaultValue: false,
    },
    setIsOpen: {
      action: "setIsOpen",
      description: "Function to control overlay open state",
    },
    onClose: {
      action: "close",
      description: "Callback function triggered when overlay is closed",
    },
    isCircle: {
      control: "boolean",
      description: "Whether to crop as a circle",
      defaultValue: false,
    },
    previewTitle: {
      control: "text",
      description: "Title for preview screen",
    },
    previewDescription: {
      control: "text",
      description: "Description for preview screen",
    },
    uploadOptions: {
      control: "array",
      description: "Array of upload options for preview screen",
    },
    isShowPreview: {
      control: "boolean",
      description: "Whether to show preview screen",
      defaultValue: false,
    },
    setIsShowPreview: {
      action: "setIsShowPreview",
      description: "Function to control preview state",
    },
    fileType: {
      control: "text",
      description: "File type for output image",
    },
  },
};

export const Default = {
  args: {
    isOpen: false,
    isCircle: false,
    imageSource: "",
    isShowPreview: false,
    fileType: "image/jpeg",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const [isShowPreview, setIsShowPreview] = useState(false);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageSource(URL.createObjectURL(file));
        setIsOpen(true);
      }
    };

    const handleResult = (previewImage) => {
      args.result(previewImage);
      setIsOpen(false);
      setIsShowPreview(false);
    };

    const handleClose = (cancelled) => {
      args.onClose(cancelled);
      setIsOpen(false);
      setIsShowPreview(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <CropperResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imageSource={imageSource}
          result={handleResult}
          onClose={handleClose}
          isShowPreview={isShowPreview}
          setIsShowPreview={setIsShowPreview}
        />
      </div>
    );
  },
};

export const CircleCrop = {
  args: {
    isOpen: false,
    isCircle: true,
    imageSource: "",
    isShowPreview: false,
    fileType: "image/jpeg",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const [isShowPreview, setIsShowPreview] = useState(false);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageSource(URL.createObjectURL(file));
        setIsOpen(true);
      }
    };

    const handleResult = (previewImage) => {
      args.result(previewImage);
      setIsOpen(false);
      setIsShowPreview(false);
    };

    const handleClose = (cancelled) => {
      args.onClose(cancelled);
      setIsOpen(false);
      setIsShowPreview(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <CropperResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imageSource={imageSource}
          result={handleResult}
          onClose={handleClose}
          isShowPreview={isShowPreview}
          setIsShowPreview={setIsShowPreview}
        />
      </div>
    );
  },
};

export const WithPreview = {
  args: {
    isOpen: false,
    isCircle: false,
    imageSource: "",
    isShowPreview: false,
    fileType: "image/jpeg",
    previewTitle: "Upload Foto",
    previewDescription: "Max. size foto 10MB",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const [isShowPreview, setIsShowPreview] = useState(false);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageSource(URL.createObjectURL(file));
        setIsOpen(true);
      }
    };

    const handleResult = (previewImage) => {
      args.result(previewImage);
      setIsOpen(false);
      setIsShowPreview(false);
    };

    const handleClose = (cancelled) => {
      args.onClose(cancelled);
      setIsOpen(false);
      setIsShowPreview(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <CropperResponsive
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imageSource={imageSource}
          result={handleResult}
          onClose={handleClose}
          isShowPreview={isShowPreview}
          setIsShowPreview={setIsShowPreview}
        />
      </div>
    );
  },
};

export const InteractiveDemo = {
  args: {
    isOpen: false,
    isCircle: false,
    imageSource: "",
    isShowPreview: false,
    fileType: "image/jpeg",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageSource(URL.createObjectURL(file));
        setIsOpen(true);
      }
    };

    const handleResult = (previewImage) => {
      setCroppedImage(previewImage);
      args.result(previewImage);
      setIsOpen(false);
      setIsShowPreview(false);
    };

    const handleClose = (cancelled) => {
      args.onClose(cancelled);
      setIsOpen(false);
      setIsShowPreview(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-semibold">Responsive Cropper Demo</h3>

        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Circle Crop:</strong> {args.isCircle ? "Yes" : "No"}
            </p>
            <p>
              <strong>File Type:</strong> {args.fileType}
            </p>
            <p>
              <strong>Overlay Open:</strong> {isOpen ? "Yes" : "No"}
            </p>
            <p>
              <strong>Preview Open:</strong> {isShowPreview ? "Yes" : "No"}
            </p>
            <p>
              <strong>Cropped Result:</strong>{" "}
              {croppedImage ? "Generated" : "None"}
            </p>
          </div>

          <CropperResponsive
            {...args}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            imageSource={imageSource}
            result={handleResult}
            onClose={handleClose}
            isShowPreview={isShowPreview}
            setIsShowPreview={setIsShowPreview}
          />
        </div>
      </div>
    );
  },
};
