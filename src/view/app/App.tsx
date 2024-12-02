import { QueryClientProvider } from "@tanstack/react-query";
import { QueryStore } from "../../func/query/QueryStore";
import { StatusBar } from "../status/StatusBar";
import { WagmiConfig } from "../../func/wagmi/WagmiConfig";
import { WagmiProvider } from "wagmi";
import { Message } from "../message/Message";

export const App = () => {
  return (
    <>
      <WagmiProvider config={WagmiConfig}>
        <QueryClientProvider client={QueryStore.getState().wagmi.client}>
          <StatusBar />
        </QueryClientProvider>
      </WagmiProvider>

      <div className="py-4 px-2 background justify-items-center">
        <div className="m-auto h-full w-full max-w-xl">
          <div className="min-[1024px]:ml-12 min-[1120px]:ml-0">
            <Message />
          </div>
        </div>
      </div>
    </>
  );
};
