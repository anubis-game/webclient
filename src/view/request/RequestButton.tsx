import * as React from "react";

import { Address } from "viem";
import { BalanceStore } from "../../func/balance/BalanceStore";
import { GuardianObject } from "../../func/request/GuardianObject";
import { RequestHandler } from "../../func/request/RequestHandler";
import { RequestStore } from "../../func/request/RequestStore";
import { SubmitButton } from "../submit/SubmitButton";
import { SubmitStatusDefault } from "../../func/submit/SubmitStatus";
import { SubmitStatusEnabled } from "../../func/submit/SubmitStatus";
import { TruncateSeparator } from "../../func/string/TruncateSeparator";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";
import { BalanceStatusFunded } from "../../func/balance/BalanceStatus";
import { WalletStatusConnected } from "../../func/wallet/WalletStatus";

interface Props {
  address: Address;
  object: GuardianObject;
}

// TODO can we remove this component again?
export const RequestButton = (props: Props) => {
  const balance = BalanceStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  const request = RequestStore(
    useShallow((state) => ({
      status: state.status,
      submit: state.submit,
    })),
  );

  const wallet = WalletStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  if (request.submit !== props.address) {
    if (request.status.lifecycle !== SubmitStatusEnabled) {
      request.status.lifecycle = SubmitStatusDefault;
    }

    request.status.container = (
      <div className="w-full grid grid-cols-6 gap-4 whitespace-nowrap">
        <div className="col-span-4">{TruncateSeparator(props.address, "...")}</div>
        <div className="col-span-1">{props.object.symbol}</div>
        <div className="col-span-1">{Math.round(props.object.latency)} ms</div>
      </div>
    );
  }

  // Set the status lifecycle to enabled for all request buttons if we have a
  // wallet connected, and some available balance deposited. Note that we cannot
  // use "status" in the dependency array below since it would cause re-renders
  // every single time.
  React.useEffect(() => {
    if (balance.status === BalanceStatusFunded) {
      RequestStore.getState().updateStatus({
        lifecycle: SubmitStatusEnabled,
        container: request.status.container,
      });
    }

    if (wallet.status !== WalletStatusConnected || balance.status !== BalanceStatusFunded) {
      RequestStore.getState().updateStatus({
        lifecycle: SubmitStatusDefault,
        container: request.status.container,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance.status, wallet.status]);

  return (
    <SubmitButton
      status={request.status}
      action={() => RequestHandler(props.address, props.object.symbol)}
    />
  );
};
