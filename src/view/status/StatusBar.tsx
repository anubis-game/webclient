import { DotIcon } from "../icon/DotIcon";
import { hashMessage } from "viem";
import { recoverPublicKey } from "viem";
import { StreamClient } from "../../func/stream/StreamClient";
import { StreamStore } from "../../func/stream/StreamStore";
import { useAccountEffect } from "wagmi";
import { useDisconnect } from "wagmi";
import { useShallow } from "zustand/react/shallow";
import { useSignMessage } from "wagmi";
import { WalletButton } from "../wallet/WalletButton";

export const StatusBar = () => {
  const { connected } = StreamStore(
    useShallow((state) => ({
      connected: state.connected,
    })),
  );

  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  useAccountEffect({
    onConnect: async (ctx: any) => {
      if (StreamStore.getState().client?.open() && ctx.isReconnected) {
        return;
      }

      try {
        const mes = `signer-${ctx.address}-${uniSec()}`;
        const sig = await signMessageAsync({ message: mes });
        const pub = await recoverPublicKey({
          hash: hashMessage(mes),
          signature: sig,
        });

        StreamStore.getState().updateClient(
          new StreamClient(
            mes,
            pub,
            sig,
            () => {
              StreamStore.getState().updateConnected(true);
            },
            () => {
              disconnect();
            },
          ),
        );
      } catch (error) {
        disconnect();
      }
    },
    onDisconnect: () => {
      StreamStore.getState().client?.exit();
      StreamStore.getState().updateClient(null);
      StreamStore.getState().updateConnected(false);
    },
  });

  return (
    <div className="absolute top-4 right-4 flex gap-4 items-center">
      <DotIcon className={connected ? "text-green-600" : "text-red-600"} />
      <WalletButton />
    </div>
  );
};

const uniSec = (): string => {
  return Math.floor(Date.now() / 1000).toString();
};
