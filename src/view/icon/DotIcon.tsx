import { BaseIcon } from "./BaseIcon";

interface Props {
  className?: string;
}

export const DotIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      viewBox="0 0 24 24"
    >
      <g>
        <circle
          fill="currentColor"
          cx="12"
          cy="12"
          r="8"
        />
      </g>
    </BaseIcon>
  );
};
