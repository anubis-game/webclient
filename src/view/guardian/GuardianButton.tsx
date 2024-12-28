import * as Request from "../../func/transaction/registry/Request";

import { Address } from "viem";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { RequestSignature } from "../../func/signature/CreateSignature";
import { SendTransaction } from "../../func/transaction/SendTransaction";
import { SignatureTimestamp } from "../../func/signature/CreateSignature";
import { StreamStore } from "../../func/stream/StreamStore";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";
import { WalletStore } from "../../func/wallet/WalletStore";
import { useShallow } from "zustand/react/shallow";

export const GuardianButton = () => {
  const { guardians } = StreamStore(
    useShallow((state) => ({
      guardians: state.guardians,
    })),
  );

  const onClick = async (grd: Address, sym: string) => {
    if (!WalletStore.getState().connected) {
      // TODO ensure connect wallet before contract write
    }

    if (!BalanceStore.getState().hasAvailable()) {
      // TODO ensure deposit balance before contract write
    }

    const tim = SignatureTimestamp();
    const ctx = await RequestSignature(grd, tim);

    {
      await Request.Simulate(ctx, sym);
    }

    await SendTransaction([
      Request.Encode(ctx, sym), //
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
    <div className="guardian dialog mt-32 p-4 grid gap-4">
      {sorted.map(([key, val]) => (
        <div
          key={key}
          className="button solid p-4"
          onClick={() => onClick(key, val.symbol)}
        >
          <div className="w-full grid grid-cols-6 gap-4 whitespace-nowrap">
            <div className="col-span-4">{TruncateSeparator(key, "...")}</div>
            <div className="col-span-1">{val.symbol}</div>
            <div className="col-span-1">{Math.round(val.latency)} ms</div>
          </div>
        </div>
      ))}
    </div>
  );
};
