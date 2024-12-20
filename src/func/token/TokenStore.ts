import { BalanceOf } from "../transaction/erc20/BalanceOf";
import { ChainStore } from "../chain/ChainStore";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { DefaultTokenSymcol } from "../config/Config";
import { SearchBalance } from "../transaction/registry/SearchBalance";
import { TokenConfig } from "./TokenConfig";

export interface TokenMessage {
  [key: string]: TokenConfig & { balance: number };
}

export const TokenStore = create(
  combine(
    {
      allocated: {} as TokenMessage,
      available: {} as TokenMessage,
    },

    (set, get) => ({
      delete: () => {
        set(() => {
          return {
            allocated: {},
            available: {},
          };
        });
      },

      formatBalance: (mes: TokenMessage, tok: string = DefaultTokenSymcol): string => {
        return mes[tok] ? mes[tok].balance.toFixed(mes[tok].precision) : "";
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
            const bal = await Promise.all([...chn.contracts["Registry-" + key].map((x) => SearchBalance(x, val[0]))]);

            const erc = await BalanceOf(val[0]);

            alo[key] = {
              ...val[0],
              balance: bal.reduce((sum, bal) => sum + bal.alo, 0),
            };

            avl[key] = {
              ...val[0],
              balance: bal.reduce((sum, bal) => sum + bal.avl, 0) + erc,
            };
          }),
        );

        set(() => {
          return {
            allocated: alo,
            available: avl,
          };
        });
      },
    }),
  ),
);
