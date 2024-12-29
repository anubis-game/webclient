import * as React from "react";
import * as Request from "../transaction/registry/Request";

import { Address } from "viem";
import { BalanceStore } from "../balance/BalanceStore";
import { ChainStore } from "../chain/ChainStore";
import { FormStatusEnabled } from "../form/FormStatus";
import { FormStatusFailure } from "../form/FormStatus";
import { FormStatusLoading } from "../form/FormStatus";
import { FormStatusSuccess } from "../form/FormStatus";
import { RequestSignature } from "../signature/CreateSignature";
import { RequestStore } from "./RequestStore";
import { Sleep } from "../sleep/Sleep";
import { SendTransaction } from "../transaction/SendTransaction";
import { SignatureTimestamp } from "../../func/signature/CreateSignature";
import { WalletStore } from "../wallet/WalletStore";

export const RequestHandler = async (grd: Address, sym: string) => {
  {
    RequestStore.getState().updateStatus({
      lifecycle: FormStatusLoading,
      container: React.createElement("Signing Transaction"),
    });

    RequestStore.getState().updateSubmit(true);
  }

  {
    WalletStore.getState().wallet.client.switchChain({
      id: ChainStore.getState().active,
    });
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
      lifecycle: FormStatusLoading,
      container: React.createElement("Confirming Onchain"),
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
    lifecycle: FormStatusFailure,
    container: React.createElement(tit),
  });

  {
    await Sleep(5 * 1000);
  }

  {
    RequestStore.getState().updateStatus({
      lifecycle: FormStatusEnabled,
      container: React.createElement("Try Again"),
    });
  }

  {
    RequestStore.getState().updateSubmit(false);
  }
};

const success = async () => {
  RequestStore.getState().updateStatus({
    lifecycle: FormStatusSuccess,
    container: React.createElement("Ready To Play"),
  });

  {
    await Sleep(3 * 1000);
  }

  {
    BalanceStore.getState().updateBalance();
    RequestStore.getState().delete();
  }
};
