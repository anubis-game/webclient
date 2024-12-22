import * as React from "react";

import { TrimWhitespace } from "../../func/string/TrimWhitespace";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  overwrite?: boolean;
  strokeWidth?: string;
  viewBox?: string;
}

export const BaseIcon = (props: Props) => {
  const defaultClassName = TrimWhitespace(`
    w-5 h-5
    ${props.className ? props.className : ""}
  `);

  return (
    <svg
      className={props.overwrite === true ? props.className : defaultClassName}
      fill="none"
      onClick={props.onClick}
      strokeWidth={props.strokeWidth ? props.strokeWidth : "1"}
      viewBox={props.viewBox ? props.viewBox : "0 0 24 24"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.children}
    </svg>
  );
};
