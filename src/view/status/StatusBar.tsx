import { hashMessage } from "viem";
import { OnlineTooltipIcon } from "../icon/OnlineTooltipIcon";
import { recoverPublicKey } from "viem";
import { StreamStore } from "../../func/stream/StreamStore";
import { Tooltip } from "../tooltip/Tooltip";
import { useAccountEffect } from "wagmi";
import { useDisconnect } from "wagmi";
import { useShallow } from "zustand/react/shallow";
import { useSignMessage } from "wagmi";
import { WalletButton } from "../wallet/WalletButton";

export const StatusBar = () => {
  const { connected, ping } = StreamStore(
    useShallow((state) => ({
      connected: state.connected,
      ping: state.ping,
    })),
  );

  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  useAccountEffect({
    onConnect: async (ctx: any) => {
      if (StreamStore.getState().connected && ctx.isReconnected) {
        return;
      }

      try {
        const mes = `signer-${ctx.address}-${uniSec()}`;
        const sig = await signMessageAsync({ message: mes });
        const pub = await recoverPublicKey({
          hash: hashMessage(mes),
          signature: sig,
        });

        const cli = new WebSocket("ws://127.0.0.1:7777/anubis", ["personal_sign", mes, pub, sig]);

        StreamStore.getState().updateClient(cli);

        cli.onopen = () => {
          StreamStore.getState().sendPing();
          StreamStore.getState().updateConnected(true);
        };

        cli.onclose = () => {
          disconnect();
        };

        cli.onerror = (err) => {
          console.error("WebSocket error:", err);
        };

        cli.onmessage = (e) => {
          const spl = e.data.split(",");

          if (spl[0] === "ping") {
            StreamStore.getState().updatePing(prsPng(spl));
          } else {
            StreamStore.getState().reader(e.data);
          }
        };
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
    <div className="absolute top-4 right-4 flex gap-4 items-center">
      <Tooltip
        content={<>{ping}ms</>}
        side="left"
        trigger={<OnlineTooltipIcon className={connected ? "text-green-600" : "text-red-600"} />}
      />
      <WalletButton />
    </div>
  );
};

const prsPng = (spl: string[]): number => {
  if (spl.length == 2) {
    return Date.now() - parseInt(spl[1], 10);
  }

  throw "inavlid ping response";
};

const uniSec = (): string => {
  return Math.floor(Date.now() / 1000).toString();
};
