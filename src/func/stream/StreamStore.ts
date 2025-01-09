import { combine } from "zustand/middleware";
import { create } from "zustand";
import { SchemaAction } from "../schema/SchemaAction";
import { SchemaEncodeAction } from "../schema/SchemaEncode";

export interface StreamMessage {
  auth: string;
  client: WebSocket;
  connected: boolean;
  ping: number;
  pong: number;
  reader: (str: string) => void;
}

const newStreamMessage = (): StreamMessage => {
  return {
    auth: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // TODO remove
    client: new WebSocket(""),
    connected: false,
    ping: 0,
    pong: 0,
    reader: () => {},
  };
};

export const StreamStore = create(
  combine(newStreamMessage(), (set, get) => ({
    delete: () => {
      get().client.close();

      set(() => {
        return newStreamMessage();
      });
    },

    sendAuth: () => {
      get().client.send(SchemaEncodeAction(SchemaAction.Auth));
    },

    sendPing: () => {
      const now = performance.now();

      get().client.send(SchemaEncodeAction(SchemaAction.Ping));

      set((state) => {
        return {
          ...state,
          ping: now,
        };
      });
    },

    sendMessage: (str: string) => {
      get().client.send(str);
    },

    updateAuth: (a: string) => {
      set((state) => {
        return {
          ...state,
          auth: a,
        };
      });
    },

    updateClient: (c: WebSocket) => {
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

    updatePong: (p: number) => {
      set((state) => {
        return {
          ...state,
          pong: p,
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
