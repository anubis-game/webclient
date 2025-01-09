import { CheckMarkIcon } from "../icon/CheckMarkIcon";
import { ErrorIcon } from "../icon/ErrorIcon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { SubmitLifecycle } from "../../func/submit/SubmitStatus";
import { SubmitStatus } from "../../func/submit/SubmitStatus";

interface Props {
  status: SubmitStatus;
  action: () => void;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      className={`button form ${props.status.lifecycle} px-4 py-3 w-full`}
      disabled={props.status.lifecycle !== SubmitLifecycle.Enabled}
      type="button"
      onClick={props.action}
    >
      <div className="flex gap-x-2">
        {(props.status.lifecycle === SubmitLifecycle.Failure ||
          props.status.lifecycle === SubmitLifecycle.Loading ||
          props.status.lifecycle === SubmitLifecycle.Success) && (
          <div className="flex my-auto">
            {props.status.lifecycle === SubmitLifecycle.Failure && <ErrorIcon />}
            {props.status.lifecycle === SubmitLifecycle.Loading && <SpinnerIcon />}
            {props.status.lifecycle === SubmitLifecycle.Success && <CheckMarkIcon />}
          </div>
        )}
        <div>{props.status.container}</div>
      </div>
    </button>
  );
};
