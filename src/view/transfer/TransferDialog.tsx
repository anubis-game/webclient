import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";

import { AllTokenSymbols } from "../../func/token/TokenConfig";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { DepositAmount } from "../deposit/DepositAmount";
import { DepositDescription } from "../deposit/DepositDescription";
import { TransferActionDeposit } from "../../func/transfer/TransferAction";
import { TransferButton } from "./TransferButton";
import { TransferStore } from "../../func/transfer/TransferStore";
import { TransferSymbol } from "./TransferSymbol";
import { useShallow } from "zustand/react/shallow";
import { WithdrawAmount } from "../withdraw/WithdrawAmount";
import { WithdrawDescription } from "../withdraw/WithdrawDescription";
import { XMarkIcon } from "../icon/XMarkIcon";

export const TransferDialog = () => {
  const { action, dialog, submit, symbol } = TransferStore(
    useShallow((state) => ({
      action: state.action,
      dialog: state.dialog,
      submit: state.submit,
      symbol: state.symbol,
    })),
  );

  React.useEffect(() => {
    // We want to reset the deposit store every time the dialog closes.
    if (!dialog) {
      TransferStore.getState().delete();
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
          TransferStore.getState().updateDialog(open);
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
            {action === TransferActionDeposit ? (
              <DepositDescription symbol={symbol} />
            ) : (
              <WithdrawDescription symbol={symbol} />
            )}
          </Dialog.Description>

          <div className="grid gap-4 items-center">
            {action === TransferActionDeposit ? (
              <DepositAmount disabled={submit} />
            ) : (
              <WithdrawAmount disabled={submit} />
            )}
            <TransferButton />
          </div>

          {/*
          We keep the token toggle and close button at the buttom of the dialog
          because we do not want the those elements to be the first to receive
          auto focus on render. For our purposes here we want the input field
          above to be the first element that receives the auto focus when the
          dialog opens, because the user should start choosing a number to
          transfer right away.
           */}

          <Dialog.Title className="absolute top-4 left-4 w-full">
            <TransferSymbol
              disabled={submit}
              onSelect={(sym: string) => {
                // In case that the selected token symbol changes the currently
                // active token symbol, we must make sure to update user
                // balances too.
                if (BalanceStore.getState().updateActive(sym)) {
                  BalanceStore.getState().updateBalance();
                }

                // For transfers we must make sure that the selected token
                // symbol is properly reflected in the transfer store, so that
                // the user can deposit or withdraw the tokens that they are
                // interested in.
                {
                  TransferStore.getState().updateSymbol(sym);
                }
              }}
              selected={symbol}
              values={AllTokenSymbols()}
            />
          </Dialog.Title>

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
