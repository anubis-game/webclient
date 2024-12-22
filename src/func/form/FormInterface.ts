import { FormState } from "../../view/form/FormState";

export interface FormInterface {
  button(setState: (state: FormState) => void): JSX.Element;
  submit(setState: (state: FormState) => void): void;
}
