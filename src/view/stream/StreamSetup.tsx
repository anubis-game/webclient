import * as React from "react";

import { Address } from "viem";
import { ExistsTokenSymbol } from "../../func/token/TokenConfig";
import { GuardianObject } from "../../func/stream/GuardianObject";
import { GuardianEndpoints } from "../../func/config/Config";
import { GuardianHypertextProtocol } from "../../func/config/Config";
import { ShuffleStrings } from "../../func/string/ShuffleStrings";
import { Sleep } from "../../func/sleep/Sleep";
import { StreamStore } from "../../func/stream/StreamStore";
import { SymbolWithRegistry } from "../../func/contract/ContractConfig";

export const StreamSetup = () => {
  // Continuously check the the available guardian servers.
  React.useEffect(() => {
    let mnt = true;

    (async () => {
      while (mnt) {
        await updateGuardians();
        await Sleep(60 * 1000);
      }
    })();

    return () => {
      mnt = false;
    };
  });

  return <></>;
};

const updateGuardians = async () => {
  const m: Map<Address, GuardianObject> = new Map();

  // Ensure a randomized execution of updating the guardian metadata in order to
  // prevent a biased latency representation. That way we may prevent weird
  // network caching behaviour and guarantee that the average of every
  // guardian's latency is properly reflected over time.
  const all = await Promise.all(
    ShuffleStrings(GuardianEndpoints).map(async (x) => {
      const sta = performance.now();
      const res = await fetch(`${GuardianHypertextProtocol}://${x}/version`);
      const end = performance.now();

      const obj = await res.json();

      const grd = obj["grd"] as Address;
      const reg = obj["reg"] as Address;
      const sym = SymbolWithRegistry(reg);

      return {
        key: grd,
        val: {
          healthy: res.ok && ExistsTokenSymbol(sym),
          endpoint: x,
          latency: end - sta,
          symbol: sym,
        },
      };
    }),
  );

  for (const x of all) {
    m.set(x.key, x.val);
  }

  StreamStore.getState().updateGuardians(m);
};
