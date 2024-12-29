import * as ReactDOMServer from "react-dom/server";

import { combine } from "zustand/middleware";
import { create } from "zustand";
import { HashString } from "../string/HashString";
import { ToastObject } from "./ToastObject";

export interface ToastMessage {
  toasts: ToastObject[];
}

const newToastMessage = (): ToastMessage => {
  return {
    toasts: [],
  };
};

export const ToastStore = create(
  combine(newToastMessage(), (set) => ({
    createToast: async (t: ToastObject) => {
      {
        t.hash = await HashString(t.hash || "", ReactDOMServer.renderToString(t.node));
      }

      set((state) => {
        return {
          ...state,
          toasts: [...state.toasts, t],
        };
      });
    },

    deleteToast: (h: string) => {
      set((state) => {
        return {
          ...state,
          toasts: [...state.toasts.filter((x) => x.hash !== h)],
        };
      });
    },
  })),
);
