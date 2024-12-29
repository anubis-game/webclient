import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

import { BalanceStore } from "../../func/balance/BalanceStore";
import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";

export const ToastDeposit = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { initialized } = BalanceStore(
    useShallow((state) => ({
      initialized: state.initialized,
    })),
  );

  const { connected, ready } = WalletStore(
    useShallow((state) => ({
      connected: state.connected,
      ready: state.ready,
    })),
  );

  React.useEffect(() => {
    if (ready) {
      setOpen(!connected);
    }

    if (initialized) {
      setOpen(!BalanceStore.getState().hasAvailable());
    }
  }, [connected, initialized, ready]);

  // TODO put the toast styles into CSS selectors
  return (
    <Toast.Root
      className="flex gap-4 p-4 w-full text-black bg-yellow-400 rounded items-center"
      open={open}
      onOpenChange={setOpen}
    >
      <InfoCircleIcon />
      <Toast.Title>Deposit Some Tokens</Toast.Title>
    </Toast.Root>
  );
};
