import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";

export const ToastConnect = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { connected, ready } = WalletStore(
    useShallow((state) => ({
      connected: state.connected,
      ready: state.ready,
    })),
  );

  React.useEffect(() => {
    // The idea for this permanent toast is to show a message to the user in
    // case no wallet was connected. So if we know that we checked for wallet
    // connections, and if we find no wallet to be connected, then we show the
    // toast below. Conversely, the toast should disappear when a wallet was
    // connected.
    if (ready) {
      setOpen(!connected);
    }
  }, [connected, ready]);

  // TODO put the toast styles into CSS selectors
  return (
    <Toast.Root
      className="flex gap-4 p-4 w-full text-black bg-yellow-400 rounded items-center"
      open={open}
      onOpenChange={setOpen}
    >
      <InfoCircleIcon />
      <Toast.Title>Connect Your Wallet</Toast.Title>
    </Toast.Root>
  );
};
