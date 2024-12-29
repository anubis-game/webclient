export const HashString = async (...str: string[]): Promise<string> => {
  const enc = new TextEncoder().encode(str.join("-"));
  const buf = await window.crypto.subtle.digest("SHA-256", enc);
  const unt = Array.from(new Uint8Array(buf));
  const hsh = unt.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hsh;
};
