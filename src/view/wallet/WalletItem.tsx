import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { CoinbaseWalletIcon } from "../icon/CoinbaseWalletIcon";
import { Connector } from "wagmi";
import { MetaMaskWalletIcon } from "../icon/MetaMaskWalletIcon";
import { RabbyWalletIcon } from "../icon/RabbyWalletIcon";

interface Props {
  connector: Connector;
  onSelect: () => void;
}

export const WalletItem = (props: Props) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await props.connector.getProvider();
      setReady(!!provider);
    })();
  }, [props.connector]);

  return (
    <DropdownMenu.Item
      className="button connect p-2"
      disabled={!ready}
      onSelect={props.onSelect}
    >
      <div className="w-[144px]">{props.connector.name}</div>

      {props.connector.id === "coinbaseWalletSDK" && <CoinbaseWalletIcon />}
      {props.connector.id === "metaMaskSDK" && <MetaMaskWalletIcon />}
      {props.connector.id === "io.rabby" && <RabbyWalletIcon />}
    </DropdownMenu.Item>
  );
};
