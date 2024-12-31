import { BalanceConfig } from "./BalanceConfig";
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

export interface BalanceMessage {
  active: string;
  allocated: BalanceConfig;
  available: BalanceConfig;
  status: BalanceStatus;
}

const newBalanceMessage = (): BalanceMessage => {
  return {
    active: DefaultTokenSymcol,
    allocated: {} as BalanceConfig,
    available: {} as BalanceConfig,
    status: BalanceStatusLoading,
  } as BalanceMessage;
};

export const BalanceStore = create(
  combine(newBalanceMessage(), (set, get) => ({
    delete: () => {
      set(() => {
        return newBalanceMessage();
      });
    },

    updateBalance: async () => {
      const act = get().active;
      const alo = get().allocated;
      const avl = get().available;
      const reg = RegistryWithSymbol(act);
      const tok = TokenWithSymbol(act);

      const bal = await SearchBalance(reg, tok);

      alo.balance = bal.alo;
      avl.balance = bal.avl;

      set((state) => {
        return {
          ...state,
          allocated: { ...alo },
          available: { ...avl },
          status: avl.balance > 0 ? BalanceStatusFunded : BalanceStatusEmpty,
        };
      });
    },
  })),
);
