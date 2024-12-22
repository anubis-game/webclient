import * as React from "react";

import { DepositButton } from "../../view/deposit/DepositButton";
import { DepositStore } from "./DepositStore";
import { FormInterface } from "../form/FormInterface";
import { FormStatus } from "../form/FormStatus";
import { FormStatusLoading } from "../form/FormStatus";
import { FormStatusSuccess } from "../form/FormStatus";
import { Sleep } from "../sleep/Sleep";

export class DepositHandler implements FormInterface {
  button(setStatus: (status: FormStatus) => void): JSX.Element {
    return React.createElement(DepositButton, { setStatus });
  }

  // TODO implement the contract write for Registry deposits
  async submit(setStatus: (status: FormStatus) => void) {
    {
      setStatus({
        name: FormStatusLoading,
        disabled: true,
        finished: false,
        loading: true,
        message: "Signing Transaction",
      });

      DepositStore.getState().updateSubmit(true);
    }

    await Sleep(2 * 1000);

    {
      setStatus({
        name: FormStatusLoading,
        disabled: true,
        finished: false,
        loading: true,
        message: "Confirming Onchain",
      });
    }

    await Sleep(2 * 1000);

    {
      setStatus({
        name: FormStatusSuccess,
        disabled: true,
        finished: false,
        loading: true,
        message: `Deposited ${this.amount()} ${this.symbol()}`,
      });
    }

    await Sleep(2 * 1000);

    {
      // args.fail();
    }

    // Hide the dialog as last step.
    {
      DepositStore.getState().updateDialog(false);
      DepositStore.getState().updateSubmit(false);
    }
  }

  private amount(): number {
    const amo = DepositStore.getState().amount;
    return amo ? Number(amo) : 0;
  }

  private symbol(): string {
    const sym = DepositStore.getState().symbol;
    return sym.toUpperCase();
  }
}
