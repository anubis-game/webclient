import { BalanceStore } from "../../func/balance/BalanceStore";
import { DepositButton } from "./DepositButton";
import { FormArgs } from "../../func/form/FormInterface";
import { FormInterface } from "../../func/form/FormInterface";
import { Sleep } from "../../func/sleep/Sleep";

export class DepositHandler implements FormInterface {
  constructor() {}

  button(setDisabled: (disabled: boolean) => void): JSX.Element {
    return (
      <DepositButton
        verify={this.verify.bind(this)}
        setDisabled={setDisabled}
      />
    );
  }

  async submit(args: FormArgs) {
    {
      args.init("Signing Transaction");
      BalanceStore.getState().updateDepositSubmit(true);
    }

    await Sleep(5 * 1000);

    {
      args.sign("Confirming Onchain");
    }

    await Sleep(5 * 1000);

    {
      args.done();

      // We must set the submit state to false before we hide the dialog,
      // because the dialog is locked to stay in place while we process
      // transactions.
      BalanceStore.getState().updateDepositSubmit(false);
      BalanceStore.getState().updateDepositDialog(false);
    }

    {
      // args.fail();
    }
  }

  private amount(): number {
    const amo = BalanceStore.getState().depositAmount;
    return amo ? Number(amo) : 0;
  }

  private verify(): boolean {
    const amo = this.amount();

    if (!amo) {
      return false;
    }

    if (amo < 1 || amo > 10) {
      return false;
    }

    return true;
  }
}
