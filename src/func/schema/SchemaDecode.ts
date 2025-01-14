//
export const SchemaDecode = (buf: ArrayBuffer): { action: number; message: Uint8Array } => {
  const view = new Uint8Array(buf);

  return {
    action: view[0],
    message: view.slice(1),
  };
};

//
export const SchemaDecodeString = (byt: Uint8Array): string => {
  return new TextDecoder().decode(byt);
};
