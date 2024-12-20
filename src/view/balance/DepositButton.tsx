import * as React from "react";

import { BalanceStore } from "../../func/balance/BalanceStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  setDisabled: (disabled: boolean) => void;
  verify: () => boolean;
}

export const DepositButton = (props: Props) => {
  const { amo } = BalanceStore(
    useShallow((state) => ({
      amo: state.depositAmount,
    })),
  );

  React.useEffect(() => {
    props.setDisabled(!props.verify());
  }, [amo, props]);

  if (!amo) {
    return <div>Choose an Amount</div>;
  }

  return <div>Deposit {amo} USDC</div>;
};
