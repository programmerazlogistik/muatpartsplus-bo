import { useState } from "react";

import { Dropzone } from "@muatmuat/ui/Dropzone";

export default {
  title: "Components/Dropzone",
  component: Dropzone,
  parameters: {
    docs: {
      description: {
        component:
          "A drag-and-drop file upload component with loading states, file preview, and customizable placeholders.",
      },
    },
  },
  argTypes: {
    onUpload: {
      description: "Function to call when a file is uploaded",
      action: "file uploaded",
    },
    loading: {
      description: "Whether the upload is in progress",
      control: { type: "boolean" },
    },
    file: {
      description: "The uploaded file object",
      control: { type: "object" },
    },
    placeholder: {
      description: "Placeholder text or element to display when no file",
      control: { type: "text" },
    },
    renderPlaceholder: {
      description: "Custom placeholders for different states",
      control: { type: "object" },
    },
    className: {
      description: "Additional CSS classes for the component",
      control: { type: "text" },
    },
    label: {
      description: "The label text for the item",
      control: { type: "text" },
    },
    info: {
      description: "Additional info for the item",
      control: { type: "text" },
    },
  },
};

const createMockFile = (name = "test-file.jpg", size = 1024 * 100) => {
  const file = new File(["mock content"], name, { type: "image/jpeg" });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

export const Default = {
  args: {
    loading: false,
    file: null,
    placeholder: "Unggah atau letakkan file di sini",
  },
  render: (args) => {
    const [file, setFile] = useState(args.file);
    const [loading, setLoading] = useState(args.loading);

    const handleUpload = (uploadedFile) => {
      setFile(uploadedFile);
      args.onUpload(uploadedFile);
    };

    return (
      <div className="w-96">
        <DropzoneComponent
          {...args}
          file={file}
          loading={loading}
          onUpload={handleUpload}
        />
      </div>
    );
  },
};

export const Loading = {
  args: {
    loading: true,
    file: null,
  },
  render: (args) => {
    const [file, setFile] = useState(args.file);
    const [loading, setLoading] = useState(args.loading);

    const handleUpload = (uploadedFile) => {
      setLoading(true);
      setFile(uploadedFile);
      args.onUpload(uploadedFile);

      // Simulate upload completion
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div className="w-96">
        <DropzoneComponent
          {...args}
          file={file}
          loading={loading}
          onUpload={handleUpload}
        />
      </div>
    );
  },
};

export const WithFile = {
  args: {
    loading: false,
    file: createMockFile("document.pdf", 1024 * 500),
  },
  render: (args) => {
    const [file, setFile] = useState(args.file);
    const [loading, setLoading] = useState(args.loading);

    const handleUpload = (uploadedFile) => {
      setFile(uploadedFile);
      args.onUpload(uploadedFile);
    };

    return (
      <div className="w-96">
        <DropzoneComponent
          {...args}
          file={file}
          loading={loading}
          onUpload={handleUpload}
        />
      </div>
    );
  },
};

export const CustomPlaceholder = {
  args: {
    loading: false,
    file: null,
    placeholder: "Pilih gambar untuk diunggah",
    renderPlaceholder: {
      default: (
        <div className="flex flex-col items-center gap-3">
          <div className="text-2xl">📁</div>
          <p className="text-sm font-medium text-neutral-700">
            Klik untuk memilih file
          </p>
        </div>
      ),
      loading: (
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-700"></div>
          <p className="text-sm font-medium text-neutral-700">
            Memproses file...
          </p>
        </div>
      ),
      fileUploaded: (
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl">✅</div>
          <p className="text-sm font-medium text-green-600">
            File berhasil diunggah!
          </p>
        </div>
      ),
    },
  },
  render: (args) => {
    const [file, setFile] = useState(args.file);
    const [loading, setLoading] = useState(args.loading);

    const handleUpload = (uploadedFile) => {
      setFile(uploadedFile);
      args.onUpload(uploadedFile);
    };

    return (
      <div className="w-96">
        <DropzoneComponent
          {...args}
          file={file}
          loading={loading}
          onUpload={handleUpload}
        />
      </div>
    );
  },
};

export const ErrorState = {
  args: {
    loading: false,
    file: null,
    renderPlaceholder: {
      error: (
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl">❌</div>
          <p className="text-sm font-medium text-red-600">
            Gagal mengunggah file
          </p>
        </div>
      ),
    },
  },
  render: (args) => {
    const [file, setFile] = useState(args.file);
    const [loading, setLoading] = useState(args.loading);
    const [error, setError] = useState(false);

    const handleUpload = (uploadedFile) => {
      setLoading(true);

      // Simulate error
      setTimeout(() => {
        setLoading(false);
        setError(true);
        args.onUpload(uploadedFile);
      }, 1500);
    };

    return (
      <div className="w-96">
        <DropzoneComponent
          {...args}
          file={file}
          loading={loading}
          onUpload={handleUpload}
          renderPlaceholder={{
            ...args.renderPlaceholder,
            default: error
              ? args.renderPlaceholder.error
              : args.renderPlaceholder?.default,
          }}
        />
      </div>
    );
  },
};

export const MultipleFileTypes = {
  args: {
    loading: false,
    file: null,
    accept: "image/*,.pdf,.doc,.docx",
  },
  render: (args) => {
    const [file, setFile] = useState(args.file);
    const [loading, setLoading] = useState(args.loading);

    const handleUpload = (uploadedFile) => {
      setFile(uploadedFile);
      args.onUpload(uploadedFile);
    };

    return (
      <div className="w-96">
        <DropzoneComponent
          {...args}
          file={file}
          loading={loading}
          onUpload={handleUpload}
        />
      </div>
    );
  },
};

export const CustomStyling = {
  args: {
    loading: false,
    file: null,
    className: "border-green-500 bg-green-50",
  },
  render: (args) => {
    const [file, setFile] = useState(args.file);
    const [loading, setLoading] = useState(args.loading);

    const handleUpload = (uploadedFile) => {
      setFile(uploadedFile);
      args.onUpload(uploadedFile);
    };

    return (
      <div className="w-96">
        <DropzoneComponent
          {...args}
          file={file}
          loading={loading}
          onUpload={handleUpload}
        />
      </div>
    );
  },
};

export const Playground = {
  args: {
    loading: false,
    file: null,
    placeholder: "Unggah atau letakkan file di sini",
    className: "",
    label: "",
    info: "",
  },
  render: (args) => {
    const [file, setFile] = useState(args.file);
    const [loading, setLoading] = useState(args.loading);

    const handleUpload = (uploadedFile) => {
      setFile(uploadedFile);
      args.onUpload(uploadedFile);
    };

    return (
      <div className="w-96">
        <DropzoneComponent
          {...args}
          file={file}
          loading={loading}
          onUpload={handleUpload}
        />
      </div>
    );
  },
};
