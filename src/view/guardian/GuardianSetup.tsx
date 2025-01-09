import * as React from "react";

import { Address } from "viem";
import { BalanceStatus } from "../../func/balance/BalanceStatus";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { ExistsTokenSymbol } from "../../func/token/TokenConfig";
import { GuardianObject } from "../../func/guardian/GuardianObject";
import { GuardianEndpoints } from "../../func/config/Config";
import { GuardianHypertextProtocol } from "../../func/config/Config";
import { GuardianStore } from "../../func/guardian/GuardianStore";
import { ShuffleStrings } from "../../func/string/ShuffleStrings";
import { Sleep } from "../../func/sleep/Sleep";
import { SymbolWithRegistry } from "../../func/contract/ContractConfig";
import { useShallow } from "zustand/react/shallow";
import { zeroAddress } from "viem";

export const GuardianSetup = () => {
  const balance = BalanceStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  // Continuously check the available guardian servers.
  React.useEffect(() => {
    // We are not showing any Guardian information until the user connected and
    // funded their wallet. So if the current balance status is not funded, then
    // we return early and do nothing.
    if (BalanceStore.getState().status !== BalanceStatus.Funded) {
      return;
    }

    let mnt = true;

    (async () => {
      while (mnt) {
        await updateGuardians();
        await Sleep(10_000);
      }
    })();

    return () => {
      mnt = false;
    };
  }, [balance.status]);

  return <></>;
};

const updateGuardians = async () => {
  const dic: Map<Address, GuardianObject> = new Map();

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
            address: grd,
            healthy: res.ok && ExistsTokenSymbol(sym),
            endpoint: x,
            latency: end - sta,
            registry: reg,
          },
        };
      } catch (err) {
        {
          console.log(`Guardian at ${x} could not be scraped: ${err}`);
        }

        return {
          key: zeroAddress,
          val: {
            address: zeroAddress,
            healthy: false,
            endpoint: x,
            latency: NaN,
            registry: zeroAddress,
          },
        };
      }
    }),
  );

  for (const x of all.sort((a, b) => a.key.localeCompare(b.key))) {
    if (x.val.healthy) {
      dic.set(x.key, x.val);
    }
  }

  // Update the Guardian objects based on the current data and activated the
  // server with the lowest latency at this point in time once the new data is
  // set.
  {
    GuardianStore.getState().updateObject(dic);
    GuardianStore.getState().updateActive();
  }
};
