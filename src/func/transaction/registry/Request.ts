import { ContractConfig } from "../../contract/ContractConfig";
import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { RegistryWithSymbol } from "../../contract/ContractConfig";
import { SignatureContext } from "../../signature/SignatureContext";
import { TransactionObject } from "../TransactionObject";
import { WalletStore } from "../../wallet/WalletStore";

export const Encode = (ctx: SignatureContext, sym: string): TransactionObject => {
  const con = RegistryWithSymbol(sym);

  return {
    name: "Request",
    target: con.address,
    data: encodeFunctionData(encPar(ctx, con)),
  };
};

export const Simulate = async (ctx: SignatureContext, sym: string) => {
  const con = RegistryWithSymbol(sym);

  const pub = WalletStore.getState().public;
  const pla = WalletStore.getState().player;

  await pub.simulateContract({
    ...encPar(ctx, con),
    address: con.address,
    account: pla.address, // the Player address must be msg.sender during simulation
  });
};

const encPar = (ctx: SignatureContext, con: ContractConfig): Required<EncodeFunctionDataParameters> => {
  return {
    abi: [
      ...con.abi, //            the Registry contract ABI
    ],
    functionName: "request", // function request(address grd, uint64 tim, address wal, bytes memory sgn) public
    args: [
      ctx.grd, //               the Guardian address selected by the user
      ctx.tim, //               the threshold timestamp in unix seconds
      ctx.wal, //               the Wallet address containing user funds
      ctx.sgn, //               the request signature generated by the Signer
    ],
  };
};
