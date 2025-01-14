import * as React from "react";

import { useShallow } from "zustand/react/shallow";
import { SchemaAction } from "../../func/schema/SchemaAction";
import { SchemaDecode } from "../../func/schema/SchemaDecode";
import { SchemaDecodeAddress } from "../../func/schema/SchemaDecode";
import { SchemaDecodeString } from "../../func/schema/SchemaDecode";
import { StreamStore } from "../../func/stream/StreamStore";

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

    // We define the basis of our websocket communication as binary data packets
    // to prevent higher order decoding. Given the first byte of a websocket
    // message, we can then decide how to decode the received message further.
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
        case SchemaAction.Join:
          StreamStore.getState().createUser(SchemaDecodeAddress(dec.message, 0));
          break;
        case SchemaAction.Cast:
        case SchemaAction.Move:
        case SchemaAction.Kill:
          StreamStore.getState().deleteUser(SchemaDecodeAddress(dec.message, 1));
          break;
      }
    };
  }, [stream.client]);

  return <></>;
};
