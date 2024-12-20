import { BalanceBar } from "../balance/BalanceBar";
import { DepositDialog } from "../balance/DepositDialog";
import { GuardianButton } from "../guardian/GuardianButton";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryStore } from "../../func/query/QueryStore";
import { StreamSetup } from "../stream/StreamSetup";
import { WagmiConfig } from "../../func/wagmi/WagmiConfig";
import { WagmiProvider } from "wagmi";
import { WalletBar } from "../wallet/WalletBar";
import { WalletSetup } from "../wallet/WalletSetup";

export const App = () => {
  return (
    <>
      <WagmiProvider config={WagmiConfig}>
        <QueryClientProvider client={QueryStore.getState().wagmi.client}>
          <BalanceBar />
          <StreamSetup />
          <WalletBar />
          <WalletSetup />
        </QueryClientProvider>
      </WagmiProvider>

      <div className="py-4 px-2 background justify-items-center">
        <div className="m-auto h-full w-full max-w-xl">
          <div className="min-[1024px]:ml-12 min-[1120px]:ml-0">
            <DepositDialog />
            <GuardianButton />
          </div>
        </div>
      </div>
    </>
  );
};
