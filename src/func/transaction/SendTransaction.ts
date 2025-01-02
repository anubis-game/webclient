import { BaseError } from "viem";
import { TimeString } from "../string/TimeString";
import { TransactionObject } from "./TransactionObject";
import { TransactionResult } from "./TransactionResult";
import { UserRejectedRequestError } from "viem";
import { WalletStore } from "../wallet/WalletStore";

export const SendTransaction = async (txn: TransactionObject[]): Promise<TransactionResult> => {
  const res = {} as TransactionResult;

  const wal = WalletStore.getState().wallet;
  const pub = WalletStore.getState().public;

  for (const x of txn) {
    {
      console.log("SendTransaction." + x.name);
    }

    try {
      const sta = performance.now();

      const gas = await pub.estimateFeesPerGas();

      {
        console.log("SendTransaction.maxFeePerGas", gas.maxFeePerGas);
        console.log("SendTransaction.maxPriorityFeePerGas", gas.maxPriorityFeePerGas);
      }

      res.hash = await wal.client.sendTransaction({
        account: wal.address,
        data: x.data,
        to: x.target,
        chain: wal.client.chain,
        maxFeePerGas: gas.maxFeePerGas,
        maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
      });

      {
        console.log("SendTransaction.transactionHash", res.hash);
      }

      const rec = await pub.waitForTransactionReceipt({
        hash: res.hash,
      });

      const end = performance.now();

      {
        console.log("SendTransaction.duration", TimeString(end - sta));
      }

      if (rec.status.toLowerCase() === "success") {
        res.message = "Transaction Confirmed Onchain";
        res.rejected = false;
        res.success = true;
      } else {
        res.message = "Transaction Reverted Onchain";
        res.rejected = false;
        res.success = false;

        return res;
      }
    } catch (err) {
      if (userRejected(err)) {
        res.message = "User Rejected Transaction";
        res.rejected = true;
        res.success = false;
      } else {
        res.message = err instanceof Error ? err.message : String(err);
        res.rejected = false;
        res.success = false;
      }

      return res;
    }
  }

  return res;
};

const userRejected = (err: any): boolean => {
  if (err instanceof BaseError) {
    return err.walk((e) => e instanceof UserRejectedRequestError) instanceof UserRejectedRequestError;
  }

  return false;
};
