import * as Toast from "@radix-ui/react-toast";

import { InfoCircleIcon } from "../icon/InfoCircleIcon";
import { ToastConnect } from "./ToastConnect";
import { ToastDeposit } from "./ToastDeposit";
import { ToastStore } from "../../func/toast/ToastStore";
import { useShallow } from "zustand/react/shallow";

export const ToastSetup = () => {
  const { toasts } = ToastStore(
    useShallow((state) => ({
      toasts: state.toasts,
    })),
  );

  return (
    <Toast.Provider duration={Infinity}>
      <Toast.Viewport className="fixed top-0 right-0 p-4 grid gap-4 w-full sm:w-[350px] list-none z-[2147483647] outline-none" />

      <ToastConnect />
      <ToastDeposit />

      {toasts.map((x) => (
        <Toast.Root
          key={x.hash}
          className="toast info"
          duration={10_000}
          onOpenChange={(open: boolean) => {
            if (open === false) {
              ToastStore.getState().deleteToast(x.hash!);
            }
          }}
        >
          <InfoCircleIcon />
          <Toast.Title asChild>{x.node}</Toast.Title>
        </Toast.Root>
      ))}
    </Toast.Provider>
  );
};
