import { BaseIcon } from "./BaseIcon";

interface Props {
  className?: string;
}

// https://github.com/0xa3k5/web3icons/blob/main/packages/core/src/svgs/wallets/branded/rabby.svg
export const RabbyWalletIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      viewBox="0 0 24 24"
    >
      <g>
        <path
          fill="url(#rabby__a)"
          d="M21.898 13.3c.785-1.827-3.098-6.928-6.808-9.054-2.34-1.646-4.775-1.42-5.27-.696-1.083 1.586 3.587 2.93 6.71 4.5-.672.303-1.305.847-1.677 1.544C13.69 8.27 11.135 7.13 8.137 8.049c-2.02.618-3.7 2.075-4.35 4.277a1.2 1.2 0 0 0-.515-.114c-.703 0-1.272.593-1.272 1.324 0 .73.57 1.323 1.272 1.323.13 0 .537-.09.537-.09l6.506.049c-2.602 4.294-4.658 4.922-4.658 5.666s1.967.542 2.706.265c3.536-1.327 7.334-5.465 7.986-6.656 2.737.355 5.037.397 5.549-.794"
        />
        <path
          fill="url(#rabby__b)"
          fillRule="evenodd"
          d="M16.53 8.049c.145-.06.122-.282.082-.456-.091-.402-1.667-2.021-3.148-2.747-2.017-.988-3.502-.937-3.721-.482.41.876 2.315 1.699 4.305 2.558.848.367 1.712.74 2.482 1.127"
          clipRule="evenodd"
        />
        <path
          fill="url(#rabby__c)"
          fillRule="evenodd"
          d="M13.97 16.867a12 12 0 0 0-1.392-.446c.559-1.04.676-2.58.148-3.553-.74-1.366-1.67-2.093-3.829-2.093-1.187 0-4.385.416-4.442 3.194q-.01.437.02.804l5.84.044c-.788 1.3-1.525 2.264-2.17 2.997.775.206 1.414.38 2.001.539.557.151 1.067.29 1.601.431a25 25 0 0 0 2.224-1.917"
          clipRule="evenodd"
        />
        <path
          fill="url(#rabby__d)"
          d="M3.71 14.488c.239 2.11 1.391 2.937 3.746 3.182 2.355.244 3.706.08 5.504.25 1.502.143 2.843.94 3.34.664.448-.248.198-1.143-.401-1.717-.777-.744-1.852-1.262-3.743-1.445.377-1.074.271-2.58-.314-3.399-.847-1.184-2.409-1.72-4.386-1.486-2.066.245-4.045 1.303-3.746 3.951"
        />
        <defs>
          <linearGradient
            id="rabby__a"
            x1="7.901"
            x2="21.808"
            y1="11.682"
            y2="15.472"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8697FF" />
            <stop
              offset="1"
              stopColor="#ABB7FF"
            />
          </linearGradient>
          <linearGradient
            id="rabby__b"
            x1="19.4"
            x2="9.026"
            y1="11.409"
            y2="1.414"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8697FF" />
            <stop
              offset="1"
              stopColor="#5156D8"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="rabby__c"
            x1="14.248"
            x2="4.479"
            y1="17.23"
            y2="11.832"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#465EED" />
            <stop
              offset="1"
              stopColor="#8697FF"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="rabby__d"
            x1="8.727"
            x2="15.526"
            y1="11.575"
            y2="19.877"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8898FF" />
            <stop
              offset=".984"
              stopColor="#6277F1"
            />
          </linearGradient>
        </defs>
      </g>
    </BaseIcon>
  );
};
