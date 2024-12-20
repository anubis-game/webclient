import * as React from "react";

import { DepositStore } from "../../func/deposit/DepositStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  setDisabled: (disabled: boolean) => void;
  verify: () => boolean;
}

export const DepositButton = (props: Props) => {
  const { amo } = DepositStore(
    useShallow((state) => ({
      amo: state.amount,
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
