import { Address } from "viem";
import { SignatureContext } from "./SignatureContext";
import { WalletStore } from "../wallet/WalletStore";
import { zeroAddress } from "viem";

export const DepositSignature = async (): Promise<SignatureContext> => {
  const tim = SignatureTimestamp();
  const wal = WalletStore.getState().wallet;
  const sig = WalletStore.getState().signer;
  const pla = WalletStore.getState().player;

  return {
    grd: zeroAddress,
    tim: tim.toString(),
    wal: wal.address.toLowerCase(),
    sig: sig.address.toLowerCase(),
    pla: pla.address.toLowerCase(),
    sgn: await sig.client.signMessage(
      ["deposit", tim.toString(), wal.address.toLowerCase()].join("-"), //
    ),
  };
};

export const RequestSignature = async (grd: Address, tim: number): Promise<SignatureContext> => {
  const wal = WalletStore.getState().wallet;
  const sig = WalletStore.getState().signer;
  const pla = WalletStore.getState().player;

  return {
    grd: grd.toLowerCase(),
    tim: tim.toString(),
    wal: wal.address.toLowerCase(),
    sig: sig.address.toLowerCase(),
    pla: pla.address.toLowerCase(),
    sgn: await sig.client.signMessage(
      ["request", tim.toString(), grd.toLowerCase(), pla.address.toLowerCase()].join("-"), //
    ),
  };
};

export const ConnectSignature = async (grd: Address, tim: number): Promise<SignatureContext> => {
  const wal = WalletStore.getState().wallet;
  const sig = WalletStore.getState().signer;
  const pla = WalletStore.getState().player;

  return {
    grd: grd.toLowerCase(),
    tim: tim.toString(),
    wal: wal.address.toLowerCase(),
    sig: sig.address.toLowerCase(),
    pla: pla.address.toLowerCase(),
    sgn: await sig.client.signMessage(
      ["connect", tim.toString(), grd.toLowerCase(), pla.address.toLowerCase()].join("-"), //
    ),
  };
};

export const SignatureTimestamp = (): number => {
  return Math.floor(Date.now() / 1000);
};
