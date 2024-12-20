import * as Dialog from "@radix-ui/react-dialog";

import { BalanceStore } from "../../func/balance/BalanceStore";
import { DepositHandler } from "./DepositHandler";
import { FormButton } from "../form/FormButton";
import { TrimWhitespace } from "../../func/string/TrimWhitespace";
import { useShallow } from "zustand/react/shallow";
import { XMarkIcon } from "../icon/XMarkIcon";

export const DepositBalance = () => {
  const { depositDialog, depositSubmit } = BalanceStore(
    useShallow((state) => ({
      depositDialog: state.depositDialog,
      depositSubmit: state.depositSubmit,
    })),
  );

  return (
    <Dialog.Root
      open={depositDialog}
      onOpenChange={BalanceStore.getState().updateDepositDialog}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="dialog fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md p-4"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="flex mb-2">
            <Dialog.Title className="w-full font-medium">Deposit</Dialog.Title>
            <Dialog.Close asChild>
              <div
                className="flex items-center outline-none cursor-pointer"
                aria-label="Close"
              >
                <XMarkIcon />
              </div>
            </Dialog.Close>
          </div>

          <Dialog.Description className="mb-4 text-sm">
            You can increase your available balance to play he game. You will get the allocated balance of every player
            that you beat.
          </Dialog.Description>

          <div className="h-12 mb-4 flex items-center gap-2">
            <input
              className={TrimWhitespace(`
                w-full h-full p-2 rounded
                outline-none
                placeholder:text-gray-400
                bg-white
                text-2xl text-right text-right text-black
              `)}
              id="amount"
              disabled={depositSubmit}
              placeholder="5"
              type="number"
              max={10}
              min={1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                BalanceStore.getState().updateDepositAmount(e.currentTarget.value);
              }}
            />
            <div className="button px-4 py-3 w-full h-full">
              <div>USDC</div>
            </div>
          </div>

          <FormButton handler={new DepositHandler()} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
