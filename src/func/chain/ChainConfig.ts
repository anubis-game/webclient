import { Chain } from "viem/chains";
import { ChainStore } from "./ChainStore";
import { ContractConfig } from "../contract/ContractConfig";
import { TokenConfig } from "../token/TokenConfig";

export interface ChainConfig {
  alchemy: Chain;
  viem: Chain;
  wagmi: Chain;
  alchemyApiKey: string;
  alchemyGasPolicy: string;
  alchemyRpcEndpoint: string;
  contracts: { [key: string]: ContractConfig[] };
  tokens: { [key: string]: TokenConfig[] };
}

export const ContractWithSymbol = (sym: string): ContractConfig => {
  const chn = ChainStore.getState().getActive();

  const con = chn.contracts[sym].find((x: ContractConfig) => {
    return x.latest === true;
  });

  if (con === undefined) {
    throw `Could not find contract config for token symbol ${sym}.`;
  }

  return con;
};
