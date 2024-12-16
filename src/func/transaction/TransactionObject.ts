import { Address } from "viem";
import { Hex } from "viem";

export interface TransactionObject {
  data: Hex;
  target: Address;
}
