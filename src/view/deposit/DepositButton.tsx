import * as React from "react";

import { DepositStore } from "../../func/deposit/DepositStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  setDisabled: (disabled: boolean) => void;
  verify: () => boolean;
}

export const DepositButton = (props: Props) => {
  const { amount } = DepositStore(
    useShallow((state) => ({
      amount: state.amount,
    })),
  );

  React.useEffect(() => {
    props.setDisabled(!props.verify());
  }, [amount, props]);

  if (!amount) {
    return <div>Choose an Amount</div>;
  }

  return <div>Deposit {amount} USDC</div>;
};
