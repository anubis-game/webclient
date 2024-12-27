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
      className={`button form ${props.status.phase} px-4 py-3 w-full h-full`}
      disabled={props.status.phase !== FormStatusEnabled}
      type="button"
      onClick={props.submit}
    >
      <div className="flex gap-x-2">
        {(props.status.phase === FormStatusFailure ||
          props.status.phase === FormStatusLoading ||
          props.status.phase === FormStatusSuccess) && (
          <div className="flex my-auto">
            {props.status.phase === FormStatusFailure && <ErrorIcon />}
            {props.status.phase === FormStatusLoading && <SpinnerIcon />}
            {props.status.phase === FormStatusSuccess && <CheckMarkIcon />}
          </div>
        )}
        <div>{props.status.title}</div>
      </div>
    </button>
  );
};
