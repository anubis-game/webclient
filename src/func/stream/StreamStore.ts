import { Address } from "viem";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { SchemaAction } from "../schema/SchemaAction";
import { SchemaEncodeAction } from "../schema/SchemaEncode";
import { SchemaEncodeAddress } from "../schema/SchemaEncode";

export interface StreamMessage {
  auth: string;
  client: WebSocket;
  connected: boolean;
  ping: number;
  pong: number;
  user: Address[];
  reader: (str: string) => void;
}

const newStreamMessage = (): StreamMessage => {
  const cli = new WebSocket("");

  // All we want to begin with is an initialized websocket type. We create a
  // fake one and close it immediately so that we do not run into timeout
  // errors.
  cli.close();

  return {
    auth: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // TODO remove
    client: cli,
    connected: false,
    ping: 0,
    pong: 0,
    user: [],
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

    createUser: (a: Address) => {
      set((state) => {
        return {
          ...state,
          user: [...state.user, a],
        };
      });
    },

    deleteUser: (a: Address) => {
      set((state) => {
        return {
          ...state,
          user: state.user.filter((x) => x !== a),
        };
      });
    },

    sendAuth: () => {
      get().client.send(SchemaEncodeAction(SchemaAction.Auth));
    },

    sendJoin: () => {
      get().client.send(SchemaEncodeAction(SchemaAction.Join));
    },

    sendKill: (w: Address, l: Address) => {
      get().client.send(SchemaEncodeAddress(SchemaAction.Kill, w, l));
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
