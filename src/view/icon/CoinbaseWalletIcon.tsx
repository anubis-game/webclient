import { BaseIcon } from "./BaseIcon";

interface Props {
  className?: string;
}

// https://github.com/0xa3k5/web3icons/blob/main/packages/core/src/svgs/wallets/branded/coinbase.svg
export const CoinbaseWalletIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      viewBox="0 0 24 24"
    >
      <g>
        <path
          fill="#0E5BFF"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12"
        />
        <path
          fill="#fff"
          fill-rule="evenodd"
          d="M12 19.083a7.083 7.083 0 1 0 0-14.166 7.083 7.083 0 0 0 0 14.166m-.833-9.166c-.69 0-1.25.56-1.25 1.25v1.666c0 .69.56 1.25 1.25 1.25h1.666c.69 0 1.25-.56 1.25-1.25v-1.666c0-.69-.56-1.25-1.25-1.25z"
          clip-rule="evenodd"
        />
      </g>
    </BaseIcon>
  );
};
