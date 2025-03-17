import { describe } from "vitest";
import { expect } from "vitest";
import { it } from "vitest";

import { IncrementByte } from "./SchemaBytes";

describe("IncrementByte", () => {
  it("should increment -1", () => {
    expect(IncrementByte(-1)).toBe(0);
  });

  it("should increment 0", () => {
    expect(IncrementByte(0)).toBe(1);
  });

  it("should increment 1", () => {
    expect(IncrementByte(1)).toBe(2);
  });

  it("should increment 7", () => {
    expect(IncrementByte(7)).toBe(8);
  });

  it("should increment 8", () => {
    expect(IncrementByte(8)).toBe(9);
  });

  it("should increment 9", () => {
    expect(IncrementByte(9)).toBe(10);
  });

  it("should increment 10", () => {
    expect(IncrementByte(10)).toBe(11);
  });

  it("should increment 99", () => {
    expect(IncrementByte(99)).toBe(100);
  });

  it("should increment 100", () => {
    expect(IncrementByte(100)).toBe(101);
  });

  it("should increment 101", () => {
    expect(IncrementByte(101)).toBe(102);
  });

  it("should increment 250", () => {
    expect(IncrementByte(250)).toBe(251);
  });

  it("should increment 255 back to 0", () => {
    expect(IncrementByte(255)).toBe(0);
  });

  it("should increment 12635 back to 0", () => {
    expect(IncrementByte(12635)).toBe(0);
  });
});
