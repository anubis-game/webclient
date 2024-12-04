import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { LogoutIcon } from "../icon/LogoutIcon";
import { OpenLinkIcon } from "../icon/OpenLinkIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";
import { useDisconnect } from "wagmi";
import { useEnsName } from "wagmi";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";
import { ChainStore } from "../../func/chain/ChainStore";

export const WalletAccount = () => {
  const { wallet, signer, contract } = WalletStore(
    useShallow((state) => ({
      wallet: state.wallet,
      signer: state.signer,
      contract: state.contract,
    })),
  );

  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: wallet });

  const onSelect = () => {
    const url = new URL(
      `/address/${contract}`,
      ChainStore.getState().getActive().viem.blockExplorers?.default.url,
    ).toString();

    {
      window.open(url, "_blank");
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="button transparent px-4 py-3 min-w-[145px]">
          {wallet && <div>{ensName ? ensName : TruncateSeparator(wallet, "...")}</div>}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dialog min-w-[198px] p-2"
          align="start"
          sideOffset={5}
        >
          {signer && (
            <DropdownMenu.Item
              className="menu item p-2"
              disabled
            >
              <div className="w-[144px]">{TruncateSeparator(signer, "...")}</div>
              <Tooltip
                content={<>This is the signer controlling your Smart Wallet. It will never leave this device.</>}
                side="right"
                trigger={<InfoCircleIcon />}
              />
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Separator className="mt-2 mb-3 h-px bg-gray-600" />

          {contract && (
            <DropdownMenu.Item
              className="menu item p-2"
              onSelect={onSelect}
            >
              <div className="w-[144px]">{TruncateSeparator(contract, "...")}</div>
              <Tooltip
                content={<>This is your Smart Wallet managing the game. It will never hold your funds.</>}
                side="right"
                trigger={<OpenLinkIcon />}
              />
            </DropdownMenu.Item>
          )}

          {wallet && (
            <DropdownMenu.Item
              className="menu item p-2"
              onClick={() => disconnect()}
            >
              <div className="w-[144px]">Disconnect</div>
              <LogoutIcon />
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
