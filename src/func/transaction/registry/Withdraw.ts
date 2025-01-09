import { ContractConfig } from "../../contract/ContractConfig";
import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { parseUnits } from "viem";
import { RegistryWithSymbol } from "../../contract/ContractConfig";
import { TokenConfig } from "../../token/TokenConfig";
import { TokenWithSymbol } from "../../token/TokenConfig";
import { TransactionObject } from "../TransactionObject";
import { WalletStore } from "../../wallet/WalletStore";

export const Encode = (amo: number, sym: string): TransactionObject => {
  const con = RegistryWithSymbol(sym);
  const tok = TokenWithSymbol(sym);
  const bal = parseUnits(String(amo), tok.decimals);

  const enc = encPar(con, tok, bal);

  return {
    name: enc.functionName,
    target: con.address,
    data: encodeFunctionData(enc),
  };
};

export const Simulate = async (amo: number, sym: string) => {
  const con = RegistryWithSymbol(sym);
  const tok = TokenWithSymbol(sym);
  const bal = parseUnits(String(amo), tok.decimals);

  const wal = WalletStore.getState().wallet;
  const pub = WalletStore.getState().public;

  await pub.simulateContract({
    ...encPar(con, tok, bal),
    address: con.address,
    account: wal.address,
  });
};

const encPar = (con: ContractConfig, tok: TokenConfig, bal: bigint): Required<EncodeFunctionDataParameters> => {
  return {
    abi: [
      ...con.abi, //             the Registry contract ABI
      ...tok.abi, //             the Token contract ABI for error handling
    ],
    functionName: "Withdraw", // function Withdraw(uint256 bal) public
    args: [
      bal, //                    the amount of tokens to withdraw
    ],
  };
};
