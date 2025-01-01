import * as Approve from "../transaction/erc20/Approve";
import * as Deposit from "../transaction/registry/Deposit";
import * as React from "react";
import * as Withdraw from "../transaction/registry/Withdraw";

import { BalanceStore } from "../balance/BalanceStore";
import { ChainStore } from "../chain/ChainStore";
import { DepositSignature } from "../signature/CreateSignature";
import { SignatureContext } from "../signature/SignatureContext";
import { Sleep } from "../sleep/Sleep";
import { SendTransaction } from "../transaction/SendTransaction";
import { SubmitStatusEnabled } from "../submit/SubmitStatus";
import { SubmitStatusFailure } from "../submit/SubmitStatus";
import { SubmitStatusLoading } from "../submit/SubmitStatus";
import { SubmitStatusSuccess } from "../submit/SubmitStatus";
import { TransactionResult } from "../transaction/TransactionResult";
import { TransferAction } from "./TransferAction";
import { TransferActionDeposit } from "./TransferAction";
import { TransferStore } from "./TransferStore";
import { WalletStore } from "../wallet/WalletStore";

export const TransferHandler = async () => {
  {
    TransferStore.getState().updateSubmit(true);
  }

  TransferStore.getState().updateStatus({
    lifecycle: SubmitStatusLoading,
    container: React.createElement("div", null, "Signing Transaction"),
  });

  WalletStore.getState().wallet.client.switchChain({
    id: ChainStore.getState().active,
  });

  const act = action();
  const amo = amount();
  const sym = symbol();
  const ctx = await DepositSignature();

  try {
    if (act === TransferActionDeposit) {
      await Approve.Simulate(amo, sym);
      await Deposit.Simulate(ctx, amo, sym);
    } else {
      await Withdraw.Simulate(amo, sym);
    }
  } catch (err) {
    return await failure("Simulation Failed", err);
  }

  TransferStore.getState().updateStatus({
    lifecycle: SubmitStatusLoading,
    container: React.createElement("div", null, "Confirming Onchain"),
  });

  const res = await sendTransaction(ctx, act, amo, sym);

  if (res.success) {
    return await success(amo, sym);
  } else {
    return await failure(res.rejected ? "User Rejected Transaction" : "Something Went Wrong", res.message);
  }
};

//
//
//
//
//

const action = (): TransferAction => {
  const act = TransferStore.getState().action;
  return act;
};

const amount = (): number => {
  const amo = TransferStore.getState().amount;
  return amo ? Number(amo) : 0;
};

const symbol = (): string => {
  const sym = TransferStore.getState().symbol;
  return sym.toUpperCase();
};

//
//
//
//
//

const sendTransaction = async (
  ctx: SignatureContext,
  act: TransferAction,
  amo: number,
  sym: string,
): Promise<TransactionResult> => {
  if (act === TransferActionDeposit) {
    return await SendTransaction([
      Approve.Encode(amo, sym), //
      Deposit.Encode(ctx, amo, sym), //
    ]);
  } else {
    return await SendTransaction([
      Withdraw.Encode(amo, sym), //
    ]);
  }
};

const failure = async (tit: string, err: any) => {
  {
    console.error(err);
  }

  TransferStore.getState().updateStatus({
    lifecycle: SubmitStatusFailure,
    container: React.createElement("div", null, tit),
  });

  {
    await Sleep(5_000);
  }

  TransferStore.getState().updateStatus({
    lifecycle: SubmitStatusEnabled,
    container: React.createElement("div", null, "Try Again"),
  });

  // On failure, reset the submit state so that the user can try to submit the
  // form once again. Note that we are not closing the dialog here.
  {
    TransferStore.getState().updateSubmit(false);
  }
};

const success = async (amo: number, sym: string) => {
  TransferStore.getState().updateStatus({
    lifecycle: SubmitStatusSuccess,
    container: React.createElement("div", null, `Transferred ${amo} ${sym}`),
  });

  {
    await Sleep(5_000);
  }

  {
    BalanceStore.getState().updateBalance();
  }

  // On success, close the dialog. This causes the deposit store to reset based
  // on a useEffect in the DepositDialog component.
  {
    TransferStore.getState().updateDialog(false);
  }
};
