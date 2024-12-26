import { Address } from "viem";
import { Hex } from "viem";

export interface TransactionObject {
  name: string;
  data: Hex;
  target: Address;
}
