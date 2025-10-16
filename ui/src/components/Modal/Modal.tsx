"use client";

import { createContext, useContext, useRef, useState } from "react";

import { cn } from "@muatmuat/lib";
import * as Dialog from "@radix-ui/react-dialog";

import IconComponent from "../IconComponent/IconComponent";

interface ModalContextValue {
  open: boolean;
  withCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  [key: string]: any;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("useModal must be used within a Modal");
  }
  return context;
};

export interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  withCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  [key: string]: any;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  withCloseButton = true,
  closeOnOutsideClick = false,
  ...props
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpenState: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpenState);
    }
    onOpenChange?.(newOpenState);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <ModalContext.Provider
        value={{ open: isOpen, withCloseButton, closeOnOutsideClick, ...props }}
      >
        {children}
      </ModalContext.Provider>
    </Dialog.Root>
  );
};

export interface ModalTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const ModalTitle: React.FC<ModalTitleProps> = ({
  className,
  children,
}) => {
  return (
    <Dialog.Title
      className={cn(
        "text-center text-base font-bold text-neutral-900",
        className
      )}
    >
      {children}
    </Dialog.Title>
  );
};

export interface ModalTriggerProps {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  className,
  children,
  asChild = true,
}) => {
  return (
    <Dialog.Trigger asChild={asChild} className={className}>
      {children}
    </Dialog.Trigger>
  );
};

export interface ModalContentProps {
  type?:
    | "muatmuat"
    | "muatparts"
    | "muatparts-plus"
    | "muattrans"
    | "lightbox"
    | "primary";
  children: React.ReactNode;
  className?: string;
  appearance?: {
    backgroudClassname?: string;
    closeButtonClassname?: string;
  };
  [key: string]: any;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  type = "muatmuat",
  children,
  className,
  appearance,
  ...props
}) => {
  const { withCloseButton = true, closeOnOutsideClick = false } = useModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeIconStyles: Record<string, string> = {
    muatmuat: "text-primary-700",
    muatparts: "text-muat-parts-non-800",
    "muatparts-plus": "text-muat-parts-member-900",
    muattrans: "text-muat-trans-secondary-900",
    lightbox: "text-primary-700",
    primary: "text-blue-500",
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        data-stack-item="true"
        className={cn(
          "fixed inset-0 z-[50] bg-black/25",
          "data-[state=open]:animate-overlay-show",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          appearance?.backgroudClassname
        )}
      >
        {type === "lightbox" && (
          <Dialog.Close className="absolute left-4 top-[55px] z-[9998] block text-white md:hidden">
            <IconComponent
              className="text-white"
              src="/icons/close20.svg"
              width={24}
              height={24}
            />
          </Dialog.Close>
        )}
      </Dialog.Overlay>

      <Dialog.Content
        ref={dialogRef}
        data-stack-content="true"
        onEscapeKeyDown={(e) => {
          const stackItems = Array.from(
            document.querySelectorAll('[data-stack-item="true"]')
          );
          const isTopmost =
            dialogRef.current?.parentElement?.parentElement ===
            stackItems[stackItems.length - 1];
          if (!isTopmost) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          if (!closeOnOutsideClick) {
            e.preventDefault();
          }
        }}
        {...props}
        className={cn(
          "fixed left-1/2 top-1/2 z-[51] -translate-x-1/2 -translate-y-1/2",
          "rounded-xl bg-neutral-50 shadow-lg",
          "data-[state=open]:animate-content-show",
          "data-[state=closed]:animate-content-hide",
          type === "lightbox" && "bg-transparent shadow-none",
          className
        )}
      >
        {children}
        {withCloseButton && (
          <Dialog.Close asChild>
            <button
              className={cn(
                "absolute right-2 top-2 z-50 flex cursor-pointer items-center justify-center rounded-full bg-neutral-50",
                closeIconStyles[type] || closeIconStyles.muattrans,
                appearance?.closeButtonClassname
              )}
              aria-label="Close"
            >
              <IconComponent
                className={cn("size-6 md:size-5")}
                src="/icons/close20.svg"
              />
            </button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const headerBackgroundVariants = {
  muattrans: "bg-muat-trans-primary-400",
  "muatparts-plus": "bg-muat-parts-member-900",
} as const;

const headerkiriSrc = {
  muattrans: "/img/header-modal/header-kiri.svg",
  "muatparts-plus": "/img/header-modal/header-kiri-muatparts-plus.svg",
} as const;

const headerHeaderSrc = {
  muattrans: "/img/header-modal/muatmuat-brown.svg",
  "muatparts-plus": "/img/header-modal/muatparts-plus.svg",
} as const;

const headerKananSrc = {
  muattrans: "/img/header-modal/header-kanan.svg",
  "muatparts-plus": "/img/header-modal/header-kanan-muatparts-plus.svg",
} as const;

export type ModalVariants = "muattrans" | "muatparts-plus";

export interface ModalHeaderProps {
  className?: string;
  variant?: ModalVariants;
  size?: "small" | "big";
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  className,
  variant = "muattrans",
}) => {
  return (
    <div
      className={cn(
        "relative flex h-[70px] justify-between overflow-hidden rounded-t-xl",
        headerBackgroundVariants[variant],
        className
      )}
    >
      <div>
        <img
          alt="svg header modal kiri"
          src={headerkiriSrc[variant]}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="my-auto">
        <img alt="logo muatmuat header coklat" src={headerHeaderSrc[variant]} />
      </div>
      <div>
        <img
          alt="svg header modal kanan "
          src={headerKananSrc[variant]}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export interface ModalFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded-b-xl bg-white px-6 pb-9 pt-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface ModalCloseProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const ModalClose: React.FC<ModalCloseProps> = ({
  asChild = true,
  children,
}) => {
  return <Dialog.Close asChild={asChild}>{children}</Dialog.Close>;
};
