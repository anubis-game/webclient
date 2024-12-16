import { SplitString } from "../string/SplitString";

export const ArbitrumSepoliaAlchemyApiKey: string = import.meta.env.VITE_ARBITRUM_SEPOLIA_ALCHEMY_API_KEY || "";
export const ArbitrumSepoliaAlchemyGasPolicy: string = import.meta.env.VITE_ARBITRUM_SEPOLIA_ALCHEMY_GAS_POLICY || "";
export const ArbitrumSepoliaAlchemyRpcEndpoint: string = import.meta.env.VITE_ARBITRUM_SEPOLIA_ALCHEMY_RPC_ENDPOINT || "";

export const DefaultChainId: number = Number(import.meta.env.VITE_DEFAULT_CHAIN_ID) || 0;

export const GuardianEndpoints: string[] = SplitString(import.meta.env.VITE_GUARDIAN_ENDPOINTS) || [];
export const GuardianHypertextProtocol: string = import.meta.env.VITE_GUARDIAN_HYPERTEXT_PROTOCOL || "";
export const GuardianWebsocketProtocol: string = import.meta.env.VITE_GUARDIAN_WEBSOCKET_PROTOCOL || "";
