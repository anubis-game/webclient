import { BalanceBar } from "../balance/BalanceBar";
import { DepositDialog } from "../deposit/DepositDialog";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryStore } from "../../func/query/QueryStore";
import { RequestDialog } from "../request/RequestDialog";
import { RequestSetup } from "../request/RequestSetup";
import { ToastSetup } from "../toast/ToastSetup";
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
      <RequestSetup />
      <ToastSetup />

      <DepositDialog />
      <RequestDialog />
    </>
  );
};
