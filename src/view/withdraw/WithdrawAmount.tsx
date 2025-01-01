import { BalanceStore } from "../../func/balance/BalanceStore";
import { TransferStore } from "../../func/transfer/TransferStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  disabled: boolean;
}

export const WithdrawAmount = (props: Props) => {
  const { amount, submit } = TransferStore(
    useShallow((state) => ({
      amount: state.amount,
      submit: state.submit,
    })),
  );

  return (
    <div className="relative">
      <input
        className="transfer amount w-full h-12"
        id="amount"
        disabled={props.disabled}
        placeholder="5"
        type="number"
        value={amount}
        max={BalanceStore.getState().deposited}
        min={1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          TransferStore.getState().updateAmount(e.currentTarget.value);
        }}
      />

      <button
        type="button"
        className="button ghost text right-2 p-2 h-8 text-sm"
        disabled={submit}
        onClick={() => {
          TransferStore.getState().updateAmount(String(BalanceStore.getState().deposited));
        }}
      >
        MAX
      </button>
    </div>
  );
};
