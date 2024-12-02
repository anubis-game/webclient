import { combine } from "zustand/middleware";
import { create } from "zustand";
import { QueryClient } from "@tanstack/react-query";

export interface ClaimQueryMessage {
  client: QueryClient;
  refresh: () => void;
};

const newClaimQueryMessage = (): ClaimQueryMessage => {
  return {
    client: new QueryClient(),
    refresh: () => { },
  };
};

export const QueryStore = create(
  combine(
    {
      wagmi: newClaimQueryMessage(),
    },
    (set) => ({
      updateWagmiRefresh: (r: () => void) => {
        set((state: { wagmi: ClaimQueryMessage }) => {
          return {
            ...state,
            wagmi: {
              ...state.wagmi,
              refresh: r,
            },
          };
        });
      },
    })
  )
);
