import * as alchemyChains from "@account-kit/infra";
import * as viemChains from "viem/chains";
import * as wagmiChains from "wagmi/chains";

import { ArbitrumSepoliaAlchemyApiKey, ArbitrumSepoliaAlchemyRpcEndpoint } from "../config/Config";
import { ArbitrumSepoliaAlchemyGasPolicy } from "../config/Config";
import { ChainConfig } from "./ChainConfig";
import { Erc20Abi } from "../abi/Erc20Abi";
import { RegistryAbiV020 } from "../abi/RegistryAbiV020";
import { RegistryAbiV030 } from "../abi/RegistryAbiV030";

export const ChainList: ChainConfig[] = [
  {
    alchemy: alchemyChains.arbitrumSepolia,
    viem: viemChains.localhost,
    wagmi: wagmiChains.localhost,
    alchemyApiKey: ArbitrumSepoliaAlchemyApiKey,
    alchemyGasPolicy: ArbitrumSepoliaAlchemyGasPolicy,
    alchemyRpcEndpoint: ArbitrumSepoliaAlchemyRpcEndpoint,
    contracts: {
      "Registry-STBL": [{ abi: RegistryAbiV030, address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", latest: true }],
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
  {
    alchemy: alchemyChains.arbitrumSepolia,
    viem: viemChains.arbitrumSepolia,
    wagmi: wagmiChains.arbitrumSepolia,
    alchemyApiKey: ArbitrumSepoliaAlchemyApiKey,
    alchemyGasPolicy: ArbitrumSepoliaAlchemyGasPolicy,
    alchemyRpcEndpoint: ArbitrumSepoliaAlchemyRpcEndpoint,
    contracts: {
      "Registry-USDC": [
        { abi: RegistryAbiV020, address: "0xB89BbEd0467cb27C310bedc002733116289Bb63F", latest: false },
        { abi: RegistryAbiV030, address: "0x9632185d3851Fd06304C09BA6F1c1308189BE12b", latest: true },
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
