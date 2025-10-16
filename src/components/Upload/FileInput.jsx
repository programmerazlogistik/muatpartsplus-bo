import { useRef, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { IconComponent } from "@muatmuat/ui/IconComponent";

// Simple UploadButton component
const UploadButton = ({
  label,
  format = "Format file jpg/png/pdf/zip max. 5MB",
  error,
  messageInvalidFormat = "Format tidak sesuai",
  onChange,
  onBlur,
  disabled,
  accept = "image/jpeg,image/png,application/pdf,application/zip",
}) => {
  const fileInputRef = useRef(null);
  const [invalidTypeError, setInvalidTypeError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    // Clear any previous error when new file is selected
    setInvalidTypeError(null);

    // Check if file is selected
    if (!file) {
      if (onChange) {
        onChange(null);
      }
      return;
    }

    // Validate file type if accept is specified
    if (accept && accept !== "") {
      const acceptTypes = accept.split(",").map((type) => type.trim());
      const isValidType =
        acceptTypes.includes(file.type) || acceptTypes.includes("*");

      if (!isValidType) {
        // Invalid file type - clear the input and set error
        setInvalidTypeError(messageInvalidFormat);
        if (event.target) {
          event.target.value = null;
        }
        return;
      }
    }

    if (onChange) {
      onChange(file);
    }
    // Reset input value to allow re-selecting the same file later
    if (event.target) {
      event.target.value = null;
    }
  };

  const handleButtonClick = (event) => {
    // Prevent default and stop propagation
    event.preventDefault();
    event.stopPropagation();

    // Directly trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="muatparts-primary-secondary"
          className="h-8 cursor-pointer rounded-[20px] px-6 py-2 text-sm font-semibold"
          disabled={disabled}
          onClick={handleButtonClick}
        >
          {label || "Unggah"}
        </Button>

        {error || invalidTypeError ? (
          <span className="text-xxs font-medium text-error-500">
            {invalidTypeError || error}
          </span>
        ) : (
          <span className="text-sm font-medium text-neutral-500">{format}</span>
        )}
      </div>
    </div>
  );
};

/**
 * A preview component shown after a file is selected.
 * It displays the file name and provides options to remove or change the file.
 * @param {{ file: File; onRemove: () => void; name: string; disabled?: boolean; }} props
 */
const FilePreview = ({
  file,
  onRemove,
  name,
  disabled,
  accept,
  onChange,
  messageInvalidFormat = "Format tidak sesuai",
}) => {
  const fileInputRef = useRef(null);
  const [invalidTypeError, setInvalidTypeError] = useState(null);

  const handleRemove = () => {
    onRemove();
  };

  const handleChangeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files?.[0];

    // Clear any previous error when new file is selected
    setInvalidTypeError(null);

    // Check if file is selected
    if (!newFile) {
      return;
    }

    // Validate file type if accept is specified
    if (accept && accept !== "") {
      const acceptTypes = accept.split(",").map((type) => type.trim());
      const isValidType =
        acceptTypes.includes(newFile.type) || acceptTypes.includes("*");

      if (!isValidType) {
        // Invalid file type - clear the input and set error
        setInvalidTypeError(messageInvalidFormat);
        if (event.target) {
          event.target.value = null;
        }
        return;
      }
    }

    if (newFile) {
      onRemove(); // Clear current file first
      // The parent will handle the new file selection through its own onChange
      setTimeout(() => {
        if (onChange) {
          onChange(newFile);
        }
      }, 0);
    }
    // Reset input value to allow re-selecting the same file later
    if (event.target) {
      event.target.value = null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span
          className="w-[178px] truncate text-sm font-medium text-success-400"
          title={file.name}
        >
          {file.name}
        </span>
        {!disabled && (
          <>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove file"
              className="flex-shrink-0"
            >
              <IconComponent
                src="/svg/icon-close.svg"
                className="size-3 text-neutral-700"
              />
            </button>
            <button
              type="button"
              onClick={handleChangeFile}
              className="cursor-pointer text-sm font-medium text-primary-700"
            >
              Ubah File
            </button>
            {/* Hidden input for file change */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
      {invalidTypeError && (
        <span className="mt-1 text-sm text-error-500">{invalidTypeError}</span>
      )}
    </div>
  );
};

/**
 * A complete file input component that handles both the upload button state and
 * the file preview state. Designed to be a drop-in replacement for a standard
 * file input within a react-hook-form structure.
 *
 * @param {object} props The component props, compatible with react-hook-form's register.
 * @param {File | null} props.value The file object from the form state.
 * @param {(file: File | null) => void} props.onChange The function to call when the file changes.
 * @param {string} props.name The name of the input field.
 * @param {string} [props.label="Unggah"] The label for the upload button.
 * @param {string} [props.format="Format file jpg/png/pdf/zip max. 5MB"] The helper text for file formats.
 * @param {string} [props.error] The error message to display.
 * @param {boolean} [props.disabled=false] Whether the input is disabled.
 * @param {string} [props.messageInvalidFormat="Format tidak sesuai"] The error message for invalid file types.
 */
export const FileInput = ({
  value,
  onChange,
  name,
  label,
  format,
  error,
  disabled = false,
  accept = "image/jpeg,image/png,application/pdf,application/zip",
  messageInvalidFormat = "Format tidak sesuai",
  ...props
}) => {
  const handleRemove = () => {
    if (onChange) {
      onChange(null); // Clear the file in the form state
    }
  };

  const handleChange = (file) => {
    if (onChange) {
      onChange(file);
    }
  };

  return (
    <div>
      {value instanceof File ? (
        <FilePreview
          file={value}
          onRemove={handleRemove}
          name={name}
          disabled={disabled}
          accept={accept}
          onChange={handleChange}
          messageInvalidFormat={messageInvalidFormat}
        />
      ) : (
        <UploadButton
          name={name}
          label={label}
          format={format}
          error={error}
          onChange={handleChange}
          disabled={disabled}
          accept={accept}
          messageInvalidFormat={messageInvalidFormat}
          {...props}
        />
      )}
    </div>
  );
};
