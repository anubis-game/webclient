import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultSubmitStatus } from "../submit/SubmitStatus";
import { SubmitStatus } from "../submit/SubmitStatus";

export interface RequestMessage {
  dialog: boolean;
  status: SubmitStatus;
  submit: boolean;
}

const newRequestMessage = (): RequestMessage => {
  return {
    dialog: true,
    status: DefaultSubmitStatus(),
    submit: false,
  };
};

export const RequestStore = create(
  combine(newRequestMessage(), (set) => ({
    delete: () => {
      set(() => {
        return newRequestMessage();
      });
    },

    updateDialog: (d: boolean) => {
      set((state) => {
        return {
          ...state,
          dialog: d,
        };
      });
    },

    updateStatus: (s: SubmitStatus) => {
      set((state) => {
        return {
          ...state,
          status: s,
        };
      });
    },

    updateSubmit: (s: boolean) => {
      set((state) => {
        return {
          ...state,
          submit: s,
        };
      });
    },
  })),
);
