import { Address } from "viem";
import { CreateSignature } from "../../signature/CreateSignature";
import { ContractConfig } from "../../contract/ContractConfig";
import { ContractWithSymbol } from "../../contract/ContractConfig";
import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { TransactionObject } from "../TransactionObject";
import { WalletStore } from "../../wallet/WalletStore";

export const Encode = (grd: Address): TransactionObject => {
  const con = ContractWithSymbol("Registry");

  return {
    target: con.address,
    data: encodeFunctionData(encPar(con, grd)),
  };
};

export const Simulate = async (grd: Address) => {
  const con = ContractWithSymbol("Registry");
  const pub = WalletStore.getState().public;
  const sig = WalletStore.getState().signer;

  await pub.simulateContract({
    ...encPar(con, grd),
    address: con.address,
    account: sig.address,
  });
};

const encPar = (con: ContractConfig, grd: Address): Required<EncodeFunctionDataParameters> => {
  const ctx = CreateSignature(grd);

  return {
    abi: [
      ...con.abi, //            the Registry contract ABI
    ],
    functionName: "request", // function request(address grd, uint64 tim, address wal, bytes memory sgn) public
    args: [
      ctx.grd, //               the Guardian address selected by the user
      ctx.tim, //               the threshold timestamp in unix seconds
      ctx.wal, //               the Wallet address containing user funds
      ctx.sg1, //               the request signature generated by the Signer
    ],
  };
};
