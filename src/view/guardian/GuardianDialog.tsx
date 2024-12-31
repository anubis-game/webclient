import * as Dialog from "@radix-ui/react-dialog";

import { ActiveToggle } from "./ActiveToggle";
import { GuardianStore } from "../../func/guardian/GuardianStore";
import { useShallow } from "zustand/react/shallow";
import { XMarkIcon } from "../icon/XMarkIcon";
import { zeroAddress } from "viem";

export const GuardianDialog = () => {
  const { active, dialog, object } = GuardianStore(
    useShallow((state) => ({
      active: state.active,
      dialog: state.dialog,
      object: state.object,
    })),
  );

  if (active === zeroAddress) {
    return <></>;
  }

  // TODO show a single simple "Play Now" button

  return (
    <Dialog.Root
      open={dialog}
      onOpenChange={GuardianStore.getState().updateDialog}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="deposit dialog p-4"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <Dialog.Title className="mb-4 font-medium">Switch Game</Dialog.Title>

          <Dialog.Description className="mb-4 text-sm">
            The server with the lowest latency is automatically selected for you. Choose wich connection to use if you
            want to play in another arena.
          </Dialog.Description>

          <ActiveToggle
            onSelect={GuardianStore.getState().selectActive}
            selected={active}
            values={Array.from(object.values())}
          />

          {/*
          We keep the close button at the buttom of the dialog because we do not
          want the close button to be the first element to receive an auto
          focus. For our purposes here we want the input field above to be the
          first element that receives the auto focus when the dialog opens.
           */}
          <Dialog.Close asChild>
            <button className="button ghost icon absolute top-4 right-4 flex items-center outline-none">
              <XMarkIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
