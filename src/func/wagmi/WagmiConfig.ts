import { ChainStore } from "../chain/ChainStore";
import { coinbaseWallet } from "wagmi/connectors";
import { createConfig } from "wagmi";
import { http } from "wagmi";
import { metaMask } from "wagmi/connectors";

export const WagmiConfig = createConfig({
  chains: [ChainStore.getState().getActive().wagmi],
  connectors: [coinbaseWallet({ appName: "Anubis" }), metaMask()],
  transports: {
    [ChainStore.getState().getActive().wagmi.id]: http(ChainStore.getState().getActive().alchemyRpcEndpoint),
  },
});
