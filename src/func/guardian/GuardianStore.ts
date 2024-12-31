import { Address } from "viem";
import { combine } from "zustand/middleware";
import { create } from "zustand";
import { GuardianObject } from "./GuardianObject";
import { zeroAddress } from "viem";

export interface GuardianMessage {
  active: Address;
  dialog: boolean;
  object: Map<Address, GuardianObject>;
  manual: boolean;
}

const newGuardianMessage = (): GuardianMessage => {
  return {
    active: zeroAddress,
    dialog: false,
    object: new Map(),
    manual: false,
  };
};

export const GuardianStore = create(
  combine(newGuardianMessage(), (set, get) => ({
    delete: () => {
      set(() => {
        return newGuardianMessage();
      });
    },

    getActive: (): GuardianObject => {
      return get().object.get(get().active)!;
    },

    getAll: (): GuardianObject[] => {
      return Array.from(get().object.values());
    },

    selectActive: (a: Address) => {
      set((state) => {
        return {
          ...state,
          active: a,
          manual: true,
        };
      });
    },

    updateActive: () => {
      const man = get().manual;
      const all = Array.from(get().object.values());
      const exi = get().object.has(get().active);

      // Return without changing the active Guardian, if "manual" is true, and
      // if the active Guardian still exists in our mapping.
      if (man && exi) {
        return;
      }

      set((state) => {
        return {
          ...state,
          active: latency(all),
          // Make sure to revert "manual" back to false, if a manual selection
          // has been made, and if the formerly selected Guardian does not exist
          // anymore. If this case does not apply, ensure to keep the value for
          // "manual" as it is.
          manual: man && !exi ? false : man,
        };
      });
    },

    updateDialog: (d: boolean) => {
      set((state) => {
        return {
          ...state,
          dialog: d,
        };
      });
    },

    updateObject: (g: Map<Address, GuardianObject>) => {
      set((state) => {
        return {
          ...state,
          object: g,
        };
      });
    },
  })),
);

const latency = (lis: GuardianObject[]): Address => {
  if (!lis || lis.length === 0) {
    return zeroAddress;
  }

  const g = {
    address: lis[0].address,
    latency: lis[0].latency,
  };

  for (const x of lis) {
    if (x.healthy === true && x.latency < g.latency) {
      g.address = x.address;
      g.latency = x.latency;
    }
  }

  return g.address;
};
