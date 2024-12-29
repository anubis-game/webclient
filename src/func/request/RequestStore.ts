import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultFormStatus } from "../form/FormStatus";
import { DefaultTokenSymcol } from "../config/Config";
import { FormStatus } from "../form/FormStatus";

export interface RequestMessage {
  amount: string;
  dialog: boolean;
  status: FormStatus;
  submit: boolean;
  symbol: string;
}

// newRequestMessage ensures that the request store is properly initialized
// before any component is rendered. We need to make sure that the default
// deposit status is initialized for the first button text that we want to show.
// And it is further important for the default deposit symbol to be set, because
// an otherwise empty string would break the rendering of some components.
const newRequestMessage = (): RequestMessage => {
  return {
    amount: "",
    dialog: false,
    status: DefaultFormStatus("Choose an Amount"),
    submit: false,
    symbol: DefaultTokenSymcol,
  };
};

export const RequestStore = create(
  combine(newRequestMessage(), (set) => ({
    delete: () => {
      set(() => {
        return newRequestMessage();
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
          symbol: s,
        };
      });
    },
  })),
);
