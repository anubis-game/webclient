import { Chain } from "viem/chains";
import { ContractConfig } from "../contract/ContractConfig";
import { TokenConfig } from "../token/TokenConfig";

export interface ChainConfig extends Omit<Chain, "contracts"> {
  biconomyPaymasterApiKey: string;
  contracts: { [key: string]: ContractConfig[] };
  rpcEndpoints: string[];
  tokens: { [key: string]: TokenConfig };
}
