import * as React from "react";

import { BalanceStore } from "../balance/BalanceStore";
import { SubmitStatus } from "../submit/SubmitStatus";
import { SubmitStatusEnabled } from "../submit/SubmitStatus";
import { SubmitStatusInvalid } from "../submit/SubmitStatus";

export const DepositStatus = (amo: string, sym: string): SubmitStatus => {
  const des = amo ? Number(amo) : 0;
  const cur = BalanceStore.getState().available;

  if (cur === 0) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, `You don't have any ${sym}`),
    };
  }

  if (!amo) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, "Choose Deposit Amount"),
    };
  }

  if (amo.includes(".") || amo.includes("e")) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, `Only full ${sym}`),
    };
  }

  if (des > cur) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, `You only have ${cur} ${sym}`),
    };
  }

  if (des < 1) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, `Minimum ${1} ${sym}`),
    };
  }

  if (des > 10) {
    return {
      lifecycle: SubmitStatusInvalid,
      container: React.createElement("div", null, `Maximum ${10} ${sym}`),
    };
  }

  return {
    lifecycle: SubmitStatusEnabled,
    container: React.createElement("div", null, `Deposit ${amo} ${sym}`),
  };
};
