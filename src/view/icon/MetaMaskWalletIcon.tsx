import { BaseIcon } from "./BaseIcon";

interface Props {
  className?: string;
}

// https://github.com/0xa3k5/web3icons/blob/main/packages/core/src/svgs/wallets/branded/metamask.svg
export const MetaMaskWalletIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      viewBox="0 0 24 24"
    >
      <g>
        <path
          fill="#F5841F"
          d="m20.476 11.987.899-1.032-.391-.28.625-.562-.482-.357.625-.459-.403-.306.651-3.11L21.01 3m0 0-6.36 2.307h-5.3L2.99 3 2 5.881l.664 3.11-.416.306.638.46-.482.356.625.561-.39.28.898 1.033-1.368 4.13 1.264 4.22 4.443-1.198.86.688L10.496 21h3.009l1.759-1.173.86-.688 4.456 1.198 1.277-4.22-1.381-4.13"
        />
        <path
          fill="#E27625"
          d="m21.01 3-7.805 5.622 1.447-3.315zM2.99 3l7.74 5.673-1.381-3.366zm15.219 13.041-2.085 3.085 4.456 1.198 1.277-4.22zm-16.039.064 1.263 4.22 4.443-1.199-2.071-3.085z"
        />
        <path
          fill="#E27625"
          d="m7.642 10.814-1.238 1.823 4.404.192-.143-4.615zm8.729 0-3.075-2.651-.09 4.666 4.403-.192zm-8.495 8.312 2.671-1.25-2.306-1.733zm5.59-1.249 2.658 1.25-.365-2.984z"
        />
        <path
          fill="#D7C1B3"
          d="m16.124 19.126-2.658-1.25.221 1.683-.026.714zm-8.248 0 2.476 1.147-.013-.713.208-1.683z"
        />
        <path
          fill="#2F343B"
          d="m10.39 15.021-2.201-.624 1.563-.702zm3.22 0 .65-1.326 1.564.702z"
        />
        <path
          fill="#CC6228"
          d="m7.876 19.126.391-3.085-2.462.064zm7.87-3.085.378 3.085 2.085-3.021zm1.864-3.404-4.405.192.404 2.192.652-1.326 1.563.702zm-9.421 1.76 1.563-.702.639 1.326.417-2.192-4.404-.192z"
        />
        <path
          fill="#E27625"
          d="m6.404 12.637 1.837 3.506-.052-1.746zm9.42 1.76-.065 1.746 1.85-3.506zm-5.016-1.568-.417 2.192.521 2.6.117-3.416zm2.397 0-.221 1.364.104 3.429.521-2.6z"
        />
        <path
          fill="#F5841F"
          d="m13.61 15.021-.522 2.6.378.256 2.293-1.734.065-1.746zm-5.421-.624.052 1.746 2.306 1.734.365-.255-.521-2.6z"
        />
        <path
          fill="#C0AD9E"
          d="m13.661 20.273.026-.713-.208-.166H10.52l-.182.166.013.713-2.476-1.147.86.688L10.496 21h3.009l1.759-1.186.86-.688z"
        />
        <path
          fill="#2F343B"
          d="m13.466 17.877-.378-.255h-2.176l-.365.255-.208 1.683.182-.166h2.958l.208.166z"
        />
        <path
          fill="#763E1A"
          d="M21.349 8.992 22 5.88 21.01 3l-7.544 5.43 2.905 2.384 4.105 1.173.899-1.032-.391-.28.625-.549-.482-.37.625-.459zM2 5.881l.664 3.11-.416.306.625.472-.482.357.625.548-.39.28.911 1.033 4.105-1.173 2.905-2.383L2.99 3z"
        />
        <path
          fill="#F5841F"
          d="m20.476 11.987-4.105-1.173 1.238 1.823-1.85 3.506 2.45-.038h3.648zM7.642 10.814l-4.105 1.173-1.368 4.118h3.636l2.436.038-1.837-3.506zm5.563 2.015.26-4.398 1.187-3.124H9.349l1.198 3.124.26 4.398.105 1.376v3.417h2.176l.013-3.417z"
        />
      </g>
    </BaseIcon>
  );
};
