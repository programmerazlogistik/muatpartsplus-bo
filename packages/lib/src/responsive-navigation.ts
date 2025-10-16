"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { useShallowCompareEffect } from "@muatmuat/hooks/use-shallow-effect";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import { zustandDevtools } from "./utils";

/**
 * Entry in the navigation stack.
 */
export interface StackEntry {
  /** The route path (e.g., "/about") */
  path: string;
  /** The React element to render */
  component?: React.ReactNode;
  /** Optional parameters passed to the route */
  params: Record<string, any>;
}

/**
 * Available navigation actions.
 */
export interface NavigationActions {
  /** Push a new screen to the navigation stack */
  push: (path: string, params?: Record<string, any>) => void;
  /** Remove the top screen from the navigation stack */
  pop: () => void;
  /** Pop screens until reaching the specified path */
  popTo: (path: string) => void;
  /** Pop all screens except the first one */
  popToTop: () => void;
  /** Replace the current screen with a new one */
  replace: (path: string, params?: Record<string, any>) => void;
}

/**
 * Navigation state managed by Zustand.
 */
export interface NavigationState {
  /** Stack of route entries representing the navigation history */
  stack: StackEntry[];
  /** Whether the store has been hydrated from persisted storage */
  isHydrated: boolean;
  /** Whether the navigation system is ready */
  isReady: boolean;
  /** Whether real browser navigation is in progress */
  isDoingRealNavigation: boolean;
  /** Navigation actions */
  actions: NavigationActions & {
    setHasHydrated: () => void;
    setHasReady: () => void;
    setIsDoingRealNavigation: (value: boolean) => void;
  };
}

const useNavigationStore = create<NavigationState>()(
  persist(
    zustandDevtools(
      (set) => ({
        stack: [{ path: "/", params: {} }],
        isHydrated: false as boolean,
        isReady: false as boolean,
        isDoingRealNavigation: true as boolean,
        actions: {
          push: (path: string, params: Record<string, any> = {}) =>
            set((state: NavigationState) => ({
              stack: [...state.stack, { path, params }],
            })),
          pop: () =>
            set((state: NavigationState) => {
              if (state.stack.length > 1) {
                return { stack: state.stack.slice(0, -1) };
              }
              return state;
            }),
          popTo: (path: string) =>
            set((state: NavigationState) => {
              const targetIndex = state.stack.findIndex(
                (entry: StackEntry) => entry.path === path
              );
              if (targetIndex === -1) return state;
              return { stack: state.stack.slice(0, targetIndex + 1) };
            }),
          popToTop: () =>
            set((state: NavigationState) => ({
              stack: state.stack.slice(0, 1),
            })),
          replace: (path: string, params: Record<string, any> = {}) =>
            set(() => {
              return { stack: [{ path, params }] };
            }),

          setHasHydrated: () => set({ isHydrated: true }),
          setHasReady: () => set({ isReady: true }),
          setIsDoingRealNavigation: (value: boolean) =>
            set({ isDoingRealNavigation: value }),
        },
      }),
      { name: "responsive-navigation" }
    ),
    {
      name: "responsive-navigation",
      partialize: (state: NavigationState) => ({ stack: state.stack }),
      onRehydrateStorage: () => () => {
        setTimeout(() => {
          const state = useNavigationStore.getState();
          state?.actions?.setHasHydrated?.();
        }, 1000);
      },
    }
  )
);

const isValidScreenPath = (path: any): path is string =>
  typeof path === "string" && path.startsWith("/");

/**
 * Props for the ResponsiveProvider component.
 */
export interface ResponsiveProviderProps {
  children: React.ReactNode;
}

