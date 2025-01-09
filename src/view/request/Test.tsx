import * as React from "react";

import { GuardianWebsocketProtocol } from "../../func/config/Config";
import { GuardianStore } from "../../func/guardian/GuardianStore";
import { StreamStore } from "../../func/stream/StreamStore";
import { useShallow } from "zustand/react/shallow";

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
          StreamStore.getState().sendAuth();
        }}
      >
        sendAuth
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

      <button
        type="button"
        className="button solid p-3"
      >
        Connected {stream.connected ? "True" : "False"}
      </button>
    </div>
  );
};
