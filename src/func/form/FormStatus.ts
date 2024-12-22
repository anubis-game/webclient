export const FormStatusDefault = "default";
export const FormStatusEnabled = "enabled";
export const FormStatusFailure = "failure";
export const FormStatusInvalid = "invalid";
export const FormStatusLoading = "loading";
export const FormStatusSuccess = "success";

export interface FormStatus {
  name: string;
  disabled: boolean;
  finished: boolean;
  loading: boolean;
  message: string;
}

export const DefaultFormStatus = (msg: string = ""): FormStatus => {
  return {
    name: "default",
    disabled: true,
    finished: false,
    loading: false,
    message: msg,
  };
};
