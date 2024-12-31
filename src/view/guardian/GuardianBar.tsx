import { BalanceStatusFunded } from "../../func/balance/BalanceStatus";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { useShallow } from "zustand/react/shallow";
import { GuardianStore } from "../../func/guardian/GuardianStore";

export const GuardianBar = () => {
  const balance = BalanceStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  if (balance.status !== BalanceStatusFunded) {
    return <></>;
  }

  return (
    <div className="absolute bottom-4 right-4 flex gap-4 items-center">
      <button
        className="button ghost px-4 py-3"
        onClick={() => GuardianStore.getState().updateDialog(true)}
      >
        <div>Switch Game</div>
      </button>
    </div>
  );
};
