import { TokenConfig } from "../token/TokenConfig";

export interface BalanceConfig extends TokenConfig {
  balance: number;
  symbol: string;
  updated: boolean;
}
