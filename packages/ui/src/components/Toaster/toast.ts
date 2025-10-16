import { useToastStore } from "./toastStore";

export interface ToastInput {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export const toast = {
  success: (message: string, duration: number = 6000) => {
    useToastStore.getState().actions.addToast({
      message,
      type: "success",
      duration,
    });
  },

  error: (message: string, duration: number = 6000) => {
    useToastStore.getState().actions.addToast({
      message,
      type: "error",
      duration,
    });
  },

  info: (message: string, duration: number = 6000) => {
    useToastStore.getState().actions.addToast({
      message,
      type: "info",
      duration,
    });
  },
};