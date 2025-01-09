import * as React from "react";
import * as Request from "../transaction/registry/Request";

import { BalanceStore } from "../balance/BalanceStore";
import { ConnectSignature } from "../signature/CreateSignature";
import { GuardianStore } from "../guardian/GuardianStore";
import { GuardianWebsocketProtocol } from "../config/Config";
import { RequestSignature } from "../signature/CreateSignature";
import { RequestStore } from "./RequestStore";
import { SendUserOperation } from "../transaction/SendUserOperation";
import { SignatureTimestamp } from "../../func/signature/CreateSignature";
import { Sleep } from "../sleep/Sleep";
import { StreamStore } from "../stream/StreamStore";
import { SubmitLifecycle } from "../submit/SubmitStatus";

export const RequestHandler = async () => {
  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitLifecycle.Loading,
      container: React.createElement("div", null, "Signing Transaction"),
    });

    RequestStore.getState().updateSubmit(true);
  }

  const grd = GuardianStore.getState().getActive();
  const sym = BalanceStore.getState().active;
  const tim = SignatureTimestamp();
  const req = await RequestSignature(grd.address, tim);
  const con = await ConnectSignature(grd.address, tim);

  try {
    await Request.Simulate(req, sym);
  } catch (err) {
    return await failure("Simulation Failed", err);
  }

  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitLifecycle.Loading,
      container: React.createElement("div", null, "Confirming Onchain"),
    });
  }

  const res = await SendUserOperation([
    Request.Encode(req, sym), //
  ]);

  if (!res.success) {
    return await failure(res.rejected ? "User Rejected Transaction" : "Something Went Wrong", res.message);
  }

  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitLifecycle.Loading,
      container: React.createElement("div", null, "Connecting Guardian"),
    });
  }

  // TODO store the Registry-timestamp relationship in localstorage so that
  // users can Escape() from faulty Guardians

  try {
    const cli = new WebSocket(
      `${GuardianWebsocketProtocol}://${grd.endpoint}/connect`, //
      ["dual-handshake", res.hash, con.sgn], //
    );

    {
      StreamStore.getState().updateClient(cli);
    }

    return await success();
  } catch (err) {
    return await failure("Guardian Connection Failed", res.message);
  }
};

const failure = async (tit: string, err: any) => {
  {
    console.error(err);
  }

  RequestStore.getState().updateStatus({
    lifecycle: SubmitLifecycle.Failure,
    container: React.createElement("div", null, tit),
  });

  {
    await Sleep(5 * 1000);
  }

  {
    RequestStore.getState().updateStatus({
      lifecycle: SubmitLifecycle.Enabled,
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
      lifecycle: SubmitLifecycle.Enabled,
      container: React.createElement("div", null, "Play Now"),
    });
  }
};

const success = async () => {
  RequestStore.getState().updateStatus({
    lifecycle: SubmitLifecycle.Success,
    container: React.createElement("div", null, "Let's Go"),
  });

  {
    await Sleep(3_000);
  }

  {
    BalanceStore.getState().updateBalance();
    RequestStore.getState().delete();
  }
};
