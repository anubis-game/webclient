import { combine } from "zustand/middleware";
import { create } from "zustand";
import { Hex } from "viem";
import { LocalAccountSigner } from "@aa-sdk/core";
import { PrivateKeyAccount } from "viem";
import { PublicClient } from "viem";
import { WalletClient } from "viem";
import { LightAccount } from "@account-kit/smart-contracts";

export interface WalletMessage {
  wallet: { address: Hex; client: WalletClient };
  signer: { address: Hex; client: LocalAccountSigner<PrivateKeyAccount> };
  player: { address: Hex; client: LightAccount };
  public: PublicClient;
  connected: boolean;
  ready: boolean;
}

const newWalletMessage = (): WalletMessage => {
  return {
    connected: false,
    ready: false,
  } as WalletMessage;
};

export const WalletStore = create(
  combine(newWalletMessage(), (set) => ({
    updateWallet: (a: Hex, c: WalletClient) => {
      set((state) => {
        return {
          ...state,
          wallet: {
            address: a,
            client: c,
          },
        };
      });
    },
    updateSigner: (a: Hex, c: LocalAccountSigner<PrivateKeyAccount>) => {
      set((state) => {
        return {
          ...state,
          signer: {
            address: a,
            client: c,
          },
        };
      });
    },
    updatePlayer: (a: Hex, c: LightAccount) => {
      set((state) => {
        return {
          ...state,
          player: {
            address: a,
            client: c,
          },
        };
      });
    },
    updatePublic: (p: PublicClient) => {
      set((state) => {
        return {
          ...state,
          public: p,
        };
      });
    },
    updateConnected: (c: boolean) => {
      set((state) => {
        return {
          ...state,
          connected: c,
        };
      });
    },
    updateReady: (r: boolean) => {
      set((state) => {
        return {
          ...state,
          ready: r,
        };
      });
    },
  })),
);
