import * as alchemyChains from "@account-kit/infra";
import * as viemChains from "viem/chains";
import * as wagmiChains from "wagmi/chains";

import { ArbitrumSepoliaAlchemyApiKey, ArbitrumSepoliaAlchemyRpcEndpoint } from "../config/Config";
import { ArbitrumSepoliaAlchemyGasPolicy } from "../config/Config";
import { ChainConfig } from "./ChainConfig";
import { Erc20Abi } from "../abi/Erc20Abi";
import { RegistryAbi } from "../abi/RegistryAbi";

export const ChainList: ChainConfig[] = [
  {
    alchemy: alchemyChains.arbitrumSepolia,
    viem: viemChains.arbitrumSepolia,
    wagmi: wagmiChains.arbitrumSepolia,
    alchemyApiKey: ArbitrumSepoliaAlchemyApiKey,
    alchemyGasPolicy: ArbitrumSepoliaAlchemyGasPolicy,
    alchemyRpcEndpoint: ArbitrumSepoliaAlchemyRpcEndpoint,
    contracts: {
      "Registry-USDC": [{ abi: RegistryAbi, address: "0x", latest: true }],
    },
    tokens: {
      USDC: [{ abi: Erc20Abi, address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d", decimals: 6, precision: 2 }],
    },
  },
];
