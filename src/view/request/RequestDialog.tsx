import { StreamStore } from "../../func/stream/StreamStore";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";
import { useShallow } from "zustand/react/shallow";
import { RequestHandler } from "../../func/request/RequestHandler";

export const RequestDialog = () => {
  // TODO move this to the RequestStore
  const { guardians } = StreamStore(
    useShallow((state) => ({
      guardians: state.guardians,
    })),
  );

  if (!guardians) {
    return <></>;
  }

  // Since we randomize the update of the Guardian metadata, we have to sort the
  // map before rendering the buttons below. That is to guarantee a stable
  // visual representation of the available Guardian game servers.
  const sorted = Array.from(guardians.entries()).sort(([x], [b]) => x.localeCompare(b));

  // TODO make Guardian buttons the default container in FormStatus

  // TODO show this in a default open Dialog
  return (
    <div className="grid gap-4 w-full">
      <div className="guardian dialog p-4 grid gap-4">
        {sorted.map(([key, val]) => (
          <div
            key={key}
            className="button solid p-4"
            onClick={() => RequestHandler(key, val.symbol)}
          >
            <div className="w-full grid grid-cols-6 gap-4 whitespace-nowrap">
              <div className="col-span-4">{TruncateSeparator(key, "...")}</div>
              <div className="col-span-1">{val.symbol}</div>
              <div className="col-span-1">{Math.round(val.latency)} ms</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
