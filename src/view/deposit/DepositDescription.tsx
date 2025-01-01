import { BlockExplorerToken } from "../../func/token/BlockExplorerToken";
import { ChainStore } from "../../func/chain/ChainStore";

interface Props {
  symbol: string;
}

export const DepositDescription = (props: Props) => {
  return (
    <>
      Increase your balance to play the game with&nbsp;
      <a
        href={BlockExplorerToken(props.symbol, "href")}
        target="_blank"
      >
        {props.symbol}
      </a>
      &nbsp;on {ChainStore.getState().getActive().viem.name}. Win the allocated balance of every player you beat.
      Withdraw your funds any time.
    </>
  );
};
