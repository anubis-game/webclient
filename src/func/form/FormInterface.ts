export interface FormArgs {
  init: (title: string) => void;
  sign: (title: string) => void;
  done: () => void;
  fail: () => void;
}

export interface FormInterface {
  button(setDisabled: (disabled: boolean) => void): JSX.Element;
  submit(args: FormArgs): void;
  verify(): boolean;
}
