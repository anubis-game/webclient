import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultFormStatus } from "../../func/form/FormStatus";
import { DefaultTokenSymcol } from "../config/Config";
import { FormStatus } from "../../func/form/FormStatus";
import { FormStatusEnabled } from "../../func/form/FormStatus";
import { FormStatusInvalid } from "../../func/form/FormStatus";

export interface BalanceMessage {
  amount: string;
  dialog: boolean;
  status: FormStatus;
  submit: boolean;
  symbol: string;
}

// newBalanceMessage ensures that the balance store is properly initialized
// before any component is rendered. We need to make sure that the default
// deposit status is initialized for the first button text that we want to show.
// And it is further important for the default deposit symbol to be set, because
// an otherwise empty string would break the rendering of some components.
const newBalanceMessage = (): BalanceMessage => {
  return {
    amount: "",
    dialog: false,
    status: DefaultFormStatus("Choose an Amount"),
    submit: false,
    symbol: DefaultTokenSymcol,
  };
};

export const DepositStore = create(
  combine(newBalanceMessage(), (set, get) => ({
    delete: () => {
      set(() => {
        return newBalanceMessage();
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

    updateStatus: (v: FormStatus) => {
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

const verifyStatus = (amo: string, sym: string): FormStatus => {
  if (!amo) {
    return {
      phase: FormStatusInvalid,
      title: "Choose an Amount",
    };
  }

  if (amo.includes(".") || amo.includes("e")) {
    return {
      phase: FormStatusInvalid,
      title: `Only full ${sym}`,
    };
  }

  const num = amo ? Number(amo) : 0;

  if (num < 1) {
    return {
      phase: FormStatusInvalid,
      title: `Minimum ${1} ${sym}`,
    };
  }

  if (num > 10) {
    return {
      phase: FormStatusInvalid,
      title: `Maximum ${10} ${sym}`,
    };
  }

  return {
    phase: FormStatusEnabled,
    title: `Deposit ${amo} ${sym}`,
  };
};
