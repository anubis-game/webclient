import * as React from "react";

import { CheckMarkIcon } from "../icon/CheckMarkIcon";
import { DefaultFormStatus } from "../../func/form/FormStatus";
import { FormInterface } from "../../func/form/FormInterface";
import { FormStatus } from "../../func/form/FormStatus";
import { FormStatusLoading } from "../../func/form/FormStatus";
import { FormStatusSuccess } from "../../func/form/FormStatus";
import { SpinnerIcon } from "../icon/SpinnerIcon";

interface Props {
  handler: FormInterface;
}

export const FormButton = (props: Props) => {
  const [status, setStatus] = React.useState<FormStatus>(DefaultFormStatus());

  return (
    <button
      className={`button form ${status.name} px-4 py-3 w-full h-full`}
      disabled={status.disabled}
      type="button"
      onClick={() => {
        props.handler.submit(setStatus);
      }}
    >
      <>
        {status.loading || status.finished ? (
          <div className="flex gap-x-2">
            <div className="flex my-auto">
              {status.name === FormStatusSuccess && <CheckMarkIcon />}
              {status.name === FormStatusLoading && <SpinnerIcon />}
            </div>

            <div>{status.message}</div>
          </div>
        ) : (
          props.handler.button(setStatus)
        )}
      </>
    </button>
  );
};
