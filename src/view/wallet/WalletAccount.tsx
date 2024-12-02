import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { TruncateSeparator } from "../../func/string/TruncateSeparator";
import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";
import { useEnsName } from "wagmi";

export const WalletAccount = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <DropdownMenu.Root>

      <DropdownMenu.Trigger asChild>
        <div className="button px-4 py-3 min-w-[145px]">
          {address && (
            <div>
              {ensName ? ensName : TruncateSeparator(address, "...")}
            </div>
          )}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="dialog min-w-[145px] p-2" sideOffset={5}>

          <DropdownMenu.Item className="menu item p-2 cursor-pointer outline-none" onClick={() => disconnect()}>
            Disconnect
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
