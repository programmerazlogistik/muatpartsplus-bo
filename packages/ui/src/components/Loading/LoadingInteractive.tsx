"use client";

import * as React from "react";
import { useLoadingStore } from "./loadingStore";

export interface LoadingInteractiveProps {}

/**
 * Interactive loading component that responds to global loading state using Zustand store.
 * Features backdrop blur and centered loading animation. Only renders when loading is active.
 */
export default function LoadingInteractive(): React.ReactElement | null {
  const isGlobalLoading = useLoadingStore((state) => state.isGlobalLoading);
  const isTranslationsReady = true;

  if (isGlobalLoading || !isTranslationsReady) {
    return (
      <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/10 backdrop-blur-md">
        <img
          src={"/img/loading-animation.webp"}
          width={100}
          height={100}
          alt="loading"
        />
      </div>
    );
  }

  return null;
}
