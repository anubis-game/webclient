import * as React from "react";

import { useShallow } from "zustand/react/shallow";
import { StreamStore } from "../../func/stream/StreamStore";
import { SchemaDecode, SchemaDecodeString } from "../../func/schema/SchemaDecode";
import { SchemaAction } from "../../func/schema/SchemaAction";

export const StreamSetup = () => {
  const stream = StreamStore(
    useShallow((state) => ({
      client: state.client,
    })),
  );

  React.useEffect(() => {
    if (!stream.client) {
      return;
    }

    {
      stream.client.binaryType = "arraybuffer";
    }

    stream.client.onopen = () => {
      StreamStore.getState().sendPing();
      StreamStore.getState().sendAuth();
      StreamStore.getState().updateConnected(true);
    };

    stream.client.onclose = () => {
      // TODO setup websocket close handler
    };

    stream.client.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    stream.client.onmessage = (e) => {
      const dec = SchemaDecode(e.data);

      switch (dec.action) {
        case SchemaAction.Pong:
          StreamStore.getState().updatePong(performance.now());
          break;
        case SchemaAction.Auth:
          StreamStore.getState().updateAuth(SchemaDecodeString(dec.message));
          break;
        case SchemaAction.Cast:
        case SchemaAction.Move:
        case SchemaAction.Kill:
      }
    };
  }, [stream.client]);

  return <></>;
};
