import * as React from "react";

export interface CropperWebProps {
  imageFile?: File;
  imageSource?: string;
  result?: (croppedImage: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  title?: string;
  onApply?: (croppedImage: string) => void;
  aspectRatio?: number;
  viewMode?: number;
}

export interface CropperResponsiveProps {
  imageFile?: File;
  imageSource?: string;
  result?: (croppedImage: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  title?: string;
  onApply?: (croppedImage: string) => void;
  aspectRatio?: number;
  viewMode?: number;
}

export interface CropperScreenProps {
  imageFile?: File;
  imageSource?: string;
  result?: (croppedImage: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  title?: string;
  onApply?: (croppedImage: string) => void;
  aspectRatio?: number;
  viewMode?: number;
}

export interface CropperPreviewScreenProps {
  imageFile?: File;
  imageSource?: string;
  result?: (croppedImage: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  title?: string;
  onApply?: (croppedImage: string) => void;
  aspectRatio?: number;
  viewMode?: number;
}

export interface CropperPreviewResponsiveProps {
  imageFile?: File;
  imageSource?: string;
  result?: (croppedImage: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  title?: string;
  onApply?: (croppedImage: string) => void;
  aspectRatio?: number;
  viewMode?: number;
}

export interface CropperWebNewProps {
  imageFile?: File;
  imageSource?: string;
  result?: (croppedImage: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: (cancelled: boolean) => void;
  isCircle?: boolean;
  title?: string;
  onApply?: (croppedImage: string) => void;
  aspectRatio?: number;
  viewMode?: number;
}