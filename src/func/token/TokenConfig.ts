import { Address } from "viem";
// import { ChainStore } from "../chain/ChainStore";

export interface TokenConfig {
  abi: any;
  address: Address;
  decimals: number;
  precision: number;
}

export const AllTokenSymbols = (): string[] => {
  // const chn = ChainStore.getState().getActive();
  // return Object.keys(chn.tokens).sort();
  return ["DAI", "USDC", "USDT"];
};
