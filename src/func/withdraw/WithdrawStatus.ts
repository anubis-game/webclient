import * as React from "react";

import { BalanceStore } from "../balance/BalanceStore";
import { SubmitLifecycle } from "../submit/SubmitStatus";
import { SubmitStatus } from "../submit/SubmitStatus";

export const WithdrawStatus = (amo: string, sym: string): SubmitStatus => {
  const des = amo ? Number(amo) : 0;
  const cur = BalanceStore.getState().deposited;

  if (cur === 0) {
    return {
      lifecycle: SubmitLifecycle.Invalid,
      container: React.createElement("div", null, `You don't have any ${sym}`),
    };
  }

  if (!amo) {
    return {
      lifecycle: SubmitLifecycle.Invalid,
      container: React.createElement("div", null, "Choose Withdraw Amount"),
    };
  }

  if (amo.includes(".") || amo.includes("e")) {
    return {
      lifecycle: SubmitLifecycle.Invalid,
      container: React.createElement("div", null, `Only full ${sym}`),
    };
  }

  if (des > cur) {
    return {
      lifecycle: SubmitLifecycle.Invalid,
      container: React.createElement("div", null, `You only have ${cur} ${sym}`),
    };
  }

  return {
    lifecycle: SubmitLifecycle.Enabled,
    container: React.createElement("div", null, `Withdraw ${amo} ${sym}`),
  };
};
