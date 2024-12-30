import * as React from "react";

import { Address } from "viem";
import { ExistsTokenSymbol } from "../../func/token/TokenConfig";
import { GuardianObject } from "../../func/request/GuardianObject";
import { GuardianEndpoints } from "../../func/config/Config";
import { GuardianHypertextProtocol } from "../../func/config/Config";
import { RequestStore } from "../../func/request/RequestStore";
import { ShuffleStrings } from "../../func/string/ShuffleStrings";
import { Sleep } from "../../func/sleep/Sleep";
import { SymbolWithRegistry } from "../../func/contract/ContractConfig";
import { zeroAddress } from "viem";

export const RequestSetup = () => {
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
      try {
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
      } catch (err) {
        {
          console.log(`Guardian at ${x} could not be scraped: ${err}`);
        }

        return {
          key: zeroAddress,
          val: {
            healthy: false,
            endpoint: x,
            latency: NaN,
            symbol: "",
          },
        };
      }
    }),
  );

  for (const x of all) {
    if (x.val.healthy) {
      m.set(x.key, x.val);
    }
  }

  RequestStore.getState().updateGuardians(m);
};
