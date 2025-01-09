import { Address } from "viem";
import { ChainStore } from "../chain/ChainStore";

export interface ContractConfig {
  abi: any;
  address: Address;
  latest: boolean;
  symbol: string;
}

export const RegistryWithSymbol = (sym: string): ContractConfig => {
  const chn = ChainStore.getState().getActive();

  const con = chn.contracts["Registry"].find((x: ContractConfig) => {
    return x.symbol === sym && x.latest === true;
  });

  if (con === undefined) {
    throw `Could not find contract config for symbol ${sym}.`;
  }

  return con;
};

export const SymbolWithRegistry = (add: Address): string => {
  const chn = ChainStore.getState().getActive();

  const con = chn.contracts["Registry"].find((x: ContractConfig) => {
    return x.address === add;
  });

  // We should not throw an error here because we use SymbolWithRegistry based
  // on external inputs. We do not want to crash the frontend only because some
  // third party Guardian may return bogus data. So in case there is no contract
  // config for the provided Registry address, we simply return an empty string.
  if (con === undefined) {
    console.error(`Could not find symbol for registry address ${add}.`);
  }

  return con?.symbol || "";
};
