import * as React from "react";

import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultSubmitStatus } from "../submit/SubmitStatus";
import { DefaultTokenSymcol } from "../config/Config";
import { SubmitStatus } from "../submit/SubmitStatus";
import { SubmitStatusEnabled } from "../submit/SubmitStatus";
import { SubmitStatusInvalid } from "../submit/SubmitStatus";

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
const newDepositMessage = (): DepositMessage => {
  return {
    amount: "",
    dialog: false,
    status: DefaultSubmitStatus("Choose an Amount"),
    submit: false,
    symbol: DefaultTokenSymcol,
  };
};

export const DepositStore = create(
  combine(newDepositMessage(), (set, get) => ({
    delete: () => {
      set(() => {
        return newDepositMessage();
      });
    },

    updateAmount: (a: string) => {
      set((state) => {
        return {
          ...state,
          status: verifyStatus(a, get().symbol),
          amount: a,
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
          status: verifyStatus(get().amount, s),
          symbol: s,
        };
      });
    },
  })),
);

const verifyStatus = (amo: string, sym: string): SubmitStatus => {
  if (!amo) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, "Choose an Amount"),
    };
  }

  if (amo.includes(".") || amo.includes("e")) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, `Only full ${sym}`),
    };
  }

  const num = amo ? Number(amo) : 0;

  if (num < 1) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, `Minimum ${1} ${sym}`),
    };
  }

  if (num > 10) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, `Maximum ${10} ${sym}`),
    };
  }

  return {
    lifecycle: SubmitStatusEnabled,
    container: React.createElement("div", null, `Deposit ${amo} ${sym}`),
  };
};
