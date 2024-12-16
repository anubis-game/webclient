import * as React from "react";

import { Address } from "viem";
import { Guardian } from "../../func/stream/StreamMessage";
import { GuardianEndpoints } from "../../func/config/Config";
import { GuardianHypertextProtocol } from "../../func/config/Config";
import { Sleep } from "../../func/sleep/Sleep";
import { StreamStore } from "../../func/stream/StreamStore";

export const StreamSetup = () => {
  // Continuously check the the available guardian servers.
  React.useEffect(() => {
    let mnt = true;

    const loop = async () => {
      while (mnt) {
        await updateGuardians();
        await Sleep(60 * 1000);
      }
    };

    loop();

    return () => {
      mnt = false;
    };
  });

  return <></>;
};

const updateGuardians = async () => {
  const m: Map<Address, Guardian> = new Map();

  for (const x of GuardianEndpoints) {
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
