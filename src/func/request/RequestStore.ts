import { Address } from "viem";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultSubmitStatus } from "../submit/SubmitStatus";
import { DefaultTokenSymcol } from "../config/Config";
import { SubmitStatus } from "../submit/SubmitStatus";
import { GuardianObject } from "./GuardianObject";
import { zeroAddress } from "viem";

export interface RequestMessage {
  dialog: boolean;
  guardians: Map<Address, GuardianObject>;
  status: SubmitStatus;
  submit: Address;
  symbol: string;
}

const newRequestMessage = (): RequestMessage => {
  return {
    dialog: true,
    guardians: new Map(),
    status: DefaultSubmitStatus(),
    submit: zeroAddress,
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

    updateDialog: (d: boolean) => {
      set((state) => {
        return {
          ...state,
          dialog: d,
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

    updateStatus: (s: SubmitStatus) => {
      set((state) => {
        return {
          ...state,
          status: s,
        };
      });
    },

    updateSubmit: (s: Address) => {
      set((state) => {
        return {
          ...state,
          submit: s,
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
