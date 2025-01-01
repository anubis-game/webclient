import { TransferStore } from "../../func/transfer/TransferStore";

interface Props {
  disabled: boolean;
}

export const DepositAmount = (props: Props) => {
  return (
    <input
      className="transfer amount h-12"
      id="amount"
      disabled={props.disabled}
      placeholder="5"
      type="number"
      max={10}
      min={1}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        TransferStore.getState().updateAmount(e.currentTarget.value);
      }}
    />
  );
};
