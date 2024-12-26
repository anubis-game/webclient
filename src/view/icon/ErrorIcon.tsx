import { BaseIcon } from "./BaseIcon";

interface Props {
  className?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:block:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%23e8eaed
export const ErrorIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      viewBox="0 -960 960 960"
    >
      <g>
        <path
          fill="currentColor"
          d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z"
        />
      </g>
    </BaseIcon>
  );
};