import { BaseIcon } from "./BaseIcon";

interface Props {
  className?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:close:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=x&icon.size=24&icon.color=%235f6368&icon.style=Rounded
export const XMarkIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      viewBox="0 -960 960 960"
    >
      <g>
        <path fill="currentColor" d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </g>
    </BaseIcon>
  );
};
