import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";

import { AllTokenSymbols } from "../../func/token/TokenConfig";
import { BlockExplorerToken } from "../../func/token/BlockExplorerToken";
import { ChainStore } from "../../func/chain/ChainStore";
import { DepositAmount } from "./DepositAmount";
import { DepositButton } from "./DepositButton";
import { DepositStore } from "../../func/deposit/DepositStore";
import { SymbolToggle } from "./SymbolToggle";
import { useShallow } from "zustand/react/shallow";
import { XMarkIcon } from "../icon/XMarkIcon";

export const DepositDialog = () => {
  const { dialog, submit, symbol } = DepositStore(
    useShallow((state) => ({
      dialog: state.dialog,
      submit: state.submit,
      symbol: state.symbol,
    })),
  );

  React.useEffect(() => {
    // We want to reset the deposit store every time the dialog closes.
    if (!dialog) {
      DepositStore.getState().delete();
    }
  }, [dialog]);

  return (
    <Dialog.Root
      open={dialog}
      onOpenChange={(open) => {
        // We lock the dialog so that it can stay in place while we process
        // transactions. So only while the dialog submit is not in progress we
        // allow the dialog open state to change.
        if (!submit) {
          DepositStore.getState().updateDialog(open);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="deposit dialog p-4"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <Dialog.Description className="mt-[50px] mb-4 text-sm">
            Increase your balance to play the game with&nbsp;
            <a
              href={BlockExplorerToken(symbol, "href")}
              target="_blank"
            >
              {symbol}
            </a>
            &nbsp;on {ChainStore.getState().getActive().viem.name}. Win the allocated balance of every player you beat.
            Withdraw your funds any time.
          </Dialog.Description>

          <div className="grid gap-4 items-center">
            <DepositAmount disabled={submit} />
            <DepositButton />
          </div>

          <Dialog.Title className="absolute top-4 left-4 w-full">
            <SymbolToggle
              disabled={submit}
              onSelect={DepositStore.getState().updateSymol}
              selected={symbol}
              values={AllTokenSymbols()}
            />
          </Dialog.Title>

          {/*
          We keep the close button at the buttom of the dialog because we do not
          want the close button to be the first element to receive an auto
          focus. For our purposes here we want the input field above to be the
          first element that receives the auto focus when the dialog opens.
           */}
          <Dialog.Close asChild>
            <button
              className="button ghost icon absolute top-4 right-4 flex items-center outline-none"
              disabled={submit}
            >
              <XMarkIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
