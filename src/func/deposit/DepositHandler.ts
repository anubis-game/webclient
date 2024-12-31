import * as Approve from "../../func/transaction/erc20/Approve";
import * as Deposit from "../../func/transaction/registry/Deposit";
import * as React from "react";

import { BalanceStore } from "../balance/BalanceStore";
import { ChainStore } from "../chain/ChainStore";
import { DepositStore } from "./DepositStore";
import { Sleep } from "../sleep/Sleep";
import { SendTransaction } from "../transaction/SendTransaction";
import { SubmitStatusEnabled } from "../submit/SubmitStatus";
import { SubmitStatusFailure } from "../submit/SubmitStatus";
import { SubmitStatusLoading } from "../submit/SubmitStatus";
import { SubmitStatusSuccess } from "../submit/SubmitStatus";
import { WalletStore } from "../wallet/WalletStore";
import { DepositSignature } from "../signature/CreateSignature";

export const DepositHandler = async () => {
  {
    DepositStore.getState().updateSubmit(true);
  }

  DepositStore.getState().updateStatus({
    lifecycle: SubmitStatusLoading,
    container: React.createElement("div", null, "Signing Transaction"),
  });

  const amo = amount();
  const sym = symbol();

  WalletStore.getState().wallet.client.switchChain({
    id: ChainStore.getState().active,
  });

  const ctx = await DepositSignature();

  try {
    await Approve.Simulate(amo, sym);
    await Deposit.Simulate(ctx, amo, sym);
  } catch (err) {
    return await failure("Simulation Failed", err);
  }

  DepositStore.getState().updateStatus({
    lifecycle: SubmitStatusLoading,
    container: React.createElement("div", null, "Confirming Onchain"),
  });

  const res = await SendTransaction([
    Approve.Encode(amo, sym), //
    Deposit.Encode(ctx, amo, sym), //
  ]);

  if (res.success) {
    return await success(amo, sym);
  } else {
    return await failure(res.rejected ? "User Rejected Transaction" : "Something Went Wrong", res.message);
  }
};

const amount = (): number => {
  const amo = DepositStore.getState().amount;
  return amo ? Number(amo) : 0;
};

const symbol = (): string => {
  const sym = DepositStore.getState().symbol;
  return sym.toUpperCase();
};

const failure = async (tit: string, err: any) => {
  {
    console.error(err);
  }

  DepositStore.getState().updateStatus({
    lifecycle: SubmitStatusFailure,
    container: React.createElement("div", null, tit),
  });

  {
    await Sleep(5 * 1000);
  }

  DepositStore.getState().updateStatus({
    lifecycle: SubmitStatusEnabled,
    container: React.createElement("div", null, "Try Again"),
  });

  // On failure, reset the submit state so that the user can try to submit the
  // form once again. Note that we are not closing the dialog here.
  {
    DepositStore.getState().updateSubmit(false);
  }
};

const success = async (amo: number, sym: string) => {
  DepositStore.getState().updateStatus({
    lifecycle: SubmitStatusSuccess,
    container: React.createElement("div", null, `Deposited ${amo} ${sym}`),
  });

  {
    await Sleep(3 * 1000);
  }

  {
    BalanceStore.getState().updateBalance();
  }

  // On success, close the dialog. This causes the deposit store to reset based
  // on a useEffect in the DepositDialog component.
  {
    DepositStore.getState().updateDialog(false);
  }
};
