import * as React from "react";

import { BalanceStatusLoading } from "../../func/balance/BalanceStatus";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { DepositHandler } from "../../func/deposit/DepositHandler";
import { DepositStore } from "../../func/deposit/DepositStore";
import { SubmitButton } from "../submit/SubmitButton";
import { useShallow } from "zustand/react/shallow";
import { VerifyStatus } from "../../func/deposit/VerifyStatus";

export const DepositButton = () => {
  const balance = BalanceStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  const deposit = DepositStore(
    useShallow((state) => ({
      amount: state.amount,
      status: state.status,
      symbol: state.symbol,
    })),
  );

  // The deposit button shows validation messages. One aspect of the validation
  // is the user's available token balance. That is why we have to wait for the
  // balance store to finish loading, before we can start validating the user
  // input.
  React.useEffect(() => {
    if (balance.status !== BalanceStatusLoading) {
      DepositStore.getState().updateStatus(VerifyStatus(deposit.amount, deposit.symbol));
    }
  }, [balance.status, deposit.amount, deposit.symbol]);

  return (
    <SubmitButton
      status={deposit.status}
      action={DepositHandler}
    />
  );
};
