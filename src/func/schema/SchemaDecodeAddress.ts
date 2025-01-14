import { Address } from "viem";

const hexes = Array.from({ length: 256 }, (_v, i) => {
  return i.toString(16).padStart(2, "0");
});

//
export const SchemaDecodeAddress = (byt: Uint8Array, ind: number): Address => {
  const off = ind * 20;
  const buf = byt.slice(off, off + 20);

  let hex: Address = "0x";

  for (let i = 0; i < 20; i++) {
    hex += hexes[buf[i]];
  }

  return hex;
};

//
export const WithoutTable = (byt: Uint8Array, ind: number): Address => {
  const off = ind * 20;
  const buf = byt.slice(off, off + 20);

  let hex: Address = "0x";

  for (let i = 0; i < 20; i++) {
    hex += buf[i].toString(16).padStart(2, "0");
  }

  return hex;
};
