import * as React from "react";

import { CheckMarkIcon } from "../icon/CheckMarkIcon";
import { DefaultFormState } from "./FormState";
import { FormInterface } from "../../func/form/FormInterface";
import { FormState } from "./FormState";
import { FormStateLoading } from "./FormState";
import { FormStateSuccess } from "./FormState";
import { SpinnerIcon } from "../icon/SpinnerIcon";

interface Props {
  handler: FormInterface;
}

export const FormButton = (props: Props) => {
  const [state, setState] = React.useState<FormState>(DefaultFormState());

  return (
    <button
      className={`button form ${state.name} px-4 py-3 w-full h-full`}
      disabled={state.disabled}
      type="button"
      onClick={() => {
        props.handler.submit(setState);
      }}
    >
      <>
        {state.loading || state.finished ? (
          <div className="flex gap-x-2">
            <div className="flex my-auto">
              {state.name === FormStateSuccess && <CheckMarkIcon />}
              {state.name === FormStateLoading && <SpinnerIcon />}
            </div>

            <div>{state.message}</div>
          </div>
        ) : (
          props.handler.button(setState)
        )}
      </>
    </button>
  );
};
