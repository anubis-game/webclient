import { BalanceStatus } from "./BalanceStatus";
import { BalanceStatusEmpty } from "./BalanceStatus";
import { BalanceStatusFunded } from "./BalanceStatus";
import { BalanceStatusLoading } from "./BalanceStatus";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultTokenSymcol } from "../config/Config";
import { RegistryWithSymbol } from "../contract/ContractConfig";
import { SearchBalance } from "../transaction/registry/SearchBalance";
import { TokenWithSymbol } from "../token/TokenConfig";
import { BalanceOf } from "../transaction/erc20/BalanceOf";

export interface BalanceMessage {
  active: string;
  allocated: number;
  available: number;
  deposited: number;
  precision: number;
  status: BalanceStatus;
}

const newBalanceMessage = (): BalanceMessage => {
  return {
    active: DefaultTokenSymcol,
    allocated: 0,
    available: 0,
    deposited: 0,
    precision: 0,
    status: BalanceStatusLoading,
  };
};

export const BalanceStore = create(
  combine(newBalanceMessage(), (set, get) => ({
    delete: () => {
      set(() => {
        return newBalanceMessage();
      });
    },

    updateActive: (a: string) => {
      set((state) => {
        return {
          ...state,
          active: a,
        };
      });
    },

    updateBalance: async () => {
      const act = get().active;
      const reg = RegistryWithSymbol(act);
      const tok = TokenWithSymbol(act);

      const bal = await SearchBalance(reg, tok);
      const erc = await BalanceOf(tok);

      set((state) => {
        return {
          ...state,
          allocated: bal.alo,
          available: erc,
          deposited: bal.dep,
          precision: tok.precision,
          status: bal.dep > 0 ? BalanceStatusFunded : BalanceStatusEmpty,
        };
      });
    },
  })),
);
