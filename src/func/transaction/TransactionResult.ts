import { Hash } from "viem";

export interface TransactionResult {
  hash: Hash;
  message: string;
  rejected: boolean;
  success: boolean;
}
