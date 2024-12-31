import * as React from "react";

export const SubmitStatusDefault = "default";
export const SubmitStatusEnabled = "enabled";
export const SubmitStatusFailure = "failure";
export const SubmitStatusInvalid = "invalid";
export const SubmitStatusLoading = "loading";
export const SubmitStatusSuccess = "success";

export interface SubmitStatus {
  lifecycle:
    | typeof SubmitStatusDefault
    | typeof SubmitStatusEnabled
    | typeof SubmitStatusFailure
    | typeof SubmitStatusInvalid
    | typeof SubmitStatusLoading
    | typeof SubmitStatusSuccess;
  container: JSX.Element;
}

export const DefaultSubmitStatus = (msg: string = ""): SubmitStatus => {
  return {
    lifecycle: SubmitStatusDefault,
    container: React.createElement("div", null, msg),
  };
};