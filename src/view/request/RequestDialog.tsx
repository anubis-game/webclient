import { RequestButton } from "./RequestButton";
import { RequestStore } from "../../func/request/RequestStore";
import { useShallow } from "zustand/react/shallow";

export const RequestDialog = () => {
  const { dialog, guardians } = RequestStore(
    useShallow((state) => ({
      dialog: state.dialog,
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

  // TODO automate Guardian selection on behalf of the user
  // TODO show a single simple "Play Now" button

  return (
    <>
      {dialog && (
        <div className="guardian dialog p-4">
          <div className="grid gap-4">
            {sorted.map(([key, val]) => (
              <RequestButton
                key={key}
                address={key}
                object={val}
              />
            ))}

            {Array.from({ length: Math.max(5 - sorted.length, 0) }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="button solid disabled p-4"
              >
                More Games Soon
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
