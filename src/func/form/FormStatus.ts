export const FormStatusDefault = "default";
export const FormStatusEnabled = "enabled";
export const FormStatusFailure = "failure";
export const FormStatusInvalid = "invalid";
export const FormStatusLoading = "loading";
export const FormStatusSuccess = "success";

export interface FormStatus {
  phase: "default" | "enabled" | "failure" | "invalid" | "loading" | "success";
  title: string;
}

export const DefaultFormStatus = (msg: string = ""): FormStatus => {
  return {
    phase: FormStatusDefault,
    title: msg,
  };
};
