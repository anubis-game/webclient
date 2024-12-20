import { ConnectWallet } from "./ConnectWallet";
import { ShowWallets } from "./ShowWallets";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";

export const WalletBar = () => {
  const wallet = WalletStore(
    useShallow((state) => ({
      connected: state.connected,
    })),
  );

  return (
    <div className="absolute top-4 left-4 flex gap-4 items-center">
      {wallet.connected ? <ShowWallets /> : <ConnectWallet />}
    </div>
  );
};
