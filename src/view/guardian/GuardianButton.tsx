import * as Request from "../../func/transaction/registry/Request";

import { Address } from "viem";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { SendTransaction } from "../../func/transaction/SendTransaction";
import { StreamStore } from "../../func/stream/StreamStore";
import { useShallow } from "zustand/react/shallow";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";
import { WalletStore } from "../../func/wallet/WalletStore";

export const GuardianButton = () => {
  const { guardians } = StreamStore(
    useShallow((state) => ({
      guardians: state.guardians,
    })),
  );

  const onClick = async (grd: Address) => {
    if (!WalletStore.getState().connected) {
      // TODO ensure connect wallet before contract write
    }

    if (!BalanceStore.getState().hasAvailable()) {
      // TODO ensure deposit balance before contract write
    }

    {
      await Request.Simulate(grd);
    }

    await SendTransaction([
      Request.Encode(grd), //
    ]);
  };

  if (!guardians) {
    return <></>;
  }

  // Since we randomize the update of the Guardian metadata, we have to sort the
  // map before rendering the buttons below. That is to guarantee a stable
  // visual representation of the available Guardian game servers.
  const sorted = Array.from(guardians.entries()).sort(([x], [b]) => x.localeCompare(b));

  return (
    <div className="guardian dialog grid mt-32 p-4 gap-4 ">
      {sorted.map(([key, val]) => (
        <div
          key={key}
          className="button solid p-4 gap-4 items-center justify-between"
          onClick={() => onClick(key)}
        >
          <div className="w-[144px]">{TruncateSeparator(key, "...")}</div>
          <div>{Math.round(val.latency)} ms</div>
        </div>
      ))}
    </div>
  );
};
