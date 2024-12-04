import * as alchemyChains from "@account-kit/infra";
import * as viemChains from "viem/chains";
import * as wagmiChains from "wagmi/chains";

import { ArbitrumSepoliaAlchemyApiKey } from "../config/Config";
import { ArbitrumSepoliaAlchemyGasPolicy } from "../config/Config";
import { ChainConfig } from "./ChainConfig";

export const ChainList: ChainConfig[] = [
  {
    alchemy: alchemyChains.arbitrumSepolia,
    viem: viemChains.arbitrumSepolia,
    wagmi: wagmiChains.arbitrumSepolia,
    alchemyApiKey: ArbitrumSepoliaAlchemyApiKey,
    alchemyGasPolicy: ArbitrumSepoliaAlchemyGasPolicy,
    contracts: {
      FOO: [{ abi: {}, address: "0x1234", latest: true }],
    },
    tokens: {
      FOO: [{ abi: {}, address: "0x1234", decimals: 18, precision: 2 }],
    },
  },
];
