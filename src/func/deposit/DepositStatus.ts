import * as React from "react";

import { BalanceStore } from "../balance/BalanceStore";
import { SubmitLifecycle } from "../submit/SubmitStatus";
import { SubmitStatus } from "../submit/SubmitStatus";

export const DepositStatus = (amo: string, sym: string): SubmitStatus => {
  const des = amo ? Number(amo) : 0;
  const cur = BalanceStore.getState().available;

  if (cur === 0) {
    return {
      lifecycle: SubmitLifecycle.Invalid,
      container: React.createElement("div", null, `You don't have any ${sym}`),
    };
  }

  if (!amo) {
    return {
      lifecycle: SubmitLifecycle.Invalid,
      container: React.createElement("div", null, "Choose Deposit Amount"),
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

  if (des < 1) {
    return {
      lifecycle: SubmitLifecycle.Invalid,
      container: React.createElement("div", null, `Minimum ${1} ${sym}`),
    };
  }

  if (des > 10) {
    return {
      lifecycle: SubmitLifecycle.Invalid,
      container: React.createElement("div", null, `Maximum ${10} ${sym}`),
    };
  }

  return {
    lifecycle: SubmitLifecycle.Enabled,
    container: React.createElement("div", null, `Deposit ${amo} ${sym}`),
  };
};
