import * as React from "react";

import { alchemy } from "@account-kit/infra";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { ChainStore } from "../../func/chain/ChainStore";
import { createLightAccount } from "@account-kit/smart-contracts";
import { createPublicClient, custom } from "viem";
import { createWalletClient } from "viem";
import { EnsureSigner } from "../../func/signer/EnsureSigner";
import { http } from "viem";
import { StreamStore } from "../../func/stream/StreamStore";
import { useAccount } from "wagmi";
import { WalletStatusConnected } from "../../func/wallet/WalletStatus";
import { WalletStatusDisconnected } from "../../func/wallet/WalletStatus";
import { WalletStore } from "../../func/wallet/WalletStore";

export const WalletSetup = () => {
  const { status } = useAccount();

  React.useEffect(() => {
    (async () => {
      if (status === "connected") {
        await setupWallet();
      }

      if (status === "disconnected") {
        disconnect();
      }
    })();
  }, [status]);

  return <></>;
};

const disconnect = () => {
  BalanceStore.getState().delete();
  StreamStore.getState().client?.close();
  StreamStore.getState().updateClient(null);
  StreamStore.getState().updateConnected(false);
  WalletStore.getState().updateStatus(WalletStatusDisconnected);
};

const setupWallet = async () => {
  const chn = ChainStore.getState().getActive();
  const rpc = http(chn.alchemyRpcEndpoint);

  //
  // Wallet
  //

  const wal = createWalletClient({
    chain: chn.viem,
    transport: custom(window.ethereum!),
  });

  const add = await wal.requestAddresses();

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

  BalanceStore.getState().updateBalance();
  WalletStore.getState().updateStatus(WalletStatusConnected);
};
