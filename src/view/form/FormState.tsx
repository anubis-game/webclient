export const FormStateDefault = "default";
export const FormStateEnabled = "enabled";
export const FormStateFailure = "failure";
export const FormStateInvalid = "invalid";
export const FormStateLoading = "loading";
export const FormStateSuccess = "success";

export interface FormState {
  name: string;
  disabled: boolean;
  finished: boolean;
  loading: boolean;
  message: string;
}

export const DefaultFormState = (): FormState => {
  return {
    name: "default",
    disabled: true,
    finished: false,
    loading: false,
    message: "",
  };
};
