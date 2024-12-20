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

    await Sleep(2 * 1000);

    {
      args.sign("Confirming Onchain");
    }

    await Sleep(2 * 1000);

    {
      args.done();
      BalanceStore.getState().updateDepositAmount("");
      BalanceStore.getState().updateDepositDialog(false);
      BalanceStore.getState().updateDepositSubmit(false);
    }

    {
      // args.fail();
    }
  }

  verify(): boolean {
    const amo = this.amount();

    if (!amo) {
      return false;
    }

    if (amo < 1 || amo > 10) {
      return false;
    }

    return true;
  }

  private amount(): number {
    const amo = BalanceStore.getState().depositAmount;
    return amo ? Number(amo) : 0;
  }
}
