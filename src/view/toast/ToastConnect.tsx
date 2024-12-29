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
