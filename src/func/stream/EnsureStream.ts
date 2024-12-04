import { GuardianHostPort } from "../config/Config";
import { GuardianWebsocketProtocol } from "../config/Config";
import { StreamStore } from "../../func/stream/StreamStore";

export const EnsureStream = (mes: string, pub: string, sig: string, clo: () => void) => {
  const cli = new WebSocket(`${GuardianWebsocketProtocol}://${GuardianHostPort}/anubis`, [
    "personal_sign",
    mes,
    pub,
    sig,
  ]);

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
