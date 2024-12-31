import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";

import { AllTokenSymbols } from "../../func/token/TokenConfig";
import { BlockExplorerToken } from "../../func/token/BlockExplorerToken";
import { ChainStore } from "../../func/chain/ChainStore";
import { DepositHandler } from "../../func/deposit/DepositHandler";
import { DepositStore } from "../../func/deposit/DepositStore";
import { SubmitButton } from "../submit/SubmitButton";
import { ToggleBar } from "../toggle/ToggleBar";
import { TrimWhitespace } from "../../func/string/TrimWhitespace";
import { useShallow } from "zustand/react/shallow";
import { XMarkIcon } from "../icon/XMarkIcon";

export const DepositDialog = () => {
  const { dialog, status, submit, symbol } = DepositStore(
    useShallow((state) => ({
      dialog: state.dialog,
      status: state.status,
      submit: state.submit,
      symbol: state.symbol,
    })),
  );

  React.useEffect(() => {
    // We want to reset the deposit store data every time the dialog closes.
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
            Increase your available balance to play the game with&nbsp;
            <a
              href={BlockExplorerToken(symbol, "href")}
              target="_blank"
            >
              {symbol}
            </a>
            &nbsp;on {ChainStore.getState().getActive().viem.name}. Win the allocated balance of every player you beat.
            Withdraw your available balance any time.
          </Dialog.Description>

          <div className="grid gap-4 items-center">
            <input
              className={TrimWhitespace(`
                w-full h-full p-2 rounded outline-none
                text-2xl text-center text-black bg-white
                disabled:text-gray-400 placeholder:text-gray-400
              `)}
              id="amount"
              disabled={submit}
              placeholder="5"
              type="number"
              max={10}
              min={1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                DepositStore.getState().updateAmount(e.currentTarget.value);
              }}
            />

            <SubmitButton
              status={status}
              action={DepositHandler}
            />
          </div>

          <Dialog.Title className="absolute top-4 left-4 w-full">
            <ToggleBar
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
