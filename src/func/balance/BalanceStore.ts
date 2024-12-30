import { ChainStore } from "../chain/ChainStore";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultTokenSymcol } from "../config/Config";
import { SearchBalance } from "../transaction/registry/SearchBalance";
import { TokenConfig } from "../token/TokenConfig";

export interface BalanceMessage {
  [key: string]: TokenConfig & { balance: number; updated: boolean };
}

export const BalanceStore = create(
  combine(
    {
      allocated: {} as BalanceMessage,
      available: {} as BalanceMessage,
    },

    (set, get) => ({
      delete: () => {
        set((state) => {
          return {
            ...state,
            allocated: {},
            available: {},
          };
        });
      },

      formatBalance: (mes: BalanceMessage, tok: string = DefaultTokenSymcol): string => {
        return mes[tok] ? mes[tok].balance.toFixed(mes[tok].precision) : "";
      },

      getUpdated: (tok: string = DefaultTokenSymcol): boolean => {
        const avl = get().available[tok];
        return avl && avl.updated === true;
      },

      hasAllocated: (tok: string = DefaultTokenSymcol): boolean => {
        const alo = get().allocated[tok];
        return alo && alo.balance !== 0;
      },

      hasAvailable: (tok: string = DefaultTokenSymcol): boolean => {
        const avl = get().available[tok];
        return avl && avl.balance !== 0;
      },

      updateBalance: async () => {
        const chn = ChainStore.getState().getActive();

        const alo = get().allocated;
        const avl = get().available;

        await Promise.all(
          Object.entries(chn.tokens).map(async ([key, val]: [string, TokenConfig[]]) => {
            const con = chn.contracts["Registry"].filter((contract) => contract.symbol === key);

            const bal = await Promise.all(con.map((x) => SearchBalance(x, val[0])));

            alo[key] = {
              ...val[0],
              balance: bal.reduce((sum, bal) => sum + bal.alo, 0),
              updated: true,
            };

            avl[key] = {
              ...val[0],
              balance: bal.reduce((sum, bal) => sum + bal.avl, 0),
              updated: true,
            };
          }),
        );

        set((state) => {
          return {
            ...state,
            allocated: { ...alo },
            available: { ...avl },
          };
        });
      },
    }),
  ),
);
