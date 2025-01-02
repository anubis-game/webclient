import { BalanceStatusFunded } from "../../func/balance/BalanceStatus";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { RequestHandler } from "../../func/request/RequestHandler";
import { RequestStore } from "../../func/request/RequestStore";
import { SubmitButton } from "../submit/SubmitButton";
import { useShallow } from "zustand/react/shallow";

export const RequestBar = () => {
  const balance = BalanceStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  const request = RequestStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  if (balance.status !== BalanceStatusFunded) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-72">
        <SubmitButton
          status={request.status}
          action={RequestHandler}
        />
      </div>
    </div>
  );
};
