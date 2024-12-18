import { BaseIcon } from "./BaseIcon";

interface Props {
  className?: string;
}

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:info:FILL@0;wght@700;GRAD@0;opsz@48&icon.query=info&icon.size=24&icon.color=%23e8eaed&icon.style=Rounded
export const InfoCircleIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      viewBox="0 -960 960 960"
    >
      <g>
        <path
          fill="currentColor"
          d="M442-269h82v-251h-82v251Zm38.07-310q20.43 0 34.18-13.51Q528-606.03 528-626q0-21.95-13.79-35.47Q500.41-675 480.02-675q-21.52 0-34.77 13.53Q432-647.95 432-626.5q0 20.6 13.82 34.05Q459.64-579 480.07-579Zm.33 524q-88.87 0-166.12-33.08-77.25-33.09-135.18-91.02-57.93-57.93-91.02-135.12Q55-391.41 55-480.36q0-88.96 33.08-166.29 33.09-77.32 90.86-134.81 57.77-57.48 135.03-91.01Q391.24-906 480.28-906t166.49 33.45q77.44 33.46 134.85 90.81t90.89 134.87Q906-569.34 906-480.27q0 89.01-33.53 166.25t-91.01 134.86q-57.49 57.62-134.83 90.89Q569.28-55 480.4-55Zm.1-94q137.5 0 234-96.37T811-480.5q0-137.5-96.31-234T479.5-811q-137.5 0-234 96.31T149-479.5q0 137.5 96.37 234T480.5-149Zm-.5-331Z"
        />
      </g>
    </BaseIcon>
  );
};
