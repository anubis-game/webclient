import * as Approve from "../erc20/Approve";

import { ContractConfig } from "../../contract/ContractConfig";
import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { parseUnits } from "viem";
import { RegistryWithSymbol } from "../../contract/ContractConfig";
import { SignatureContext } from "../../signature/SignatureContext";
import { TokenConfig } from "../../token/TokenConfig";
import { TokenWithSymbol } from "../../token/TokenConfig";
import { TransactionObject } from "../TransactionObject";
import { WalletStore } from "../../wallet/WalletStore";

export const Encode = (ctx: SignatureContext, amo: number, sym: string): TransactionObject => {
  const con = RegistryWithSymbol(sym);
  const tok = TokenWithSymbol(sym);
  const bal = parseUnits(String(amo), tok.decimals);

  return {
    name: "Deposit",
    target: con.address,
    data: encodeFunctionData(encPar(ctx, con, tok, bal)),
  };
};

export const Simulate = async (ctx: SignatureContext, amo: number, sym: string) => {
  const con = RegistryWithSymbol(sym);
  const tok = TokenWithSymbol(sym);
  const bal = parseUnits(String(amo), tok.decimals);

  const wal = WalletStore.getState().wallet;
  const pub = WalletStore.getState().public;

  await pub.simulateContract({
    ...encPar(ctx, con, tok, bal),
    address: con.address,
    account: wal.address,
    stateOverride: [
      {
        address: tok.address,
        stateDiff: Approve.State(
          wal.address, // the Wallet address owning the tokens
          con.address, // the Registry contract as spender address
          bal, //         the amount to be spent
          tok.slot, //    the storage slot to simulate for ERC20 _allowances
        ),
      },
    ],
  });
};

const encPar = (
  ctx: SignatureContext,
  con: ContractConfig,
  tok: TokenConfig,
  bal: bigint,
): Required<EncodeFunctionDataParameters> => {
  return {
    abi: [
      ...con.abi, //            the Registry contract ABI
      ...tok.abi, //            the Token contract ABI for error handling
    ],
    functionName: "deposit", // function deposit(uint256 bal, uint64 tim, address sig, bytes memory sgn) public
    args: [
      bal, //                   the amount of tokens to deposit
      ctx.tim, //               the valid unix timestamp
      ctx.sig, //               the Signer address belonging to the user
      ctx.sgn, //               the signature proving Signer ownership
    ],
  };
};
