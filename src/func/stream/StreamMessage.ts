import { Address } from "viem";

export interface Guardian {
  healthy: boolean;
  endpoint: string;
  latency: number;
}

export interface StreamMessage {
  client: WebSocket | null;
  connected: boolean;
  guardians: Map<Address, Guardian>;
  ping: number;
  reader: (str: string) => void;
}
