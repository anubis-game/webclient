import { Address } from "viem";
import { SchemaAction } from "./SchemaAction";

//
export const SchemaEncodeAction = (act: SchemaAction): Uint8Array => {
  const buf = new Uint8Array(1);

  buf[0] = act;

  return buf;
};

//
export const SchemaEncodeByte = (act: SchemaAction, byt: number): Uint8Array => {
  const buf = new Uint8Array(2);

  buf[0] = act;
  buf[1] = byt;

  return buf;
};

//
export const SchemaEncodeAddress = (act: SchemaAction, ...add: Address[]): Uint8Array => {
  const lis = add.map((x) => {
    const hex = x.slice(2); // remove the 0x prefix
    const byt = new Uint8Array(20); // 20 bytes for every Ethereum address

    for (let i = 0; i < 20; i++) {
      byt[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }

    return byt;
  });

  const buf = new Uint8Array(1 + lis.length * 20);

  buf[0] = act;

  lis.forEach((x, i) => {
    buf.set(x, 1 + i * 20);
  });

  return buf;
};

//
export const SchemaEncodeFloat = (act: SchemaAction, ...flo: number[]): Uint8Array => {
  const buf = new ArrayBuffer(1 + flo.length * 4);
  const byt = new DataView(buf);

  byt.setUint8(0, act);

  for (let i = 0; i < flo.length; i++) {
    byt.setFloat32(1 + i * 4, flo[i], true);
  }

  return new Uint8Array(buf);
};

//
export const SchemaEncodeString = (act: SchemaAction, ...str: string[]): Uint8Array => {
  const byt = new TextEncoder().encode(str.join(","));
  const buf = new Uint8Array(1 + byt.length);

  buf[0] = act;
  buf.set(byt, 1);

  return buf;
};
