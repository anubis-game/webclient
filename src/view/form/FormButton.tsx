import { CheckMarkIcon } from "../icon/CheckMarkIcon";
import { ErrorIcon } from "../icon/ErrorIcon";
import { FormStatus } from "../../func/form/FormStatus";
import { FormStatusEnabled } from "../../func/form/FormStatus";
import { FormStatusFailure } from "../../func/form/FormStatus";
import { FormStatusLoading } from "../../func/form/FormStatus";
import { FormStatusSuccess } from "../../func/form/FormStatus";
import { SpinnerIcon } from "../icon/SpinnerIcon";

interface Props {
  status: FormStatus;
  submit: () => void;
}

export const FormButton = (props: Props) => {
  return (
    <button
      className={`button form ${props.status.lifecycle} px-4 py-3 w-full h-full`}
      disabled={props.status.lifecycle !== FormStatusEnabled}
      type="button"
      onClick={props.submit}
    >
      <div className="flex gap-x-2">
        {(props.status.lifecycle === FormStatusFailure ||
          props.status.lifecycle === FormStatusLoading ||
          props.status.lifecycle === FormStatusSuccess) && (
          <div className="flex my-auto">
            {props.status.lifecycle === FormStatusFailure && <ErrorIcon />}
            {props.status.lifecycle === FormStatusLoading && <SpinnerIcon />}
            {props.status.lifecycle === FormStatusSuccess && <CheckMarkIcon />}
          </div>
        )}
        <div>{props.status.container}</div>
      </div>
    </button>
  );
};
