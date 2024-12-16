import { DotIcon } from "../icon/DotIcon";
import { StatusIcon } from "../icon/StatusIcon";
import { StreamStore } from "../../func/stream/StreamStore";
import { Tooltip } from "../tooltip/Tooltip";
import { useShallow } from "zustand/react/shallow";
import { WalletAccount } from "./WalletAccount";
import { WalletButton } from "./WalletButton";
import { WalletStore } from "../../func/wallet/WalletStore";

export const WalletBar = () => {
  const stream = StreamStore(
    useShallow((state) => ({
      connected: state.connected,
      ping: state.ping,
    })),
  );

  const wallet = WalletStore(
    useShallow((state) => ({
      connected: state.connected,
    })),
  );

  return (
    <div className="absolute top-4 left-4 flex gap-4 items-center">
      {wallet.connected ? <WalletAccount /> : <WalletButton />}

      <Tooltip
        content={<>{stream.connected ? `${stream.ping}ms` : `not playing`}</>}
        side="right"
        trigger={
          <>{stream.connected ? <DotIcon className="text-green-600" /> : <StatusIcon className="text-red-600" />}</>
        }
      />
    </div>
  );
};
