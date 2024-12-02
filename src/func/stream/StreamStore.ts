import { combine } from "zustand/middleware";
import { create } from "zustand";
import { StreamClient } from "./StreamClient";

export interface StreamMessage {
  client: StreamClient | null;
  connected: boolean;
}

export const StreamStore = create(
  combine({} as StreamMessage, (set) => ({
    updateClient: (c: StreamClient | null) => {
      set((state) => {
        return {
          ...state,
          client: c,
        };
      });
    },
    updateConnected: (c: boolean) => {
      set((state) => {
        return {
          ...state,
          connected: c,
        };
      });
    },
  })),
);
