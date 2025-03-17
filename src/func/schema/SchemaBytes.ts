const msk = 0xff;

// IncrementByte takes a number type and treats it as a Uint8. The given number
// b is incremented and framed using the max Uint8 bitmask. Any number larger
// than max Uint8 returns 0, which can be used to start over with valid
// increments again.
export const IncrementByte = (b: number): number => {
  if (b <= msk) {
    return (b + 1) & msk;
  }

  return 0;
};
