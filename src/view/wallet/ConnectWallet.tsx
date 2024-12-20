import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { useConnect } from "wagmi";
import { WalletOption } from "./WalletOption";

export const ConnectWallet = () => {
  const { connectors, connect } = useConnect();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="button px-4 py-3 min-w-[145px]">
          <div>Connect Wallet</div>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dialog min-w-[198px] p-2"
          align="start"
          side="bottom"
          sideOffset={8}
        >
          {connectors.map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onSelect={() => connect({ connector })}
            />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
