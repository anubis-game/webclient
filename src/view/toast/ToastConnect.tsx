import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";
import { WalletStatusDisconnected } from "../../func/wallet/WalletStatus";

export const ToastConnect = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const wallet = WalletStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  React.useEffect(() => {
    // The idea for this permanent toast is to show a message to the user in
    // case no wallet was connected. So if we know that we checked for wallet
    // connections, and if we find no wallet to be connected, then we show the
    // toast below. Conversely, the toast should disappear when a wallet was
    // connected.
    setOpen(wallet.status === WalletStatusDisconnected);
  }, [wallet.status]);

  return (
    <Toast.Root
      className="toast info"
      open={open}
      onOpenChange={setOpen}
    >
      <InfoCircleIcon />
      <Toast.Title>Connect Your Wallet</Toast.Title>
    </Toast.Root>
  );
};
