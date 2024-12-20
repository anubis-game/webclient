import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { Address } from "viem";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { ChainStore } from "../../func/chain/ChainStore";
import { DepositStore } from "../../func/deposit/DepositStore";
import { DollarIcon } from "../icon/DollarIcon";
import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { LogoutIcon } from "../icon/LogoutIcon";
import { OpenLinkIcon } from "../icon/OpenLinkIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";
import { useDisconnect } from "wagmi";
import { useEnsName } from "wagmi";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";

export const ShowWallets = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { wallet, signer, player } = WalletStore(
    useShallow((state) => ({
      wallet: state.wallet?.address || "",
      signer: state.signer?.address || "",
      player: state.player?.address || "",
    })),
  );

  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: wallet });

  const onAddress = (add: Address) => {
    const url = new URL(
      `/address/${add}`,
      ChainStore.getState().getActive().viem.blockExplorers?.default.url,
    ).toString();

    {
      window.open(url, "_blank");
    }
  };

  return (
    <DropdownMenu.Root
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex group min-w-[181px]">
        <DropdownMenu.Trigger asChild>
          <div className="button transparent px-4 py-3 w-full">
            {wallet && <div>{ensName ? ensName : TruncateSeparator(wallet, "...")}</div>}
          </div>
        </DropdownMenu.Trigger>
        <div
          className={`
            py-3 hover:visible flex items-center cursor-pointer
            ${open ? "visible" : "invisible group-hover:visible"}
          `}
          onClick={() => onAddress(wallet)}
        >
          <OpenLinkIcon />
        </div>
      </div>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dialog min-w-[198px] p-2"
          align="start"
          side="bottom"
          sideOffset={8}
        >
          <DropdownMenu.Item
            className="menu item p-2"
            onSelect={() => DepositStore.getState().updateDepositDialog(true)}
          >
            <div className="w-[144px]">Deposit</div>
            <Tooltip
              content={<>Deposit small amounts of tokens. Everyone with an available balance can play.</>}
              side="right"
              trigger={<DollarIcon />}
            />
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="menu item p-2"
            disabled={!BalanceStore.getState().hasAvailable()}
          >
            <div className="w-[144px]">Withdraw</div>
            <Tooltip
              content={<>You can withdraw your available balance back to your wallet any time.</>}
              side="right"
              trigger={<DollarIcon />}
            />
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="mt-2 mb-3 h-px bg-gray-600" />

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

          {player && (
            <DropdownMenu.Item
              className="menu item p-2"
              onSelect={() => onAddress(player)}
            >
              <div className="w-[144px]">{TruncateSeparator(player, "...")}</div>
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
              onSelect={() => disconnect()}
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
