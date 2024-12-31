import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

import { BalanceStore } from "../../func/balance/BalanceStore";
import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { useShallow } from "zustand/react/shallow";
import { BalanceStatusEmpty } from "../../func/balance/BalanceStatus";

export const ToastDeposit = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const balance = BalanceStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  React.useEffect(() => {
    // We want to show this permanent toast if no balance got deposited. As soon
    // as some balance got deposited, the toast should disappear.
    setOpen(balance.status === BalanceStatusEmpty);
  }, [balance.status]);

  return (
    <Toast.Root
      className="toast info"
      onOpenChange={setOpen}
      open={open}
    >
      <InfoCircleIcon />
      <Toast.Title>Now Deposit Some Tokens</Toast.Title>
    </Toast.Root>
  );
};
