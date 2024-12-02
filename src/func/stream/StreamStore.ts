import { combine } from "zustand/middleware";
import { create } from "zustand";

export interface StreamMessage {
  client: WebSocket | null;
  connected: boolean;
  ping: number;
  reader: (str: string) => void;
}

export const StreamStore = create(
  combine({} as StreamMessage, (set, get) => ({
    sendPing: () => {
      get().client?.send("ping," + Date.now().toString());
    },

    sendMessage: (str: string) => {
      get().client?.send(str);
    },

    updateClient: (c: WebSocket | null) => {
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
    updatePing: (p: number) => {
      set((state) => {
        return {
          ...state,
          ping: p,
        };
      });
    },
    updateReader: (r: (str: string) => void) => {
      set((state) => {
        return {
          ...state,
          reader: r,
        };
      });
    },
  })),
);
