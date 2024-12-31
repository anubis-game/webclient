import { ConnectWallet } from "./ConnectWallet";
import { ShowWallets } from "./ShowWallets";
import { useShallow } from "zustand/react/shallow";
import { WalletStore } from "../../func/wallet/WalletStore";
import { WalletStatusConnected, WalletStatusLoading } from "../../func/wallet/WalletStatus";

export const WalletBar = () => {
  const { status } = WalletStore(
    useShallow((state) => ({
      status: state.status,
    })),
  );

  if (status === WalletStatusLoading) {
    return <></>;
  }

  return (
    <div className="absolute top-4 left-4 flex gap-4 items-center">
      {status === WalletStatusConnected ? <ShowWallets /> : <ConnectWallet />}
    </div>
  );
};
