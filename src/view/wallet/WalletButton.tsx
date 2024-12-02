import * as Dialog from "@radix-ui/react-dialog";

import { useAccount, useConnect } from "wagmi";
import { WalletOption } from "./WalletOption";
import { XMarkIcon } from "../icon/XMarkIcon";
import { WalletAccount } from "./WalletAccount";

export const WalletButton = () => {
  const { connectors, connect } = useConnect();

  const { isConnected } = useAccount();
  if (isConnected) {
    return <WalletAccount />;
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="button px-4 py-3 min-w-[145px]">Connect Wallet</div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/25" />
        <Dialog.Content className="dialog fixed left-1/2 top-1/2 min-h-fit min-w-[350px] -translate-x-1/2 -translate-y-1/2 p-4">
          <Dialog.Title className="flex font-medium">
            <div className="flex w-full mb-4">Select Your Wallet</div>
            <Dialog.Close asChild>
              <div
                className="group h-full cursor-pointer"
                aria-label="Close"
              >
                <XMarkIcon />
              </div>
            </Dialog.Close>
          </Dialog.Title>

          <Dialog.Description className="flex flex-col w-full">
            {connectors.map((connector) => (
              <WalletOption
                key={connector.uid}
                connector={connector}
                onClick={() => connect({ connector })}
              />
            ))}
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
