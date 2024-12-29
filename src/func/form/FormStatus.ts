import * as React from "react";

export const FormStatusDefault = "default";
export const FormStatusEnabled = "enabled";
export const FormStatusFailure = "failure";
export const FormStatusInvalid = "invalid";
export const FormStatusLoading = "loading";
export const FormStatusSuccess = "success";

export interface FormStatus {
  lifecycle: "default" | "enabled" | "failure" | "invalid" | "loading" | "success";
  container: JSX.Element;
}

export const DefaultFormStatus = (msg: string = ""): FormStatus => {
  return {
    lifecycle: FormStatusDefault,
    container: React.createElement(msg),
  };
};
