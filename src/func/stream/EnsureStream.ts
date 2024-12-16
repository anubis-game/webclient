import { Guardian } from "../../func/stream/StreamStore";
import { GuardianWebsocketProtocol } from "../config/Config";
import { Hex } from "viem";
import { StreamStore } from "../../func/stream/StreamStore";

export const EnsureStream = (grd: Guardian, txn: Hex, sg2: Hex, clo: () => void) => {
  const cli = new WebSocket(`${GuardianWebsocketProtocol}://${grd.endpoint}/connect`, ["dual-handshake", txn, sg2]);

  {
    StreamStore.getState().updateClient(cli);
  }

  cli.onopen = () => {
    StreamStore.getState().sendPing();
    StreamStore.getState().updateConnected(true);
  };

  cli.onclose = () => {
    clo();
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
};

const prsPng = (spl: string[]): number => {
  if (spl.length == 2) {
    return Date.now() - parseInt(spl[1], 10);
  }

  throw "inavlid ping response";
};
