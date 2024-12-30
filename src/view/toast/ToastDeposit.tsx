import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

import { BalanceStore } from "../../func/balance/BalanceStore";
import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";

export const ToastDeposit = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { available } = BalanceStore(
    useShallow((state) => ({
      available: state.available,
    })),
  );

  const { connected, ready } = WalletStore(
    useShallow((state) => ({
      connected: state.connected,
      ready: state.ready,
    })),
  );

  React.useEffect(() => {
    // We want to show this permanent toast if no available balance got
    // deposited. Only if we have the updated balance state ready, only then can
    // we check for the available amount of tokens. Every time "available"
    // updates we check whether the relevant token balance is greater than zero.
    // As soon as some balance got deposited, the toast should disappear.
    if (BalanceStore.getState().getUpdated()) {
      setOpen(!BalanceStore.getState().hasAvailable());
    }

    // This special case hides the deposit toast in case a user was connected
    // without any available balance, and then disconnected. So if we had a
    // wallet connected, and if that wallet had no available balance, then we
    // want to hide the toast again.
    if (ready && !connected) {
      setOpen(false);
    }
  }, [available, connected, ready]);

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
