import { combine } from "zustand/middleware";
import { create } from "zustand";
import { SubmitStatus } from "../submit/SubmitStatus";
import { SubmitStatusEnabled } from "../submit/SubmitStatus";

export interface RequestMessage {
  status: SubmitStatus;
  submit: boolean;
}

const newRequestMessage = (): RequestMessage => {
  return {
    status: SubmitStatusEnabled("Play Now"),
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
