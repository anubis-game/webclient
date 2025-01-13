import * as React from "react";

import { GuardianWebsocketProtocol } from "../../func/config/Config";
import { GuardianStore } from "../../func/guardian/GuardianStore";
import { StreamStore } from "../../func/stream/StreamStore";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";
import { isAddressEqual, zeroAddress } from "viem";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";

export const Test = () => {
  GuardianStore(
    useShallow((state) => ({
      active: state.active,
    })),
  );

  const stream = StreamStore(
    useShallow((state) => ({
      auth: state.auth,
      client: state.client,
      connected: state.connected,
      ping: state.ping,
      pong: state.pong,
      user: state.user,
    })),
  );

  const grd = GuardianStore.getState().getActive();

  React.useEffect(() => {
    console.log("AUT", stream.auth);
  }, [stream.auth]);

  // TODO add button for KILL to release player

  return (
    <div className="grid gap-4 mt-4">
      <button
        type="button"
        className="button solid p-3"
        onClick={() => {
          const cli = new WebSocket(
            `${GuardianWebsocketProtocol}://${grd.endpoint}/connect`, //
            ["user-challenge", stream.auth], //
          );

          {
            StreamStore.getState().updateClient(cli);
          }
        }}
      >
        new Websocket
      </button>

      <button
        type="button"
        className="button solid p-3"
        onClick={() => {
          StreamStore.getState().sendPing();
        }}
      >
        sendPing
        {stream.ping && stream.pong ? " " + (stream.pong - stream.ping).toFixed(2) + "ms" : ""}
      </button>

      {stream.connected && (
        <button
          type="button"
          className="button solid p-3"
          onClick={() => {
            StreamStore.getState().sendJoin();
          }}
        >
          Join
        </button>
      )}

      {stream.user.map((x) => (
        <button
          key={x}
          type="button"
          className="button solid p-3"
          onClick={() => {
            const wal = WalletStore.getState().wallet.address;

            if (isAddressEqual(x, wal)) {
              StreamStore.getState().sendKill(zeroAddress, wal);
            } else {
              StreamStore.getState().sendKill(wal, x);
            }
          }}
        >
          Kill {TruncateSeparator(x)}
        </button>
      ))}
    </div>
  );
};
