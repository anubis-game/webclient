// ShuffleStrings implements the Fisher-Yates Shuffle, which is the most
// reliable method for unbiased shuffling.
export const ShuffleStrings = (lis: string[]): string[] => {
  for (let i = lis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lis[i], lis[j]] = [lis[j], lis[i]];
  }

  return lis;
};
