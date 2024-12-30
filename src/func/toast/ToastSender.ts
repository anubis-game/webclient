import { ToastStore } from "./ToastStore";

export const ControlInfoToast = (mes: JSX.Element) => {
  ToastStore.getState().createToast({
    node: mes,
  });
};
