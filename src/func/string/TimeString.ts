export const TimeString = (num: number): string => {
  return `${(num / 1000).toFixed(3)} seconds`;
};
