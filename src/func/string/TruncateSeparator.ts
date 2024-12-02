export const TruncateSeparator = (str: string, sep: string = "...") => {
  if (!str) return "";
  return str.slice(0, 6) + sep + str.slice(-4);
};
