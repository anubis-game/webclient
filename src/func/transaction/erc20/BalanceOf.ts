import { formatUnits } from "viem";
import { TokenConfig } from "../../token/TokenConfig";
import { WalletStore } from "../../wallet/WalletStore";

export const BalanceOf = async (tok: TokenConfig): Promise<number> => {
  const res = (await WalletStore.getState().public.readContract({
    address: tok.address,
    abi: tok.abi,
    functionName: "balanceOf",
    args: [WalletStore.getState().wallet.address],
  })) as unknown as bigint;

  return Number(formatUnits(res, tok.decimals));
};
