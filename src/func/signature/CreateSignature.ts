import { Address } from "viem";
import { Hex } from "viem";
import { SignatureContext } from "./SignatureContext";
import { WalletStore } from "../wallet/WalletStore";

export const CreateSignature = (grd: Address): SignatureContext => {
  const tim = uniSec();
  const wal = WalletStore.getState().wallet.address;
  const pla = WalletStore.getState().player.address;

  return {
    grd: grd.toLowerCase(),
    tim: tim.toString(),
    wal: wal.toLowerCase(),
    pla: pla.toLowerCase(),
    sg1: async (): Promise<Hex> => {
      return await WalletStore.getState().signer.client.signMessage(
        ["request", grd.toLowerCase(), tim.toString(), pla.toLowerCase()].join("-"),
      );
    },
    sg2: async (): Promise<Hex> => {
      return await WalletStore.getState().signer.client.signMessage(
        ["connect", grd.toLowerCase(), tim.toString(), pla.toLowerCase()].join("-"),
      );
    },
  };
};

const uniSec = (): number => {
  return Math.floor(Date.now() / 1000);
};
