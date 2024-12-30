import * as Approve from "../../func/transaction/erc20/Approve";
import * as Deposit from "../../func/transaction/registry/Deposit";
import * as React from "react";

import { BalanceStore } from "../balance/BalanceStore";
import { ChainStore } from "../chain/ChainStore";
import { DepositStore } from "./DepositStore";
import { FormStatusEnabled } from "../form/FormStatus";
import { FormStatusFailure } from "../form/FormStatus";
import { FormStatusLoading } from "../form/FormStatus";
import { FormStatusSuccess } from "../form/FormStatus";
import { Sleep } from "../sleep/Sleep";
import { SendTransaction } from "../transaction/SendTransaction";
import { WalletStore } from "../wallet/WalletStore";
import { DepositSignature } from "../signature/CreateSignature";

export const DepositHandler = async () => {
  {
    DepositStore.getState().updateStatus({
      lifecycle: FormStatusLoading,
      container: React.createElement("Signing Transaction"),
    });

    DepositStore.getState().updateSubmit(true);
  }

  const amo = amount();
  const sym = symbol();

  {
    WalletStore.getState().wallet.client.switchChain({
      id: ChainStore.getState().active,
    });
  }

  const ctx = await DepositSignature();

  try {
    await Approve.Simulate(amo, sym);
    await Deposit.Simulate(ctx, amo, sym);
  } catch (err) {
    return await failure("Simulation Failed", err);
  }

  {
    DepositStore.getState().updateStatus({
      lifecycle: FormStatusLoading,
      container: React.createElement("Confirming Onchain"),
    });
  }

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
    lifecycle: FormStatusFailure,
    container: React.createElement(tit),
  });

  {
    await Sleep(5 * 1000);
  }

  {
    DepositStore.getState().updateStatus({
      lifecycle: FormStatusEnabled,
      container: React.createElement("Try Again"),
    });
  }

  {
    DepositStore.getState().updateSubmit(false);
  }
};

const success = async (amo: number, sym: string) => {
  DepositStore.getState().updateStatus({
    lifecycle: FormStatusSuccess,
    container: React.createElement(`Deposited ${amo} ${sym}`),
  });

  {
    await Sleep(3 * 1000);
  }

  {
    BalanceStore.getState().updateBalance();
    DepositStore.getState().delete();
  }
};
