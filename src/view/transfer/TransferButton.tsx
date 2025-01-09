import * as React from "react";

import { BalanceStatus } from "../../func/balance/BalanceStatus";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { DepositStatus } from "../../func/deposit/DepositStatus";
import { SubmitButton } from "../submit/SubmitButton";
import { SubmitStatus } from "../../func/submit/SubmitStatus";
import { TransferAction } from "../../func/transfer/TransferAction";
import { TransferHandler } from "../../func/transfer/TransferHandler";
import { TransferStore } from "../../func/transfer/TransferStore";
import { useShallow } from "zustand/react/shallow";
import { WithdrawStatus } from "../../func/withdraw/WithdrawStatus";

export const TransferButton = () => {
  const balance = BalanceStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  const transfer = TransferStore(
    useShallow((state) => ({
      action: state.action,
      amount: state.amount,
      status: state.status,
      symbol: state.symbol,
    })),
  );

  // The transfer button shows validation messages. One aspect of the validation
  // is the user's available token balance. That is why we have to wait for the
  // balance store to finish loading, before we can start validating the user
  // input.
  React.useEffect(() => {
    if (balance.status !== BalanceStatus.Loading) {
      TransferStore.getState().updateStatus(verifyStatus(transfer.action, transfer.amount, transfer.symbol));
    }
  }, [balance.status, transfer.action, transfer.amount, transfer.symbol]);

  return (
    <SubmitButton
      status={transfer.status}
      action={TransferHandler}
    />
  );
};

const verifyStatus = (act: TransferAction, amo: string, sym: string): SubmitStatus => {
  if (act === TransferAction.Deposit) {
    return DepositStatus(amo, sym);
  } else {
    return WithdrawStatus(amo, sym);
  }
};
