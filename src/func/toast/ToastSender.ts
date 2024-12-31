import { ToastStore } from "./ToastStore";

export const InfoToast = (mes: JSX.Element) => {
  ToastStore.getState().createToast({
    node: mes,
  });
};