export const ResponsiveProvider = ({ children }: ResponsiveProviderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const screenSearchParam = searchParams.get("screen");
  const stack = useNavigationStore(useShallow((state) => state.stack));
  const {
    replace: replaceNavigation,
    setHasReady: setNavigationHasReady,
    popTo,
    setIsDoingRealNavigation,
  } = useNavigationStore((state) => state.actions);
  const isNavigationHydrated = useNavigationStore((state) => state.isHydrated);
  const hasCheckedInitial = useRef(false);
  const { isMobile } = useDevice();

  // Synchronize isDoingRealNavigation with stack length
  useEffect(() => {
    if (!isNavigationHydrated) return;

    const shouldBeRealNavigation = stack.length === 1;
    const currentState = useNavigationStore.getState();

    if (currentState.isDoingRealNavigation !== shouldBeRealNavigation) {
      setIsDoingRealNavigation(shouldBeRealNavigation);
    }
  }, [stack.length, isNavigationHydrated, setIsDoingRealNavigation]);

  useShallowCompareEffect(() => {
    if (hasCheckedInitial.current || !isMobile || !isNavigationHydrated) return;
    hasCheckedInitial.current = true;
    const currentStack = stack[stack.length - 1];
    if (!screenSearchParam) {
      if (currentStack?.path !== "/") {
        replaceNavigation("/");
      }
    } else if (decodeURIComponent(screenSearchParam) !== currentStack?.path) {
      const decoded = decodeURIComponent(screenSearchParam);
      if (isValidScreenPath(decoded)) {
        const foundEntry = stack.find((entry) => entry.path === decoded);
        if (foundEntry) {
          replaceNavigation(decoded, foundEntry.params);
        } else {
          replaceNavigation("/");
        }
      } else {
        replaceNavigation("/");
      }
    }
    setNavigationHasReady();
  }, [stack, screenSearchParam, isMobile, isNavigationHydrated]);

  // On stack change: update the search param if needed
  useShallowCompareEffect(() => {
    if (!isMobile || !isNavigationHydrated) return;
    const currentStack = stack[stack.length - 1];
    if (!currentStack) return; // Guard against empty stack

    const stackString = encodeURIComponent(currentStack.path);
    if (screenSearchParam !== stackString) {
      const params = new URLSearchParams(window.location.search);
      params.set("screen", stackString);

      // MODIFICATION 1: Use `push` to create browser history entries.
      if (searchParams.size > 0) {
        router.replace(`${window.location.pathname}?${params.toString()}`, {
          scroll: false,
        });
      } else {
        router.replace(`${window.location.pathname}?${params.toString()}`, {
          scroll: false,
        });
      }
    }
  }, [stack, searchParams, screenSearchParam, isMobile, isNavigationHydrated]);

  // Listen for browser back/forward button clicks
  useEffect(() => {
    if (!isMobile) return; // Only handle on mobile

    const handlePopState = () => {
      const state = useNavigationStore.getState();

      // If we're doing a real navigation (from router.back()), don't interfere
      if (state.isDoingRealNavigation) {
        state.actions.setIsDoingRealNavigation(false);
        return;
      }

      const newScreen =
        new URLSearchParams(window.location.search).get("screen") ?? "/";
      const decodedScreen = decodeURIComponent(newScreen);

      const currentStack = state.stack;
      const topOfStackPath = currentStack[currentStack.length - 1]?.path;

      // Only sync if the URL state is different from the stack state
      if (decodedScreen !== topOfStackPath) {
        // Check if the target screen exists in our stack
        const targetIndex = currentStack.findIndex(
          (entry) => entry.path === decodedScreen
        );

        if (targetIndex !== -1) {
          // If target exists in stack, pop to it
          popTo(decodedScreen);
        } else {
          // If target doesn't exist in stack, it means we went back beyond our virtual navigation
          // Reset to the base route
          const { replace: replaceNavigation } =
            useNavigationStore.getState().actions;
          replaceNavigation(decodedScreen);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [popTo, isMobile]);

  return children;
};

export const useResponsiveNavigation = () => {
  const router = useRouter();
  const {
    push,
    pop: popFromStack,
    popTo,
    popToTop,
    replace,
  } = useNavigationStore((state) => state.actions);
  const stack = useNavigationStore(useShallow((state) => state.stack));

  const pop = () => {
    // If stack has more than one entry, pop from virtual stack
    if (stack.length > 1) {
      console.log("Popping from virtual stack");
      popFromStack();
    } else {
      // If stack only has one entry, use real Next.js router back
      console.log("router.back()");
      router.back();
    }
  };

  return { push, pop, popTo, popToTop, replace };
};

export const useResponsiveRouteParams = () => {
  const stack = useNavigationStore(useShallow((state) => state.stack));
  return stack[stack.length - 1]?.params || {};
};

/**
 * Props for the ResponsiveRoute component.
 */
export interface ResponsiveRouteProps {
  path: string;
  component: React.ReactNode;
}

export const ResponsiveRoute = ({ path, component }: ResponsiveRouteProps) => {
  const stack = useNavigationStore(
    useShallow((state) => state.stack.slice(-1))
  );
  const isNavigationReady = useNavigationStore((state) => state.isReady);
  const current = stack[stack.length - 1];

  if (path !== current?.path || !isNavigationReady) return null;

  return component;
};
