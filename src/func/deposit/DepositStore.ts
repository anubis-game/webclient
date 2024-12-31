import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultSubmitStatus } from "../submit/SubmitStatus";
import { DefaultTokenSymcol } from "../config/Config";
import { SubmitStatus } from "../submit/SubmitStatus";

export interface DepositMessage {
  amount: string;
  dialog: boolean;
  status: SubmitStatus;
  submit: boolean;
  symbol: string;
}

// newDepositMessage ensures that the deposit store is properly initialized
// before any component is rendered. We need to make sure that the default
// deposit status is initialized for the first button text that we want to show.
// And it is further important for the default deposit symbol to be set, because
// an otherwise empty string would break the rendering of some components.
const newDepositMessage = (sym: string = DefaultTokenSymcol): DepositMessage => {
  return {
    amount: "",
    dialog: false,
    status: DefaultSubmitStatus(),
    submit: false,
    symbol: sym,
  };
};

export const DepositStore = create(
  combine(newDepositMessage(), (set, get) => ({
    delete: () => {
      set(() => {
        // We reset the deposit store when the deposit dialog gets closed. That
        // is to reset all user input, with one exception. We want the selected
        // token symbol to remain selected, so that it does not revert back to
        // the default token symbol.
        return newDepositMessage(get().symbol);
      });
    },

    updateAmount: (a: string) => {
      set((state) => {
        return {
          ...state,
          amount: a,
        };
      });
    },

    updateDialog: (v: boolean) => {
      set((state) => {
        return {
          ...state,
          dialog: v,
        };
      });
    },

    updateStatus: (v: SubmitStatus) => {
      set((state) => {
        return {
          ...state,
          status: v,
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

    updateSymol: (s: string) => {
      set((state) => {
        return {
          ...state,
          symbol: s,
        };
      });
    },
  })),
);
