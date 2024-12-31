import { combine } from "zustand/middleware";
import { create } from "zustand";
import { ChainConfig } from "./ChainConfig";
import { DefaultChainId } from "../config/Config";
import { ChainList } from "./ChainList";

export interface ChainMessage {
  // active is the chain ID being used right now.
  active: number;
  // chains is the map of all selectable chains.
  chains: Map<number, ChainConfig>;
}

const newChainMessage = (): ChainMessage => {
  const m: Map<number, ChainConfig> = new Map();

  for (const x of ChainList) {
    m.set(x.viem.id, x);
  }

  return {
    active: DefaultChainId,
    chains: m,
  };
};

export const ChainStore = create(
  combine(newChainMessage(), (set, get) => ({
    getActive: (): ChainConfig => {
      return get().chains.get(get().active)!;
    },

    getAll: (): ChainConfig[] => {
      return Array.from(get().chains.values());
    },

    updateActive: (i: number) => {
      set((state: ChainMessage) => {
        return {
          ...state,
          active: i,
        };
      });
    },

    updateChain: (c: ChainConfig) => {
      set((state: ChainMessage) => {
        const m = new Map(state.chains);
        m.set(c.viem.id, c);
        return {
          ...state,
          chains: m,
        };
      });
    },
  })),
);
