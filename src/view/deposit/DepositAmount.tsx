import { DepositStore } from "../../func/deposit/DepositStore";
import { TrimWhitespace } from "../../func/string/TrimWhitespace";

interface Props {
  disabled: boolean;
}

export const DepositAmount = (props: Props) => {
  return (
    <input
      className={TrimWhitespace(`
        w-full h-full p-2 rounded outline-none
        text-2xl text-center text-black bg-white
        disabled:text-gray-400 placeholder:text-gray-400
      `)}
      id="amount"
      disabled={props.disabled}
      placeholder="5"
      type="number"
      max={10}
      min={1}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        DepositStore.getState().updateAmount(e.currentTarget.value);
      }}
    />
  );
};
