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
      // TODO ensure connect wallet
    }

    if (!BalanceStore.getState().hasAvailable()) {
      // TODO ensure deposit balance
    }

    {
      await Request.Simulate(grd);
    }

    await SendTransaction([
      Request.Encode(grd), //
    ]);
  };

  return (
    <div className="guardian dialog grid mt-32 p-4 gap-4 ">
      {guardians &&
        Array.from(guardians.entries()).map(([key, val]) => (
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
