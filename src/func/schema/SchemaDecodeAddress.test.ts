import { describe } from "vitest";
import { expect } from "vitest";
import { it } from "vitest";

import { SchemaDecodeAddress } from "./SchemaDecodeAddress";
import { WithoutTable } from "./SchemaDecodeAddress";

const byt = new Uint8Array([
  0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56,
  0x78,

  0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef,
  0x01,
]);

describe("SchemaDecodeAddress", () => {
  it("should decode address from bytes at index 0", () => {
    expect(SchemaDecodeAddress(byt, 0)).toBe("0x123456789abcdef0123456789abcdef012345678");
  });

  it("should decode address from bytes at index 1", () => {
    expect(SchemaDecodeAddress(byt, 1)).toBe("0xabcdef0123456789abcdef0123456789abcdef01");
  });
});

describe("WithoutTable", () => {
  it("should decode address from bytes at index 0", () => {
    expect(WithoutTable(byt, 0)).toBe("0x123456789abcdef0123456789abcdef012345678");
  });

  it("should decode address from bytes at index 1", () => {
    expect(WithoutTable(byt, 1)).toBe("0xabcdef0123456789abcdef0123456789abcdef01");
  });
});
