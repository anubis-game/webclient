import { combine } from "zustand/middleware";
import { create } from "zustand";

export interface BalanceMessage {
  amount: string;
  dialog: boolean;
  submit: boolean;
}

export const DepositStore = create(
  combine({} as BalanceMessage, (set) => ({
    updateDepositAmount: (v: string) => {
      set((state) => {
        return {
          ...state,
          amount: v,
        };
      });
    },

    updateDepositDialog: (v: boolean) => {
      set((state) => {
        return {
          ...state,
          amount: v ? state.amount : "",
          dialog: v,
        };
      });
    },

    updateDepositSubmit: (v: boolean) => {
      set((state) => {
        return {
          ...state,
          submit: v,
        };
      });
    },
  })),
);
