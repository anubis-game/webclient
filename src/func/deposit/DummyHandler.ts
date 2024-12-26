import { DepositStore } from "./DepositStore";
import { FormStatusEnabled, FormStatusFailure, FormStatusLoading } from "../form/FormStatus";
// import { FormStatusSuccess } from "../form/FormStatus";
import { Sleep } from "../sleep/Sleep";

export const DummyHandler = async () => {
  {
    DepositStore.getState().updateStatus({
      phase: FormStatusLoading,
      title: "Signing Transaction",
    });

    DepositStore.getState().updateSubmit(true);
  }

  {
    await Sleep(2 * 1000);
  }

  {
    DepositStore.getState().updateStatus({
      phase: FormStatusLoading,
      title: "Confirming Onchain",
    });
  }

  {
    await Sleep(2 * 1000);
  }

  // {
  //   DepositStore.getState().updateStatus({
  //     phase: FormStatusSuccess,
  //     title: `Deposited ${amount()} ${symbol()}`,
  //   });
  // }

  {
    DepositStore.getState().updateStatus({
      phase: FormStatusFailure,
      title: "Something Went Wrong",
    });

    {
      await Sleep(2 * 1000);
    }

    DepositStore.getState().updateStatus({
      phase: FormStatusEnabled,
      title: "Try Again",
    });
  }

  // {
  //   await Sleep(2 * 1000);
  // }

  {
    // DepositStore.getState().updateDialog(false);
    DepositStore.getState().updateSubmit(false);
  }
};

// const amount = (): number => {
//   const amo = DepositStore.getState().amount;
//   return amo ? Number(amo) : 0;
// };

// const symbol = (): string => {
//   const sym = DepositStore.getState().symbol;
//   return sym.toUpperCase();
// };
