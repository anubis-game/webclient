import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultTokenSymcol } from "../config/Config";

export interface BalanceMessage {
  amount: string;
  dialog: boolean;
  submit: boolean;
  symbol: string;
}

// newBalanceMessage ensures that the balance store is properly initialized
// before any component is rendered. It is important for the default deposit
// symbol to be set, because an otherwise empty string would break the rendering
// of some components.
const newBalanceMessage = (): BalanceMessage => {
  return {
    amount: "",
    dialog: false,
    submit: false,
    symbol: DefaultTokenSymcol,
  };
};

export const DepositStore = create(
  combine(newBalanceMessage(), (set) => ({
    updateAmount: (v: string) => {
      set((state) => {
        return {
          ...state,
          amount: v,
        };
      });
    },

    updateDialog: (v: boolean) => {
      set((state) => {
        return {
          ...state,
          amount: v ? state.amount : "",
          dialog: v,
        };
      });
    },

    updateSubmit: (v: boolean) => {
      set((state) => {
        return {
          ...state,
          submit: v,
        };
      });
    },

    updateSymol: (v: string) => {
      set((state) => {
        return {
          ...state,
          symbol: v,
        };
      });
    },
  })),
);
