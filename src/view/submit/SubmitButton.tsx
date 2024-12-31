import { CheckMarkIcon } from "../icon/CheckMarkIcon";
import { ErrorIcon } from "../icon/ErrorIcon";
import { SpinnerIcon } from "../icon/SpinnerIcon";
import { SubmitStatus } from "../../func/submit/SubmitStatus";
import { SubmitStatusEnabled } from "../../func/submit/SubmitStatus";
import { SubmitStatusFailure } from "../../func/submit/SubmitStatus";
import { SubmitStatusLoading } from "../../func/submit/SubmitStatus";
import { SubmitStatusSuccess } from "../../func/submit/SubmitStatus";

interface Props {
  status: SubmitStatus;
  action: () => void;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      className={`button form ${props.status.lifecycle} px-4 py-3 w-full h-full`}
      disabled={props.status.lifecycle !== SubmitStatusEnabled}
      type="button"
      onClick={props.action}
    >
      <div className="flex gap-x-2">
        {(props.status.lifecycle === SubmitStatusFailure ||
          props.status.lifecycle === SubmitStatusLoading ||
          props.status.lifecycle === SubmitStatusSuccess) && (
          <div className="flex my-auto">
            {props.status.lifecycle === SubmitStatusFailure && <ErrorIcon />}
            {props.status.lifecycle === SubmitStatusLoading && <SpinnerIcon />}
            {props.status.lifecycle === SubmitStatusSuccess && <CheckMarkIcon />}
          </div>
        )}
        <div>{props.status.container}</div>
      </div>
    </button>
  );
};
