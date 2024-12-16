import { alchemy } from "@account-kit/infra";
import { ChainStore } from "../../func/chain/ChainStore";
import { createLightAccount } from "@account-kit/smart-contracts";
import { createPublicClient, custom } from "viem";
import { createWalletClient } from "viem";
import { EnsureSigner } from "../../func/signer/EnsureSigner";
import { http } from "viem";
import { StreamStore } from "../../func/stream/StreamStore";
import { TokenStore } from "../../func/token/TokenStore";
import { useAccountEffect } from "wagmi";
import { WalletStore } from "../../func/wallet/WalletStore";

export const WalletSetup = () => {
  useAccountEffect({
    onConnect: async (ctx: any) => {
      if (StreamStore.getState().connected && ctx.isReconnected) {
        return;
      }

      const chn = ChainStore.getState().getActive();
      const rpc = http(chn.alchemyRpcEndpoint);

      //
      // Wallet
      //

      const wal = createWalletClient({
        chain: chn.viem,
        transport: custom(window.ethereum!),
      });

      const add = await wal.getAddresses();

      if (ctx.address !== add[0]) {
        throw new Error(`address mismatch: ${ctx.address} != ${add[0]}`);
      }

      WalletStore.getState().updateWallet(add[0], wal);

      //
      // Signer
      //

      const sig = EnsureSigner();

      WalletStore.getState().updateSigner(await sig.getAddress(), sig);

      //
      // Player
      //

      const pla = await createLightAccount({
        chain: ChainStore.getState().getActive().alchemy,
        signer: sig,
        transport: alchemy({ apiKey: ChainStore.getState().getActive().alchemyApiKey }),
      });

      WalletStore.getState().updatePlayer(pla.address, pla);

      //
      // Public
      //

      const pub = createPublicClient({
        batch: { multicall: true },
        chain: chn.viem,
        transport: rpc,
      });

      WalletStore.getState().updatePublic(pub);

      //
      // Connected
      //

      TokenStore.getState().updateBalance();
      WalletStore.getState().updateConnected(true);
    },
    onDisconnect: () => {
      StreamStore.getState().client?.close();
      StreamStore.getState().updateClient(null);
      StreamStore.getState().updateConnected(false);
      WalletStore.getState().updateConnected(false);
    },
  });

  return <></>;
};
