import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { BalanceStatus } from "../../func/balance/BalanceStatus";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { BlockExplorerAddress } from "../../func/address/BlockExplorerAddress";
import { DollarIcon } from "../icon/DollarIcon";
import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { LogoutIcon } from "../icon/LogoutIcon";
import { OpenLinkIcon } from "../icon/OpenLinkIcon";
import { Tooltip } from "../tooltip/Tooltip";
import { TransferAction } from "../../func/transfer/TransferAction";
import { TransferStore } from "../../func/transfer/TransferStore";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";
import { useDisconnect } from "wagmi";
import { useEnsName } from "wagmi";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";

export const ShowWallets = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { status } = BalanceStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  const { wallet, signer, player } = WalletStore(
    useShallow((state) => ({
      wallet: state.wallet?.address || "",
      signer: state.signer?.address || "",
      player: state.player?.address || "",
    })),
  );

  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: wallet });

  return (
    <DropdownMenu.Root
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex group min-w-[181px] items-center justify-between">
        <div>
          <DropdownMenu.Trigger asChild>
            <div className="button ghost px-4 py-3">
              {wallet && <div>{ensName ? ensName : TruncateSeparator(wallet, "...")}</div>}
            </div>
          </DropdownMenu.Trigger>
        </div>
        <div
          className={`
            button ghost icon py-3 hover:visible flex items-center
            ${open ? "visible" : "invisible group-hover:visible"}
          `}
          onClick={() => BlockExplorerAddress(wallet, "open")}
        >
          <OpenLinkIcon />
        </div>
      </div>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="wallet dialog min-w-[198px] p-2"
          align="start"
          side="bottom"
          sideOffset={8}
        >
          <DropdownMenu.Item
            className="button ghost p-2"
            onSelect={() => {
              TransferStore.getState().updateAction(TransferAction.Deposit);
              TransferStore.getState().updateDialog(true);
            }}
          >
            <div className="w-[144px]">Deposit</div>
            <Tooltip
              content={<>Deposit some tokens to play the game.</>}
              side="right"
              trigger={<DollarIcon />}
            />
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="button ghost p-2"
            disabled={status !== BalanceStatus.Funded}
            onSelect={() => {
              TransferStore.getState().updateAction(TransferAction.Withdraw);
              TransferStore.getState().updateDialog(true);
            }}
          >
            <div className="w-[144px]">Withdraw</div>
            <Tooltip
              content={<>Withdraw your funds any time.</>}
              side="right"
              trigger={<DollarIcon />}
            />
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="mt-2 mb-3 h-px bg-gray-600" />

          {signer && (
            <DropdownMenu.Item
              className="button ghost p-2"
              disabled
            >
              <div className="w-[144px]">{TruncateSeparator(signer, "...")}</div>
              <Tooltip
                content={<>The signer controlling your Smart Wallet. It will never leave this device.</>}
                side="right"
                trigger={<InfoCircleIcon />}
              />
            </DropdownMenu.Item>
          )}

          {player && (
            <DropdownMenu.Item
              className="button ghost p-2"
              onClick={() => BlockExplorerAddress(player, "open")}
            >
              <div className="w-[144px]">{TruncateSeparator(player, "...")}</div>
              <Tooltip
                content={<>Your smart wallet managing the game. It will never hold your funds.</>}
                side="right"
                trigger={<OpenLinkIcon />}
              />
            </DropdownMenu.Item>
          )}

          {wallet && (
            <DropdownMenu.Item
              className="button ghost p-2"
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
