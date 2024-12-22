import * as React from "react";

import { DepositStore } from "../../func/deposit/DepositStore";
import { FormStatus } from "../../func/form/FormStatus";
import { useShallow } from "zustand/react/shallow";

interface Props {
  setStatus: (status: FormStatus) => void;
}

export const DepositButton = (props: Props) => {
  const { amount, status, symbol } = DepositStore(
    useShallow((state) => ({
      amount: state.amount,
      status: state.status,
      symbol: state.symbol,
    })),
  );

  // Update the status for the deposit form every time amount or symbol changes.
  // Note that we cannot use status in the dependency array since it would cause
  // re-renders every single time.
  React.useEffect(() => {
    props.setStatus(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, symbol]);

  return <div>{status.message}</div>;
};
