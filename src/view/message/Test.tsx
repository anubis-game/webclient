import * as Request from "../../func/transaction/registry/Request";

import { Address } from "viem";
import { SendTransaction } from "../../func/transaction/SendTransaction";
import { StreamStore } from "../../func/stream/StreamStore";
import { useShallow } from "zustand/react/shallow";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";

export const Test = () => {
  const { guardians } = StreamStore(
    useShallow((state) => ({
      guardians: state.guardians,
    })),
  );

  const onClick = async (grd: Address) => {
    {
      await Request.Simulate(grd);
    }

    await SendTransaction([
      Request.Encode(grd), //
    ]);
  };

  return (
    <div className="mt-8">
      {guardians &&
        Array.from(guardians.entries()).map(([key, val]) => (
          <div
            key={key}
            className="button flex mb-2 p-4 gap-4 items-center justify-between"
            onClick={() => onClick(key)}
          >
            <div className="w-[144px]">{TruncateSeparator(key, "...")}</div>
            <div>{Math.round(val.latency)} ms</div>
          </div>
        ))}
    </div>
  );
};
