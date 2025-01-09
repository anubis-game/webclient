import * as alchemyChains from "@account-kit/infra";
import * as viemChains from "viem/chains";
import * as wagmiChains from "wagmi/chains";

import { ArbitrumSepoliaAlchemyApiKey, ArbitrumSepoliaAlchemyRpcEndpoint } from "../config/Config";
import { ArbitrumSepoliaAlchemyGasPolicy } from "../config/Config";
import { ChainConfig } from "./ChainConfig";
import { Erc20Abi } from "../abi/Erc20Abi";
import { RegistryAbiV030 } from "../abi/RegistryAbiV030";
import { RegistryAbiV040 } from "../abi/RegistryAbiV040";

export const ChainList: ChainConfig[] = [
  // localhost
  {
    alchemy: alchemyChains.arbitrumSepolia,
    viem: viemChains.localhost,
    wagmi: wagmiChains.localhost,
    alchemyApiKey: ArbitrumSepoliaAlchemyApiKey,
    alchemyGasPolicy: ArbitrumSepoliaAlchemyGasPolicy,
    alchemyRpcEndpoint: ArbitrumSepoliaAlchemyRpcEndpoint,
    contracts: {
      Registry: [
        { abi: RegistryAbiV030, address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", symbol: "STBL", latest: true },
      ],
    },
    tokens: {
      STBL: [
        {
          abi: Erc20Abi,
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          decimals: 6,
          precision: 2,
          slot: 1,
          latest: true,
        },
      ],
    },
  },
  // arbitrum sepolia
  {
    alchemy: alchemyChains.arbitrumSepolia,
    viem: viemChains.arbitrumSepolia,
    wagmi: wagmiChains.arbitrumSepolia,
    alchemyApiKey: ArbitrumSepoliaAlchemyApiKey,
    alchemyGasPolicy: ArbitrumSepoliaAlchemyGasPolicy,
    alchemyRpcEndpoint: ArbitrumSepoliaAlchemyRpcEndpoint,
    contracts: {
      Registry: [
        { abi: RegistryAbiV030, address: "0x9632185d3851Fd06304C09BA6F1c1308189BE12b", symbol: "USDC", latest: false },
        { abi: RegistryAbiV040, address: "0x2fe8873afD3728C1cED0329b450d617FC235b4dB", symbol: "USDC", latest: true },
      ],
    },
    tokens: {
      USDC: [
        {
          abi: Erc20Abi,
          address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
          decimals: 6,
          precision: 2,
          slot: 10,
          latest: true,
        },
      ],
    },
  },
];
