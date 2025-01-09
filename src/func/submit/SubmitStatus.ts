import * as React from "react";

//
export enum SubmitLifecycle {
  Default = "default",
  Enabled = "enabled",
  Failure = "failure",
  Invalid = "invalid",
  Loading = "loading",
  Success = "success",
}

export interface SubmitStatus {
  lifecycle: SubmitLifecycle;
  container: JSX.Element;
}

export const SubmitStatusDefault = (): SubmitStatus => {
  return {
    lifecycle: SubmitLifecycle.Default,
    container: React.createElement("div", null, ""),
  };
};

export const SubmitStatusEnabled = (tit: string): SubmitStatus => {
  return {
    lifecycle: SubmitLifecycle.Enabled,
    container: React.createElement("div", null, tit),
  };
};
