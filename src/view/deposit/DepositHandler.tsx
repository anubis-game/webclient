import { DepositButton } from "./DepositButton";
import { DepositStore } from "../../func/deposit/DepositStore";
import { FormInterface } from "../../func/form/FormInterface";
import { FormState } from "../form/FormState";
import { FormStateLoading } from "../form/FormState";
import { FormStateSuccess } from "../form/FormState";
import { Sleep } from "../../func/sleep/Sleep";

export class DepositHandler implements FormInterface {
  button(setState: (state: FormState) => void): JSX.Element {
    return <DepositButton setState={setState} />;
  }

  async submit(setState: (state: FormState) => void) {
    {
      setState({
        name: FormStateLoading,
        disabled: true,
        finished: false,
        loading: true,
        message: "Signing Transaction",
      });

      DepositStore.getState().updateSubmit(true);
    }

    await Sleep(2 * 1000);

    {
      setState({
        name: FormStateLoading,
        disabled: true,
        finished: false,
        loading: true,
        message: "Confirming Onchain",
      });
    }

    await Sleep(2 * 1000);

    {
      setState({
        name: FormStateSuccess,
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
