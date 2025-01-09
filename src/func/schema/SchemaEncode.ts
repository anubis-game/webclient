import { SchemaAction } from "./SchemaAction";

//
export const SchemaEncodeAction = (act: SchemaAction): Uint8Array => {
  const buf = new Uint8Array(1);

  buf[0] = act;

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
