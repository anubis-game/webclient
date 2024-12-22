import { FormStatus } from "./FormStatus";

export interface FormInterface {
  button(setStatus: (status: FormStatus) => void): JSX.Element;
  submit(setStatus: (status: FormStatus) => void): void;
}
