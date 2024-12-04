import { Chain } from "viem/chains";
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
