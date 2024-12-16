import { Hex } from "viem";

export interface SignatureContext {
  grd: string;
  tim: string;
  wal: string;
  pla: string;
  sg1: () => Promise<Hex>;
  sg2: () => Promise<Hex>;
}
