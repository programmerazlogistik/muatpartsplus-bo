import React from "react";

import { cn } from "@muatmuat/lib/utils";

import Button from "../Button/Button";
import { Modal, ModalContent, ModalHeader, ModalVariants } from "./Modal";

export interface ConfirmationModalConfig {
  text: string;
  className?: string;
}

export interface ConfirmationModalButtonConfig {
  classname?: string;
  text: string;
  onClick?: () => void;
}

export interface ConfirmationModalProps {
  size?: "small" | "big";
  variant?: ModalVariants;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: ConfirmationModalConfig;
  withCancel?: boolean;
  description?: ConfirmationModalConfig;
  cancel?: ConfirmationModalButtonConfig;
  confirm?: ConfirmationModalButtonConfig;
  className?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  size = "small",
  variant = "muattrans",
  isOpen,
  setIsOpen,
  title = { text: "", className: "" },
  withCancel = true,
  description = { text: "", className: "" },
  cancel = { classname: "", text: "", onClick: () => setIsOpen(false) },
  confirm = { classname: "", text: "", onClick: () => setIsOpen(false) },
  className = "",
}) => {
  const { text: titleText = "", className: titleClassName = "" } = title;
  const { text: descriptionText = "", className: descriptionClassName = "" } =
    description;
  const {
    classname: cancelClassname = "",
    text: cancelText = "",
    onClick: onCancel = () => setIsOpen(false),
  } = cancel;
  const {
    classname: confirmClassname = "",
    text: confirmText = "",
    onClick: onConfirm = () => setIsOpen(false),
  } = confirm;

  const modalClassnames: Record<string, string> = {
    small: "w-modal-small",
    big: "w-modal-big",
  };
  const modalClassname = modalClassnames[size] || modalClassnames.small;

  const secondaryButtonVariant: Record<string, string> = {
    muatparts: "muatparts-primary-secondary",
    muattrans: "muattrans-primary-secondary",
  };

  const primaryButtonVariant: Record<string, string> = {
    muatparts: "muatparts-primary",
    muattrans: "muattrans-primary",
  };

  return (
    <Modal closeOnOutsideClick={false} open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent className={cn(modalClassname, className)} type="muattrans">
        <ModalHeader size={size} variant={variant} />
        <div className="flex flex-col items-center gap-y-6 px-6 py-9">
          {titleText ? (
            <h1
              className={cn(
                "text-base font-bold leading-[19.2px] text-neutral-900",
                titleClassName
              )}
            >
              {titleText}
            </h1>
          ) : null}
          {descriptionText ? (
            <p
              className={cn(
                "text-center text-sm font-medium leading-[15.4px] text-neutral-900",
                descriptionClassName
              )}
            >
              {descriptionText}
            </p>
          ) : null}
          <div className="flex items-center gap-x-2">
            {withCancel && (
              <Button
                variant={
                  (secondaryButtonVariant[variant] ||
                    secondaryButtonVariant.muattrans) as any
                }
                className={cn("h-8", cancelClassname)}
                onClick={onCancel}
                type="button"
              >
                {cancelText}
              </Button>
            )}
            <Button
              variant={
                (primaryButtonVariant[variant] ||
                  primaryButtonVariant.muattrans) as any
              }
              className={cn("h-8", confirmClassname)}
              onClick={onConfirm}
              type="button"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
