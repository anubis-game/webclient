import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultSubmitStatus } from "../submit/SubmitStatus";
import { DefaultTokenSymcol } from "../config/Config";
import { SubmitStatus } from "../submit/SubmitStatus";
import { TransferAction } from "./TransferAction";
import { TransferActionDeposit } from "./TransferAction";

export interface TransferMessage {
  action: TransferAction;
  amount: string;
  dialog: boolean;
  status: SubmitStatus;
  submit: boolean;
  symbol: string;
}

// newTransferMessage ensures that the transfer store is properly initialized
// before any component is rendered. We need to make sure that the default
// transfer status is initialized for the first button text that we want to
// show. And it is further important for the default transfer symbol to be set,
// because an otherwise empty string would break the rendering of some
// components.
const newTransferMessage = (sym: string = DefaultTokenSymcol): TransferMessage => {
  return {
    action: TransferActionDeposit,
    amount: "",
    dialog: false,
    status: DefaultSubmitStatus(),
    submit: false,
    symbol: sym,
  };
};

export const TransferStore = create(
  combine(newTransferMessage(), (set, get) => ({
    delete: () => {
      set(() => {
        // We reset the transfer store when the transfer dialog gets closed.
        // That is to reset all user input, with one exception. We want the
        // selected token symbol to remain selected, so that it does not revert
        // back to the default token symbol.
        return newTransferMessage(get().symbol);
      });
    },

    updateAction: (a: TransferAction) => {
      set((state) => {
        return {
          ...state,
          action: a,
        };
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

    updateSymbol: (s: string) => {
      set((state) => {
        return {
          ...state,
          symbol: s,
        };
      });
    },
  })),
);
