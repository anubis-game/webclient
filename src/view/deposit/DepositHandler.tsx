import { DepositButton } from "./DepositButton";
import { DepositStore } from "../../func/deposit/DepositStore";
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
      DepositStore.getState().updateSubmit(true);
    }

    await Sleep(2 * 1000);

    {
      args.sign("Confirming Onchain");
    }

    await Sleep(2 * 1000);

    {
      args.done();

      DepositStore.getState().updateDialog(false);
      DepositStore.getState().updateSubmit(false);
    }

    {
      // args.fail();
    }
  }

  private amount(): number {
    const amo = DepositStore.getState().amount;
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
