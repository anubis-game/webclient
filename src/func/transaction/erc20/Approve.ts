import { Address } from "viem";
import { ContractConfig } from "../../contract/ContractConfig";
import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { encodePacked } from "viem";
import { keccak256 } from "viem";
import { numberToHex } from "viem";
import { pad } from "viem";
import { padHex } from "viem";
import { parseUnits } from "viem";
import { RegistryWithSymbol } from "../../contract/ContractConfig";
import { StateMapping } from "viem";
import { TokenConfig } from "../../token/TokenConfig";
import { TokenWithSymbol } from "../../token/TokenConfig";
import { TransactionObject } from "../TransactionObject";
import { WalletStore } from "../../wallet/WalletStore";

export const Encode = (amo: number, sym: string): TransactionObject => {
  const con = RegistryWithSymbol(sym);
  const tok = TokenWithSymbol(sym);
  const bal = parseUnits(String(amo), tok.decimals);

  return {
    name: "Approve",
    target: tok.address,
    data: encodeFunctionData(newPar(con, tok, bal)),
  };
};

export const Simulate = async (amo: number, sym: string) => {
  const con = RegistryWithSymbol(sym);
  const tok = TokenWithSymbol(sym);
  const bal = parseUnits(String(amo), tok.decimals);

  const wal = WalletStore.getState().wallet;
  const pub = WalletStore.getState().public;

  await pub.simulateContract({
    ...newPar(con, tok, bal),
    address: tok.address,
    account: wal.address,
  });
};

export const State = (acc: Address, spd: Address, bal: bigint, slt: number): StateMapping => {
  return [
    {
      slot: keccak256(
        encodePacked(
          ["bytes32", "bytes32"],
          [
            // The address here is left padded as a single 32 byte word,
            // representing the spender address being approved to spend ERC20
            // tokens for the approving account. It is important to encode this
            // address of 20 bytes into a left padded 32 byte word, which is why
            // the type definition for this parameter is bytes32 and not
            // address.
            padHex(spd, { dir: "left", size: 32 }),
            keccak256(
              encodePacked(
                ["bytes32", "uint256"],
                [
                  // The address here is left padded as a single 32 byte word,
                  // representing the account address having approved the token
                  // spender. It is important to encode this address of 20 bytes
                  // into a left padded 32 byte word, which is why the type
                  // definition for this parameter is bytes32 and not address.
                  padHex(acc, { dir: "left", size: 32 }),

                  // The bigint here is a single 32 byte word, representing the
                  // storage slot index for the ERC20 _allowances mapping as
                  // defined by the given token contract. The standard
                  // standalone storage slot index for _allowances of ERC20
                  // contracts is 1. In case the storage slot index differs, the
                  // real value can be read with e.g. the hardhat-storage-layout
                  // plugin for non-standard ERC20 implementations.
                  BigInt(slt),
                ],
              ),
            ),
          ],
        ),
      ),
      // The value here is left padded as a single 32 byte word, representing
      // the balance amount approved to be spent by the approved spender. This
      // value is overwriting the contract state at the generated storage slot
      // in order for the simulation to verify that the required approval took
      // in fact place.
      value: pad(numberToHex(bal), { size: 32 }),
    },
  ];
};

const newPar = (con: ContractConfig, tok: TokenConfig, bal: bigint): Required<EncodeFunctionDataParameters> => {
  return {
    abi: tok.abi,
    functionName: "approve",
    args: [
      con.address, // spender address
      bal, //         token amount
    ],
  };
};
