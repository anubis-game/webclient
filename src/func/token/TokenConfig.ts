import { Address } from "viem";
import { ChainStore } from "../chain/ChainStore";

export interface TokenConfig {
  abi: any;
  address: Address;
  decimals: number;
  precision: number;
  latest: boolean;
}

export const AllTokenSymbols = (): string[] => {
  const chn = ChainStore.getState().getActive();
  return Object.keys(chn.tokens).sort();
};

export const TokenWithSymbol = (sym: string): TokenConfig => {
  const chn = ChainStore.getState().getActive();

  const tok = chn.tokens[sym].find((x: TokenConfig) => {
    return x.latest === true;
  });

  if (tok === undefined) {
    throw `Could not find token config for symbol ${sym}.`;
  }

  return tok;
};
