import { createConfig } from "wagmi";
import { http } from "wagmi";
import { BaseSepoliaAlchemyRpcEndpoint } from "../config/Config";

import { baseSepolia } from "wagmi/chains";
import { localhost } from "wagmi/chains";

import { coinbaseWallet } from "wagmi/connectors";
import { metaMask } from "wagmi/connectors";

export const WagmiConfig = createConfig({
  chains: [baseSepolia, localhost],
  connectors: [coinbaseWallet({ appName: "Anubis" }), metaMask()],
  transports: {
    [baseSepolia.id]: http(BaseSepoliaAlchemyRpcEndpoint),
    [localhost.id]: http(),
  },
});
