import { Address } from "viem";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultFormStatus } from "../form/FormStatus";
import { DefaultTokenSymcol } from "../config/Config";
import { FormStatus } from "../form/FormStatus";
import { GuardianObject } from "./GuardianObject";

export interface RequestMessage {
  guardians: Map<Address, GuardianObject>;
  dialog: boolean;
  status: FormStatus;
  submit: boolean;
  symbol: string;
}

const newRequestMessage = (): RequestMessage => {
  return {
    dialog: true,
    status: DefaultFormStatus("Choose an Amount"),
    submit: false,
    symbol: DefaultTokenSymcol,
  } as RequestMessage;
};

export const RequestStore = create(
  combine(newRequestMessage(), (set) => ({
    delete: () => {
      set(() => {
        return newRequestMessage();
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

    updateGuardians: (g: Map<Address, GuardianObject>) => {
      set((state) => {
        return {
          ...state,
          guardians: g,
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
