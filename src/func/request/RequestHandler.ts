import * as React from "react";
import * as Request from "../transaction/registry/Request";

import { BalanceStore } from "../balance/BalanceStore";
import { GuardianStore } from "../guardian/GuardianStore";
import { RequestSignature } from "../signature/CreateSignature";
import { RequestStore } from "./RequestStore";
import { Sleep } from "../sleep/Sleep";
import { SendUserOperation } from "../transaction/SendUserOperation";
import { SignatureTimestamp } from "../../func/signature/CreateSignature";
import { SubmitStatusEnabled } from "../submit/SubmitStatus";
import { SubmitStatusFailure } from "../submit/SubmitStatus";
import { SubmitStatusLoading } from "../submit/SubmitStatus";
import { SubmitStatusSuccess } from "../submit/SubmitStatus";

export const RequestHandler = async () => {
  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitStatusLoading,
      container: React.createElement("div", null, "Signing Transaction"),
    });

    RequestStore.getState().updateSubmit(true);
  }

  const grd = GuardianStore.getState().active;
  const sym = BalanceStore.getState().active;
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

  const res = await SendUserOperation([
    Request.Encode(ctx, sym), //
  ]);

  // TODO handle connect after successful request
  //
  //     https://sepolia.arbiscan.io/tx/0x310843e119e6c8d574a0ecf591fb5dc92ae3823f2ef5f135fac970e7a1678274
  //
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

  {
    await Sleep(5_000);
  }

  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitStatusEnabled,
      container: React.createElement("div", null, "Play"),
    });
  }
};

const success = async () => {
  RequestStore.getState().updateStatus({
    lifecycle: SubmitStatusSuccess,
    container: React.createElement("div", null, "Let's Go"),
  });

  {
    await Sleep(5_000);
  }

  {
    BalanceStore.getState().updateBalance();
    RequestStore.getState().delete();
  }
};
