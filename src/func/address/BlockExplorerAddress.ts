import { Address } from "viem";
import { ChainStore } from "../chain/ChainStore";

export const BlockExplorerAddress = (add: Address, typ: "href" | "open"): string => {
  const url = ChainStore.getState().getActive().viem.blockExplorers?.default.url;
  const ref = new URL(`/address/${add}`, url).toString();

  if (typ === "href") {
    return ref;
  }

  if (typ === "open") {
    window.open(ref, "_blank");
  }

  return "";
};
