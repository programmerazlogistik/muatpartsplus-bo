import { useState } from "react";

import { CropperWebNew } from "@muatmuat/ui/Cropper";

export default {
  title: "Components/CropperWebNew",
  component: CropperWebNew,
  parameters: {
    docs: {
      description: {
        component:
          "An enhanced web-based image cropper component with variant support, improved styling, and internationalization.",
      },
    },
  },
  argTypes: {
    imageFile: {
      control: "object",
      description: "The image file to be cropped",
    },
    imageSource: {
      control: "text",
      description: "The image source URL or data URL",
    },
    result: {
      action: "result",
      description: "Callback function triggered when cropping is completed",
    },
    isOpen: {
      control: "boolean",
      description: "Whether the cropper modal is open",
      defaultValue: false,
    },
    setIsOpen: {
      action: "setIsOpen",
      description: "Function to control modal open state",
    },
    onClose: {
      action: "close",
      description: "Callback function triggered when modal is closed",
    },
    isCircle: {
      control: "boolean",
      description: "Whether to crop as a circle",
      defaultValue: false,
    },
    title: {
      control: "text",
      description: "Modal title text",
    },
    variant: {
      control: "select",
      options: ["muatparts", "muatrans"],
      description: "Button styling variant",
      defaultValue: "muatrans",
    },
    t: {
      control: "object",
      description: "Translation function",
    },
  },
};

export const Default = {
  args: {
    isOpen: false,
    isCircle: false,
    variant: "muatrans",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageSource, setImageSource] = useState("");

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageSource(URL.createObjectURL(file));
        setIsOpen(true);
      }
    };

    const handleResult = (croppedFile) => {
      args.result(croppedFile);
      setIsOpen(false);
    };

    return (
      <div className="p-6">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <CropperWebNew
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imageFile={imageFile}
          imageSource={imageSource}
          result={handleResult}
        />
      </div>
    );
  },
};

export const MuatpartsVariant = {
  args: {
    isOpen: false,
    isCircle: false,
    variant: "muatparts",
    title: "Upload Profile Picture",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageSource, setImageSource] = useState("");

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageSource(URL.createObjectURL(file));
        setIsOpen(true);
      }
    };

    const handleResult = (croppedFile) => {
      args.result(croppedFile);
      setIsOpen(false);
    };

    return (
      <div className="p-6">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <CropperWebNew
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imageFile={imageFile}
          imageSource={imageSource}
          result={handleResult}
        />
      </div>
    );
  },
};

export const CircleCrop = {
  args: {
    isOpen: false,
    isCircle: true,
    variant: "muatrans",
    title: "Crop Avatar",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageSource, setImageSource] = useState("");

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageSource(URL.createObjectURL(file));
        setIsOpen(true);
      }
    };

    const handleResult = (croppedFile) => {
      args.result(croppedFile);
      setIsOpen(false);
    };

    return (
      <div className="p-6">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <CropperWebNew
          {...args}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imageFile={imageFile}
          imageSource={imageSource}
          result={handleResult}
        />
      </div>
    );
  },
};

export const InteractiveDemo = {
  args: {
    isOpen: false,
    isCircle: false,
    variant: "muatrans",
    title: "Enhanced Cropper Demo",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageSource, setImageSource] = useState("");
    const [croppedImage, setCroppedImage] = useState(null);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageSource(URL.createObjectURL(file));
        setIsOpen(true);
      }
    };

    const handleResult = (croppedFile) => {
      setCroppedImage(croppedFile);
      args.result(croppedFile);
      setIsOpen(false);
    };

    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Enhanced Cropper Demo</h3>

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
              <strong>Variant:</strong> {args.variant}
            </p>
            <p>
              <strong>Circle Crop:</strong> {args.isCircle ? "Yes" : "No"}
            </p>
            <p>
              <strong>Title:</strong> {args.title}
            </p>
            <p>
              <strong>Selected File:</strong>{" "}
              {imageFile ? imageFile.name : "None"}
            </p>
            <p>
              <strong>Cropped Result:</strong>{" "}
              {croppedImage ? croppedFile?.name : "None"}
            </p>
          </div>

          <CropperWebNew
            {...args}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            imageFile={imageFile}
            imageSource={imageSource}
            result={handleResult}
          />
        </div>
      </div>
    );
  },
};
