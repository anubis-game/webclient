import { BalanceOf } from "../transaction/erc20/BalanceOf";
import { BalanceStatus } from "./BalanceStatus";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultTokenSymcol } from "../config/Config";
import { RegistryWithSymbol } from "../contract/ContractConfig";
import { SearchBalance } from "../transaction/registry/SearchBalance";
import { TokenWithSymbol } from "../token/TokenConfig";

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
    status: BalanceStatus.Loading,
  };
};

export const BalanceStore = create(
  combine(newBalanceMessage(), (set, get) => ({
    delete: () => {
      set(() => {
        return newBalanceMessage();
      });
    },

    // updateActive returns whether the active token symbol changed as a result
    // of the function call below. If the active token symbol changed, then the
    // caller should ensure to update the user balances too.
    updateActive: (a: string): boolean => {
      const upd = a !== get().active;

      set((state) => {
        return {
          ...state,
          active: a,
        };
      });

      return upd;
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
          status: bal.dep > 0 ? BalanceStatus.Funded : BalanceStatus.Empty,
        };
      });
    },
  })),
);
