import { ContractConfig } from "../../contract/ContractConfig";
import { formatUnits } from "viem";
import { TokenConfig } from "../../token/TokenConfig";
import { WalletStore } from "../../wallet/WalletStore";

interface BalanceResponse {
  alo: number;
  avl: number;
  his: number;
}

export const SearchBalance = async (con: ContractConfig, tok: TokenConfig): Promise<BalanceResponse> => {
  const res = (await WalletStore.getState().public.readContract({
    address: con.address,
    abi: con.abi,
    functionName: "searchBalance",
    args: [WalletStore.getState().wallet.address],
  })) as unknown as [bigint, bigint, bigint];

  return {
    alo: Number(formatUnits(res[0], tok.decimals)),
    avl: Number(formatUnits(res[1], tok.decimals)),
    his: Number(formatUnits(res[2], tok.decimals)),
  };
};