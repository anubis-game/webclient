import { Address } from "viem";

export interface GuardianObject {
  address: Address;
  healthy: boolean;
  endpoint: string;
  latency: number;
  registry: Address;
}
