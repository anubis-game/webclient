import * as React from "react";

import { Address } from "viem";
import { Guardian } from "../../func/stream/StreamMessage";
import { GuardianEndpoints } from "../../func/config/Config";
import { GuardianHypertextProtocol } from "../../func/config/Config";
import { Sleep } from "../../func/sleep/Sleep";
import { StreamStore } from "../../func/stream/StreamStore";
import { ShuffleStrings } from "../../func/string/ShuffleStrings";

export const StreamSetup = () => {
  // Continuously check the the available guardian servers.
  React.useEffect(() => {
    let mnt = true;

    (async () => {
      while (mnt) {
        await updateGuardians();
        await Sleep(5 * 1000);
      }
    })();

    return () => {
      mnt = false;
    };
  });

  return <></>;
};

const updateGuardians = async () => {
  const m: Map<Address, Guardian> = new Map();

  // Ensure a randomized execution of updating the guardian metadata in order to
  // prevent a biased latency representation. That way we may prevent weird
  // network caching behaviour and guarantee that the average of every
  // guardian's latency is properly reflected over time.
  for (const x of ShuffleStrings(GuardianEndpoints)) {
    const sta = performance.now();
    const res = await fetch(`${GuardianHypertextProtocol}://${x}/version`);
    const end = performance.now();

    const obj = await res.json();

    m.set(obj["grd"] as Address, {
      healthy: res.ok,
      endpoint: x,
      latency: end - sta,
    });
  }

  {
    StreamStore.getState().updateGuardians(m);
  }
};
