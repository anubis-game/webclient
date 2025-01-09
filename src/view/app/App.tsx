import { BalanceBar } from "../balance/BalanceBar";
import { GuardianBar } from "../guardian/GuardianBar";
import { GuardianDialog } from "../guardian/GuardianDialog";
import { GuardianSetup } from "../guardian/GuardianSetup";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryStore } from "../../func/query/QueryStore";
import { RequestBar } from "../request/RequestBar";
import { StreamSetup } from "../stream/StreamSetup";
import { ToastSetup } from "../toast/ToastSetup";
import { TransferDialog } from "../transfer/TransferDialog";
import { WagmiConfig } from "../../func/wagmi/WagmiConfig";
import { WagmiProvider } from "wagmi";
import { WalletBar } from "../wallet/WalletBar";
import { WalletSetup } from "../wallet/WalletSetup";

export const App = () => {
  return (
    <>
      <WagmiProvider config={WagmiConfig}>
        <QueryClientProvider client={QueryStore.getState().wagmi.client}>
          <WalletBar />
          <WalletSetup />
        </QueryClientProvider>
      </WagmiProvider>

      <BalanceBar />
      <GuardianBar />
      <RequestBar />

      <GuardianSetup />
      <StreamSetup />
      <ToastSetup />

      <GuardianDialog />
      <TransferDialog />
    </>
  );
};
