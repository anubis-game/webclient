import { alchemy } from "@account-kit/infra";
import { ArbitrumSepoliaAlchemyGasPolicy } from "../../func/config/Config";
import { ChainStore } from "../../func/chain/ChainStore";
import { createAlchemySmartAccountClient } from "@account-kit/infra";
import { TransactionObject } from "./TransactionObject";
import { WalletStore } from "../../func/wallet/WalletStore";

export const SendTransaction = async (txn: TransactionObject[]) => {
  const chn = ChainStore.getState().getActive();

  const cli = createAlchemySmartAccountClient({
    transport: alchemy({ apiKey: chn.alchemyApiKey }),
    policyId: ArbitrumSepoliaAlchemyGasPolicy,
    chain: chn.alchemy,
    account: WalletStore.getState().player.client,
  });

  const res = await cli.sendUserOperation({
    uo: txn,
  });

  console.log("UOP", res);

  const hsh = await cli.waitForUserOperationTransaction(res);

  console.log("Transaction hash: ", hsh);
};
