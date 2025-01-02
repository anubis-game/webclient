import { combine } from "zustand/middleware";
import { create } from "zustand";
import { EnabledSubmitStatus } from "../submit/SubmitStatus";
import { SubmitStatus } from "../submit/SubmitStatus";

export interface RequestMessage {
  status: SubmitStatus;
  submit: boolean;
}

const newRequestMessage = (): RequestMessage => {
  return {
    status: EnabledSubmitStatus("Play"),
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
