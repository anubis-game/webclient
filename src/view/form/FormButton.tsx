import * as React from "react";

import { FormInterface } from "../../func/form/FormInterface";
import { SpinnerIcon } from "../icon/SpinnerIcon";

interface Props {
  handler: FormInterface;
}

export const FormButton = (props: Props) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<string>("");

  return (
    <button
      className="button px-4 py-3 w-full h-full"
      disabled={disabled}
      type="button"
      onClick={() => {
        props.handler.submit({
          init: (title: string) => {
            setDisabled(true);
            setProcessing(title);
          },
          sign: (title: string) => {
            setProcessing(title);
          },
          done: () => {
            setDisabled(false);
            setProcessing("");
          },
          fail: () => {
            setDisabled(false);
            setProcessing("");
          },
        });
      }}
    >
      <>
        {processing ? (
          <div className="flex gap-x-2">
            <div className="flex my-auto">
              <SpinnerIcon textColour="text-gray-700" />
            </div>

            <div className="text-gray-700">{processing}</div>
          </div>
        ) : (
          props.handler.button(setDisabled)
        )}
      </>
    </button>
  );
};
