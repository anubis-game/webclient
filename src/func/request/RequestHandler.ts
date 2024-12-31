import * as React from "react";
import * as Request from "../transaction/registry/Request";

import { Address } from "viem";
import { BalanceStore } from "../balance/BalanceStore";
import { RequestSignature } from "../signature/CreateSignature";
import { RequestStore } from "./RequestStore";
import { Sleep } from "../sleep/Sleep";
import { SendTransaction } from "../transaction/SendTransaction";
import { SignatureTimestamp } from "../../func/signature/CreateSignature";
import { SubmitStatusEnabled } from "../submit/SubmitStatus";
import { SubmitStatusFailure } from "../submit/SubmitStatus";
import { SubmitStatusLoading } from "../submit/SubmitStatus";
import { SubmitStatusSuccess } from "../submit/SubmitStatus";

export const RequestHandler = async (grd: Address, sym: string) => {
  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitStatusLoading,
      container: React.createElement("div", null, "Signing Transaction"),
    });

    RequestStore.getState().updateSubmit(true);
  }

  const tim = SignatureTimestamp();
  const ctx = await RequestSignature(grd, tim);

  try {
    await Request.Simulate(ctx, sym);
  } catch (err) {
    return await failure("Simulation Failed", err);
  }

  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitStatusLoading,
      container: React.createElement("div", null, "Confirming Onchain"),
    });
  }

  const res = await SendTransaction([
    Request.Encode(ctx, sym), //
  ]);

  // TODO handle connect after successful request
  if (res.success) {
    return await success();
  } else {
    return await failure(res.rejected ? "User Rejected Transaction" : "Something Went Wrong", res.message);
  }
};

const failure = async (tit: string, err: any) => {
  {
    console.error(err);
  }

  RequestStore.getState().updateStatus({
    lifecycle: SubmitStatusFailure,
    container: React.createElement("div", null, tit),
  });

  {
    await Sleep(5 * 1000);
  }

  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitStatusEnabled,
      container: React.createElement("div", null, "Try Again"),
    });
  }

  {
    RequestStore.getState().updateSubmit(false);
  }
};

const success = async () => {
  RequestStore.getState().updateStatus({
    lifecycle: SubmitStatusSuccess,
    container: React.createElement("div", null, "Ready To Play"),
  });

  {
    await Sleep(3 * 1000);
  }

  {
    BalanceStore.getState().updateBalance();
    RequestStore.getState().delete();
  }
};
