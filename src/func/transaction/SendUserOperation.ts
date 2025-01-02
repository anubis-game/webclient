import { alchemy } from "@account-kit/infra";
import { ArbitrumSepoliaAlchemyGasPolicy } from "../config/Config";
import { ChainStore } from "../chain/ChainStore";
import { createAlchemySmartAccountClient } from "@account-kit/infra";
import { TimeString } from "../string/TimeString";
import { TransactionObject } from "./TransactionObject";
import { TransactionResult } from "./TransactionResult";
import { WalletStore } from "../wallet/WalletStore";
import { zeroHash } from "viem";

//
//     Retry Attempt    Interval Seconds    Elapsed Seconds
//
//                 1	              2.00	             2.00
//                 2	              3.00	             5.00
//                 3	              4.50	             9.50
//                 4	              6.75	            16.25
//                 5	             10.12	            26.38
//
export const SendUserOperation = async (txn: TransactionObject[]): Promise<TransactionResult> => {
  const chn = ChainStore.getState().getActive();

  const cli = createAlchemySmartAccountClient({
    transport: alchemy({ apiKey: chn.alchemyApiKey }),
    policyId: ArbitrumSepoliaAlchemyGasPolicy,
    chain: chn.alchemy,
    account: WalletStore.getState().player.client,
  });

  try {
    const sta = performance.now();

    const res = await cli.sendUserOperation({
      uo: txn,
    });

    {
      console.log("SendUserOperation.userOperationHash", res.hash);
    }

    const hsh = await cli.waitForUserOperationTransaction({
      hash: res.hash,
    });

    {
      console.log("SendUserOperation.transactionHash", hsh);
    }

    const end = performance.now();

    {
      console.log("SendUserOperation.duration", TimeString(end - sta));
    }

    return {
      hash: hsh,
      rejected: false,
      success: true,
      message: "Transaction Confirmed Onchain",
    };
  } catch (err) {
    // TODO this could retry paying more gas https://accountkit.alchemy.com/infra/drop-and-replace
    return {
      hash: zeroHash,
      rejected: false,
      success: false,
      message: err instanceof Error ? err.message : String(err),
    };
  }
};
