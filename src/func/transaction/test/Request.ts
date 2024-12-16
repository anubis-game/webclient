import { Address, encodeFunctionData, PublicClient } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { TransactionObject } from "../TransactionObject";

export const Encode = (trg: Address, abi: any, sig: Address, pla: Address): TransactionObject => {
  return {
    target: trg,
    data: encodeFunctionData(encPar(abi, sig, pla)),
  };
};

export const Simulate = async (pub: PublicClient, trg: Address, frm: Address, abi: any, sig: Address, pla: Address) => {
  await pub.simulateContract({
    ...encPar(abi, sig, pla),
    address: trg,
    account: frm,
  });
};

const encPar = (abi: any, sig: Address, pla: Address): Required<EncodeFunctionDataParameters> => {
  return {
    abi: [...abi],
    functionName: "request",
    args: [sig, pla],
  };
};
