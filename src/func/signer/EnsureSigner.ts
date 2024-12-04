import { generatePrivateKey } from "viem/accounts";
import { Hex } from "viem";
import { LocalAccountSigner } from "@aa-sdk/core";
import { PrivateKeyAccount } from "viem";

const stoKey = "key.anubis.game/private";

export const EnsureSigner = (): LocalAccountSigner<PrivateKeyAccount> => {
  return LocalAccountSigner.privateKeyToAccountSigner(ensKey());
};

// ensKey generates a new hex encoded private key, if none exists already in
// local storage, and otherwise returns the existing private key for re-use.
export const ensKey = (): Hex => {
  const exi = localStorage.getItem(stoKey);
  if (exi) {
    return exi as Hex;
  }

  const gen = generatePrivateKey();
  {
    localStorage.setItem(stoKey, gen);
  }

  return gen as Hex;
};
