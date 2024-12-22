import * as React from "react";

import { DepositStore } from "../../func/deposit/DepositStore";
import { FormState } from "../form/FormState";
import { FormStateEnabled } from "../form/FormState";
import { FormStateInvalid } from "../form/FormState";
import { useShallow } from "zustand/react/shallow";

interface Props {
  setState: (state: FormState) => void;
}

export const DepositButton = (props: Props) => {
  const { amount, symbol } = DepositStore(
    useShallow((state) => ({
      amount: state.amount,
      symbol: state.symbol,
    })),
  );

  const state = validate(amount, symbol);

  React.useEffect(() => {
    props.setState(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, symbol]);

  return <div>{state.message}</div>;
};

const validate = (amo: string, sym: string): FormState => {
  if (!amo) {
    return {
      name: FormStateInvalid,
      disabled: true,
      finished: false,
      loading: false,
      message: "Choose an Amount",
    };
  }

  if (amo.includes(".") || amo.includes("e")) {
    return {
      name: FormStateInvalid,
      disabled: true,
      finished: false,
      loading: false,
      message: `Only full ${sym}`,
    };
  }

  const num = amo ? Number(amo) : 0;

  if (num < 1) {
    return {
      name: FormStateInvalid,
      disabled: true,
      finished: false,
      loading: false,
      message: `Minimum ${1} ${sym}`,
    };
  }

  if (num > 10) {
    return {
      name: FormStateInvalid,
      disabled: true,
      finished: false,
      loading: false,
      message: `Maximum ${10} ${sym}`,
    };
  }

  return {
    name: FormStateEnabled,
    disabled: false,
    finished: false,
    loading: false,
    message: `Deposit ${amo} ${sym}`,
  };
};
