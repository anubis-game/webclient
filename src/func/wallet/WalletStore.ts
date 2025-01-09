import { combine } from "zustand/middleware";
import { create } from "zustand";
import { Hex } from "viem";
import { LightAccount } from "@account-kit/smart-contracts";
import { LocalAccountSigner } from "@aa-sdk/core";
import { PrivateKeyAccount } from "viem";
import { PublicClient } from "viem";
import { WalletClient } from "viem";
import { WalletStatus } from "../../func/wallet/WalletStatus";

export interface WalletMessage {
  wallet: { address: Hex; client: WalletClient };
  signer: { address: Hex; client: LocalAccountSigner<PrivateKeyAccount> };
  player: { address: Hex; client: LightAccount };
  public: PublicClient;
  status: WalletStatus;
}

// newWalletMessage ensures that we have an initialized loading status so that
// we do not have to work with any undefined state during the first component
// renderings.
const newWalletMessage = (sta: WalletStatus = WalletStatus.Loading): WalletMessage => {
  return {
    status: sta,
  } as WalletMessage;
};

export const WalletStore = create(
  combine(newWalletMessage(), (set) => ({
    delete: (sta: WalletStatus) => {
      set(() => {
        return newWalletMessage(sta);
      });
    },

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

    updateStatus: (s: WalletStatus) => {
      set((state) => {
        return {
          ...state,
          status: s,
        };
      });
    },
  })),
);
