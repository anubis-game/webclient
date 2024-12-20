import { combine } from "zustand/middleware";
import { create } from "zustand";

export interface BalanceMessage {
  depositAmount: string;
  depositDialog: boolean;
  depositSubmit: boolean;
}

export const BalanceStore = create(
  combine({} as BalanceMessage, (set) => ({
    updateDepositAmount: (v: string) => {
      set((state) => {
        return {
          ...state,
          depositAmount: v,
        };
      });
    },

    updateDepositDialog: (v: boolean) => {
      set((state) => {
        return {
          ...state,
          depositAmount: v ? state.depositAmount : "",
          depositDialog: v,
        };
      });
    },

    updateDepositSubmit: (v: boolean) => {
      set((state) => {
        return {
          ...state,
          depositSubmit: v,
        };
      });
    },
  })),
);
