import { combine } from "zustand/middleware";
import { create } from "zustand";
import { Hex } from "viem";

export interface WalletMessage {
  wallet: Hex;
  signer: Hex;
  contract: Hex;
}

export const WalletStore = create(
  combine({} as WalletMessage, (set) => ({
    updateWallet: (w: Hex) => {
      set((state) => {
        return {
          ...state,
          wallet: w,
        };
      });
    },
    updateSigner: (s: Hex) => {
      set((state) => {
        return {
          ...state,
          signer: s,
        };
      });
    },
    updateContract: (c: Hex) => {
      set((state) => {
        return {
          ...state,
          contract: c,
        };
      });
    },
  })),
);
