import { BlockExplorerToken } from "../../func/token/BlockExplorerToken";
import { ChainStore } from "../../func/chain/ChainStore";

interface Props {
  symbol: string;
}

export const WithdrawDescription = (props: Props) => {
  return (
    <>
      Withdraw your available&nbsp;
      <a
        href={BlockExplorerToken(props.symbol, "href")}
        target="_blank"
      >
        {props.symbol}
      </a>
      &nbsp;on {ChainStore.getState().getActive().viem.name}. Keep in mind that you need a deposited balance to play the
      game.
    </>
  );
};
