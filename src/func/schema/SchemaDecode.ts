import { Address } from "viem";

//
export const SchemaDecode = (buf: ArrayBuffer): { action: number; message: Uint8Array } => {
  const view = new Uint8Array(buf);

  return {
    action: view[0],
    message: view.slice(1),
  };
};

//
export const SchemaDecodeAddress = (byt: Uint8Array, ind: number): Address => {
  const off = ind * 20;
  const buf = byt.slice(off, off + 20);

  let hex = "0x";

  for (let i = 0; i < buf.length; i++) {
    hex += buf[i].toString(16).padStart(2, "0");
  }

  return hex as Address;
};

//
export const SchemaDecodeString = (byt: Uint8Array): string => {
  return new TextDecoder().decode(byt);
};
