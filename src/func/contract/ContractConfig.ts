import { Address } from "viem";
import { ChainStore } from "../chain/ChainStore";

export interface ContractConfig {
  abi: any;
  address: Address;
  latest: boolean;
}

export const ContractWithSymbol = (sym: string): ContractConfig => {
  const chn = ChainStore.getState().getActive();

  const con = chn.contracts[sym].find((x: ContractConfig) => {
    return x.latest === true;
  });

  if (con === undefined) {
    throw `Could not find contract config for symbol ${sym}.`;
  }

  return con;
};
