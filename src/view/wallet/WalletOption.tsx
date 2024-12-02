import * as React from "react";

import { Connector } from "wagmi";

interface Props {
  connector: Connector;
  onClick: () => void;
};

export const WalletOption = (props: Props) => {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ; (async () => {
      const provider = await props.connector.getProvider()
      setReady(!!provider)
    })()
  }, [props.connector])

  return (
    <button
      className="button mb-2 px-2 py-2 w-full"
      disabled={!ready}
      onClick={props.onClick}
    >
      {props.connector.name}
    </button>
  );
};
