import { alchemy } from "@account-kit/infra";
import { ChainStore } from "../../func/chain/ChainStore";
import { createLightAccount } from "@account-kit/smart-contracts";
import { DotIcon } from "../icon/DotIcon";
import { EnsureSigner } from "../../func/signer/EnsureSigner";
import { EnsureStream } from "../../func/stream/EnsureStream";
import { hashMessage } from "viem";
import { Hex } from "viem";
import { recoverPublicKey } from "viem";
import { StatusIcon } from "../icon/StatusIcon";
import { StreamStore } from "../../func/stream/StreamStore";
import { Tooltip } from "../tooltip/Tooltip";
import { useAccountEffect } from "wagmi";
import { useDisconnect } from "wagmi";
import { useShallow } from "zustand/react/shallow";
import { WalletAccount } from "../wallet/WalletAccount";
import { WalletButton } from "../wallet/WalletButton";
import { WalletStore } from "../../func/wallet/WalletStore";

export const StatusBar = () => {
  const { connected, ping } = StreamStore(
    useShallow((state) => ({
      connected: state.connected,
      ping: state.ping,
    })),
  );

  const { disconnect } = useDisconnect();

  useAccountEffect({
    onConnect: async (ctx: any) => {
      if (StreamStore.getState().connected && ctx.isReconnected) {
        return;
      }

      {
        WalletStore.getState().updateWallet(ctx.address);
      }

      try {
        const tmp = EnsureSigner();
        WalletStore.getState().updateSigner(await tmp.getAddress());

        const con = await createLightAccount({
          chain: ChainStore.getState().getActive().alchemy,
          signer: tmp,
          transport: alchemy({ apiKey: ChainStore.getState().getActive().alchemyApiKey }),
        });
        WalletStore.getState().updateContract(con.address);

        const mes = `signer-${con.address}-${uniSec()}`;
        const sig = await con.getSigner().signMessage(mes);
        const pub = await recoverPublicKey({
          hash: hashMessage(mes),
          signature: sig as Hex,
        });

        {
          EnsureStream(mes, pub, sig, disconnect);
        }
      } catch (err) {
        disconnect();
        console.error(err);
      }
    },
    onDisconnect: () => {
      StreamStore.getState().client?.close();
      StreamStore.getState().updateClient(null);
      StreamStore.getState().updateConnected(false);
    },
  });

  return (
    <div className="absolute top-4 left-4 flex gap-4 items-center">
      {connected ? <WalletAccount /> : <WalletButton />}

      <Tooltip
        content={<>{connected ? `${ping}ms` : `not connected`}</>}
        side="right"
        trigger={<>{connected ? <DotIcon className="text-green-600" /> : <StatusIcon className="text-red-600" />}</>}
      />
    </div>
  );
};

const uniSec = (): string => {
  return Math.floor(Date.now() / 1000).toString();
};
