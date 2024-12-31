import { TokenConfig } from "../token/TokenConfig";

export interface BalanceConfig extends TokenConfig {
  balance: number;
}
