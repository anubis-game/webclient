import { ChainStore } from "../chain/ChainStore";
import { TokenWithSymbol } from "./TokenConfig";

export const BlockExplorerToken = (sym: string, typ: "href" | "open"): string => {
  const tok = TokenWithSymbol(sym);
  const url = ChainStore.getState().getActive().viem.blockExplorers?.default.url;
  if (!url) {
    return "";
  }

  const ref = new URL(`/token/${tok.address}`, url).toString();

  if (typ === "href") {
    return ref;
  }

  if (typ === "open") {
    window.open(ref, "_blank");
  }

  return "";
};
